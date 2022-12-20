const Counter = require("../models/Counter");

async function getSequenceId() {
  try {
    const sequenceDocument = await Counter.findOne({ _id: "counter" });
    const currYear = new Date().toLocaleString("en", { year: "2-digit" });
    if (sequenceDocument.year !== currYear) {
      sequenceDocument.year = currYear;
      sequenceDocument.value = 1;
    } else {
      sequenceDocument.value += 1;
    }
    sequenceDocument.save();
    const id = "RL" + sequenceDocument.year + "-" + sequenceDocument.value;
    return id;
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
}

module.exports = getSequenceId;
