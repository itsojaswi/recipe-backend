const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
      validate: {
        validator: function (value) {
          return (
            validator.isAlphanumeric(value, "en-US", { ignore: " _" }) &&
            value.length >= 3 &&
            value.length <= 30
          );
        },
        message:
          "Username can only contain letters, numbers, and underscores, and must be between 3 and 30 characters long",
      },
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    profile: {
      bio: { type: String, default: "", maxLength: 500 },
      avatar: { type: String, default: "" },
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Static signup method
userSchema.statics.signup = async function (
  username,
  email,
  password,
  role = "user"
) {
  // Validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  // Check for existing user
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use.");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash, role });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

// Static method to update the user's bio and avatar
userSchema.statics.updateBio = async function (userId, bio, avatar) {
  const user = await this.findById(userId);
  if (!user) {
    throw Error("User not found");
  }

  if (bio) user.profile.bio = bio;
  if (avatar) user.profile.avatar = avatar; // Ensure avatar is updated only if provided

  await user.save();
  return user;
};

// Middleware for role-based authentication
userSchema.methods.isAuthorized = function (requiredRole) {
  return this.role === requiredRole || this.role === "admin";
};

module.exports = mongoose.model("User", userSchema);
