const mongoose = require("mongoose");

require("dotenv").config();

const Drug = require("./models/Drug");
const drugs = require("./data/drugs.json");

async function seeData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo db");
    await Drug.deleteMany();
    console.log("old drugs removed");
    await Drug.insertMany(drugs);
    console.log("seed data");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seeData();
