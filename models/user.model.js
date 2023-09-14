const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const EMAILPATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subScription = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: EMAILPATTERN,
      unique: true,
      requred: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      requred: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: subScription,
      default: "starter",
    },
    avatarURL: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

// Joi validation
const signupSchema = Joi.object({
  email: Joi.string().pattern(EMAILPATTERN).required().messages({
    "any.required": `missing fields`,
    "string.pattern.base": `wrong email`,
  }),
  password: Joi.string().required().messages({
    "any.required": `missing fields`,
  }),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(EMAILPATTERN).required().messages({
    "any.required": `missing required field email`,
    "string.pattern.base": `wrong email`,
  }),
});

const signinSchema = Joi.object({
  email: Joi.string().pattern(EMAILPATTERN).required().messages({
    "any.required": `missing fields`,
    "string.pattern.base": `wrong email`,
  }),
  password: Joi.string().required().messages({
    "any.required": `missing fields`,
  }),
});

const updSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subScription)
    .required()
    .messages({
      "any.required": `missing fields`,
    }),
});

const schemas = {
  signupSchema,
  verifyEmailSchema,
  signinSchema,
  updSubscriptionSchema,
};

module.exports = { User, schemas };
