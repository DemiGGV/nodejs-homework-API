const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const PHONEPATTERN = /^\(\d{3}\)\s\d{3}-\d{4}$/;

// Mongoose schema-model
const contactDBSchema = new Schema(
  {
    name: {
      type: String,
      requred: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: PHONEPATTERN,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactDBSchema.post("save", handleMongooseError);

const Contact = model("contact", contactDBSchema);

// Joi validation
const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing fields`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `missing fields`,
  }),
  phone: Joi.string().pattern(PHONEPATTERN).required().messages({
    "any.required": `missing fields`,
    "string.pattern.base": `wrong phone`,
  }),
  favorite: Joi.boolean().messages({
    "any.required": `missing fields`,
  }),
});

const updFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const schemas = {
  contactSchema,
  updFavoriteSchema,
};

module.exports = { Contact, schemas };
