const mongoose = require("mongoose");

const DrugSchema = new mongoose.Schema({
  brandNames: {
    type: [String],
    required: true,
  },
  genericNames: {
    type: [String],
    required: true,
  },
  categories: {
    type: [String],
    default: ["General"],
  },
  drugClasses: {
    type: [String],
    default: [],
  },
  difficulty: {
    type: String,
    enum: ["easy", "normal", "hard"],
    default: "normal",
  },
  forSammy: {
    type: Boolean,
    default: false,
  },

  indications: {
    type: [String],
    default: [],
  },
  aliases: {
    type: [String],
    default: [],
  },
  mechanism: {
    type: String,
    default: "",
  },
  sideEffects: {
    type: [String],
    default: [],
  },
  notes: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Drug", DrugSchema);
