const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    _id: {
      type: String,
    },
    year: {
      type: String,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Counter", schema);
