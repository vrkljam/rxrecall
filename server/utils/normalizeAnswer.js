function normalizeAnswer(text) {
  return text.toLowerCase().trim().replace(/[-\s]/g, "");
}

module.exports = normalizeAnswer;
