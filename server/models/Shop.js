const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    lat: {
      type: String,
      required: true,
    },
    long: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Shop", schema);
