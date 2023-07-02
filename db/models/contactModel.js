const { Schema, model } = require("mongoose");

const schemaContact = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Contact = model("contact", schemaContact);

module.exports = Contact;
