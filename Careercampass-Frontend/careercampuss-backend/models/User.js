const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'Please add a name'] },
  email: { 
    type: String, 
    required: [true, 'Please add an email'], 
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: { 
    type: String, 
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false // Do not return password by default
  },

  // Top-level profile fields (used directly)
  phone:  { type: String,  default: '' },
  age:    { type: Number,  default: null },   // Number, not String
  gender: { type: String,  default: '' },
  bio:    { type: String,  default: '' },

  role: {
    type: String,
    enum: ['student', 'job-seeker', 'professional', 'admin'],
    default: 'student'
  },

  // Nested profile sub-document (mirrors top-level for compatibility)
  profile: {
    age:        { type: Number },
    gender:     { type: String, enum: ['male', 'female', 'other', ''] },
    phone:      { type: String },
    bio:        { type: String },
    skills:     [{ type: String }],
    education:  [{ type: String }],
    experience: [{ type: String }]
  },

  avatar: { type: String, default: '' },
  
  isVerified:         { type: Boolean, default: false },
  loginAttempts:      { type: Number, required: true, default: 0 },
  lockUntil:          { type: Number },
  resetPasswordToken: { type: String },
  resetPasswordExpire:{ type: Date }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET || 'super_secret_jwt_key_career_compass_123!', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Check if account is locked
UserSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;