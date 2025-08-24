const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema(
    {
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: null
    },
},
    { timestamps: true  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// ✅ Add comparePassword method BEFORE exporting
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bycrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);