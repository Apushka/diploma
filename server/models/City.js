const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("City", schema);
