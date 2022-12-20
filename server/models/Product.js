const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      ref: "Category",
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", schema);
