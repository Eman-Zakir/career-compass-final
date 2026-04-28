const crypto = require('crypto');
const UserModel = require('../models/User');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const nodemailer = require('nodemailer');

// Helper to send token in cookie
const sendTokenResponse = (user, statusCode, res, message) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + (process.env.COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production' // uncomment in production if using HTTPS
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      message,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
        profile: user.profile
      }
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { fullName, email, password, role } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const user = await UserModel.create({
      fullName,
      email,
      password,
      role
    });

    sendTokenResponse(user, 201, res, 'User registered successfully');
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if locked
    if (user.isLocked()) {
      return res.status(429).json({ success: false, message: 'Account is temporarily locked. Please try again later.' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      // Increment login attempts
      user.loginAttempts += 1;
      
      // Lock account after 5 failed attempts
      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
        await user.save({ validateBeforeSave: false });
        return res.status(429).json({ success: false, message: 'Too many failed attempts. Account locked for 15 minutes.' });
      }

      await user.save({ validateBeforeSave: false });
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id:       user._id,
        fullName: user.fullName,
        email:    user.email,
        role:     user.role,
        phone:    user.phone,
        age:      user.age,
        gender:   user.gender,
        bio:      user.bio,
        profile:  user.profile
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'There is no user with that email' });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `http://localhost:5174/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      // Setup Nodemailer
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
        port: process.env.SMTP_PORT || 2525,
        auth: {
          user: process.env.SMTP_EMAIL || 'user',
          pass: process.env.SMTP_PASSWORD || 'pass'
        }
      });

      // We will console log it for easy local testing since we don't have real SMTP
      console.log('RESET URL:', resetUrl);

      // await transporter.sendMail({
      //   from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      //   to: user.email,
      //   subject: 'Password reset token',
      //   text: message
      // });

      res.status(200).json({ success: true, message: 'Email sent' });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ success: false, message: 'Email could not be sent' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res, 'Password reset successfully');
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    // ── DEBUG: log exactly what the frontend sent ──
    console.log('📥 [updateProfile] Incoming req.body:', JSON.stringify(req.body, null, 2));

    const { fullName, role, profile, phone, age, gender, bio } = req.body;

    // Find user
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // ── Update top-level scalar fields ──
    // Use ?? (nullish coalescing) so that empty string "" and 0 are preserved
    if (fullName !== undefined && fullName !== null) user.fullName = fullName;
    if (role     !== undefined && role     !== null) user.role     = role;

    // Resolve phone, age, gender from either top-level or nested profile object
    // Priority: top-level field > nested profile field
    const resolvedPhone  = phone  !== undefined ? phone  : profile?.phone;
    const resolvedAge    = age    !== undefined ? age    : profile?.age;
    const resolvedGender = gender !== undefined ? gender : profile?.gender;
    const resolvedBio    = bio    !== undefined ? bio    : profile?.bio;

    if (resolvedPhone  !== undefined && resolvedPhone  !== null) user.phone  = resolvedPhone;
    if (resolvedGender !== undefined && resolvedGender !== null) user.gender = resolvedGender;
    if (resolvedBio    !== undefined && resolvedBio    !== null) user.bio    = resolvedBio;

    // Cast age to Number to match the schema type
    if (resolvedAge !== undefined && resolvedAge !== null && resolvedAge !== '') {
      user.age = Number(resolvedAge);
    }

    // ── Also mirror into the nested profile sub-document ──
    if (profile || resolvedPhone !== undefined || resolvedAge !== undefined || resolvedGender !== undefined) {
      const existingProfile = user.profile?.toObject ? user.profile.toObject() : (user.profile || {});
      user.profile = {
        ...existingProfile,
        ...(profile || {}),
        ...(resolvedPhone  !== undefined ? { phone:  resolvedPhone }         : {}),
        ...(resolvedAge    !== undefined && resolvedAge !== '' ? { age: Number(resolvedAge) } : {}),
        ...(resolvedGender !== undefined ? { gender: resolvedGender }        : {}),
        ...(resolvedBio    !== undefined ? { bio:    resolvedBio }           : {}),
      };
    }

    console.log('💾 [updateProfile] Saving user:', {
      phone:  user.phone,
      age:    user.age,
      gender: user.gender,
      bio:    user.bio,
      role:   user.role
    });

    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id:       user._id,
        fullName: user.fullName,
        email:    user.email,
        role:     user.role,
        phone:    user.phone,
        age:      user.age,
        gender:   user.gender,
        bio:      user.bio,
        profile:  user.profile
      }
    });
  } catch (err) {
    console.error('❌ [updateProfile] Error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
