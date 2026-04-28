const Joi = require('joi');

// ─────────────────────────────────────────────
// Helper: detect repetitive character patterns
// e.g. "aaaaaaa", "lllllll", "ababab"
// ─────────────────────────────────────────────
const isRepetitive = (str) => {
  const s = str.toLowerCase();
  // All same character: "aaaa"
  if (/^(.)\1+$/.test(s)) return true;
  // Repeating short pattern: "ababab", "xyzxyz"
  if (/^(.{1,3})\1{2,}$/.test(s)) return true;
  return false;
};

// ─────────────────────────────────────────────
// Helper: check if email local-part is valid
// Blocks: all-numeric "123456@", all-same-char "lllll@", 
//         too-short meaningful part, etc.
// ─────────────────────────────────────────────
const isValidEmailLocalPart = (email) => {
  const localPart = email.split('@')[0];

  // Must not be purely numeric
  if (/^\d+$/.test(localPart)) return false;

  // Must not be repetitive (e.g. lllllll, ababab)
  if (isRepetitive(localPart)) return false;

  // Local part must have at least 2 letters
  const letterCount = (localPart.match(/[a-zA-Z]/g) || []).length;
  if (letterCount < 2) return false;

  return true;
};

// ─────────────────────────────────────────────
// Register Validation
// ─────────────────────────────────────────────
exports.registerValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string()
      .min(2)
      .max(60)
      .pattern(/^[a-zA-Z\s]+$/)   // Only letters and spaces
      .required()
      .messages({
        'string.pattern.base': 'Full name must contain only letters and spaces (no numbers or symbols).',
        'string.min': 'Full name must be at least 2 characters.',
        'string.max': 'Full name must not exceed 60 characters.',
        'any.required': 'Full name is required.'
      }),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Please enter a valid email address (e.g., name@gmail.com).',
        'any.required': 'Email is required.'
      }),

    password: Joi.string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$'))
      .required()
      .messages({
        'string.pattern.base': 'Password must be 8+ characters with uppercase, lowercase, number & special character.',
        'any.required': 'Password is required.'
      }),

    role: Joi.string()
      .valid('student', 'job-seeker', 'professional', 'admin')
      .optional(),

    profile: Joi.object({
      age: Joi.number().optional(),
      gender: Joi.string().valid('male', 'female', 'other').optional(),
      phone: Joi.string().optional(),
      bio: Joi.string().optional()
    }).optional()
  });

  // Run Joi schema first
  const { error } = schema.validate(data, { abortEarly: true });
  if (error) return { error };

  // Extra custom checks on name
  const name = data.fullName?.trim() || '';
  if (isRepetitive(name.replace(/\s/g, ''))) {
    return {
      error: {
        details: [{ message: 'Full name appears to be invalid or repetitive. Please enter your real name.' }]
      }
    };
  }

  // Extra custom checks on email
  if (!isValidEmailLocalPart(data.email)) {
    return {
      error: {
        details: [{ message: 'Email address is invalid. Avoid purely numeric or repetitive email usernames.' }]
      }
    };
  }

  return { error: null };
};

// ─────────────────────────────────────────────
// Login Validation
// ─────────────────────────────────────────────
exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required()
      .messages({ 'string.email': 'Please enter a valid email address.' }),
    password: Joi.string().required()
      .messages({ 'any.required': 'Password is required.' })
  });
  return schema.validate(data);
};
