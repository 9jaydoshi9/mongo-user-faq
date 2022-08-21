const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let FaqCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    faqs: [{ type: Schema.Types.ObjectId, ref: "Faqs", default: [] }],
  },
  {
    timestamps: true,
  }
);

let FaqCategory = mongoose.model("FaqCategories", FaqCategorySchema);

module.exports = FaqCategory;
