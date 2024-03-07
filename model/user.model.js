const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female", ""],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    avatar: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: false,
      },
    },

    role: {
      default: "user",
      type: String,
      requiured: [true, "role must be include"],
      enum: ["user", "admin"],
      trim: true,
    },
    createdBy: {
      type: String,
      required: false,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  },
})

// this can not be accessssible in modern es 6 aerrow function need to use function way
UserSchema.methods.comparePassword = async function (oldPassword) {
  const isPasswordMatch = await bcrypt.compare(oldPassword, this.password)
  return isPasswordMatch
}

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel
