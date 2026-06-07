const express = require("express");
const router = express.Router();
const normalizeAnswer = require("../utils/normalizeAnswer");

const Drug = require("../models/Drug");

router.get("/random", async (req, res) => {
  try {
    const mode = req.query.mode || "brand-to-generic";

    const category = req.query.category || "all";

    // 1. Build query
    let query = {};

    if (category !== "all") {
      query.categories = category;
    }

    // 2. Fetch filtered drugs
    const drugs = await Drug.find(query);

    if (drugs.length === 0) {
      return res.status(404).json({
        message: "No drugs found",
      });
    }

    // 3. Weighted pool based on difficulty
    const weightedPool = [];

    drugs.forEach((drug) => {
      let weight = 1;

      if (drug.difficulty === "hard") weight = 4;
      else if (drug.difficulty === "normal") weight = 2;
      else if (drug.difficulty === "easy") weight = 1;

      for (let i = 0; i < weight; i++) {
        weightedPool.push(drug);
      }
    });

    // 4. Pick random from weighted pool
    const drug = weightedPool[Math.floor(Math.random() * weightedPool.length)];

    // 5. Build question
    let question = "";

    if (mode === "brand-to-generic") {
      const randomBrand =
        drug.brandNames[Math.floor(Math.random() * drug.brandNames.length)];

      question = randomBrand;
    } else {
      const randomGeneric =
        drug.genericNames[Math.floor(Math.random() * drug.genericNames.length)];

      question = randomGeneric;
    }

    // 6. Response
    res.json({
      _id: drug._id,
      question,
      mode,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// GET /api/drugs/:id
router.get("/:id", async (req, res) => {
  try {
    const drug = await Drug.findById(req.params.id);
    if (!drug) return res.status(404).json({ message: "Drug not found" });
    res.json(drug);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/check", async (req, res) => {
  try {
    const { drugId, answer, mode } = req.body;

    console.log(req.body);

    const drug = await Drug.findById(drugId);

    if (!drug) {
      return res.status(404).json({
        message: "Drug not found",
      });
    }

    const normalizedAnswer = normalizeAnswer(answer);

    let isCorrect = false;

    if (mode === "brand-to-generic") {
      const userAnswers = answer
        .split(",")
        .map((a) => normalizeAnswer(a.trim()))
        .filter((a) => a.length > 0);

      const correctAnswers = drug.genericNames.map((g) => normalizeAnswer(g));

      if (userAnswers.length !== correctAnswers.length) {
        isCorrect = false;
      } else {
        isCorrect = correctAnswers.every((ca) => userAnswers.includes(ca));
      }
    } else if (mode === "generic-to-brand") {
      isCorrect = drug.brandNames.some(
        (brand) => normalizeAnswer(brand) === normalizedAnswer,
      );
    }
    console.log("GENERICS:", drug.genericNames);
    console.log("BRANDS:", drug.brandNames);
    console.log("TYPE:", typeof drug.genericNames);

    res.json({
      correct: isCorrect,

      correctAnswer:
        mode === "brand-to-generic"
          ? drug.genericNames.join(", ")
          : drug.brandNames.join(", "),
    });
  } catch (error) {
    console.error("CHECK ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      brandNames,
      genericNames,
      categories,
      drugClasses,
      difficulty,
      indications,
      aliases,
      mechanism,
      sideEffects,
      notes,
    } = req.body;

    const drug = await Drug.create({
      brandNames,
      genericNames,
      categories,
      drugClasses,
      difficulty,
      indications,
      aliases,
      mechanism,
      sideEffects,
      notes,
    });

    res.status(201).json(drug);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { category, forSammy } = req.query;

    let query = {};

    if (category && category !== "all") {
      query.categories = category; // ⚠️ check this field name
    }
    if (forSammy === "true") {
      query.forSammy = true;
    }

    const drugs = await Drug.find(query);

    res.json(drugs);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const drug = await Drug.findById(req.params.id);
    if (!drug) {
      return res.status(404).json({
        message: "drug not found",
      });
    }
    await Drug.findByIdAndDelete(req.params.id);
    res.json({
      message: "Drug deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const { brandNames, genericNames, categories } = req.body;
//     const drug = await Drug.findById(req.params.id);
//     if (!drug) {
//       return res.status(404).json({
//         message: "Drug not found",
//       });
//     }
//     drug.brandNames = brandNames;
//     drug.genericNames = genericNames;
//     drug.categories = categories;
//     const updatedDrug = await drug.save();
//     res.json(updatedDrug);
//   } catch (error) {
//     res.status(500).json({
//       message: "server error",
//     });
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const updatedDrug = await Drug.findByIdAndUpdate(
      req.params.id,
      req.body, // 🔥 update everything sent
      { new: true, runValidators: true },
    );

    if (!updatedDrug) {
      return res.status(404).json({ message: "Drug not found" });
    }

    res.json(updatedDrug);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

router.patch("/:id/difficulty", async (req, res) => {
  try {
    const { difficulty } = req.body;
    const drug = await Drug.findById(req.params.id);
    if (!drug) {
      return res.status(404).json({
        message: "Drug not found",
      });
    }
    drug.difficulty = difficulty;
    await drug.save();
    res.json(drug);
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});
module.exports = router;
