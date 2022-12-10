const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        amount: Number,
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
    },
    comment: {
      type: String,
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
    street: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    building: {
      type: String,
    },
    apartment: {
      type: String,
    },
    index: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", schema);
