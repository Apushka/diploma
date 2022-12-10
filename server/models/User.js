const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    surname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    tel: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
