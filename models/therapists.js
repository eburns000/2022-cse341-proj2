const mongoose = require("mongoose");
// could instead do import { Schema, model } from "mongoose", so it only loads those two

const therapistsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    credentials: {
      type: String,
      enum: [
        "MS CCC-SLP",
        "MA CCC-SLP",
        "MS CF-SLP",
        "MA CF-SLP",
        "OTD, OTR/L",
        "MOTR/L",
        "OTR/L",
        "SLPA",
        "SLPA-C",
        "COTA",
        "COTA/L",
      ],
      required: true,
    },
    discipline: {
      type: String,
      enum: ["SLP", "OT"],
      required: true,
    },
  },
  { collection: "therapists", timestamps: true }
);

module.exports = mongoose.model("Therapists", therapistsSchema);


/*
  Typescript example:
  interface IIngredient {
    name: string;
    quantity: string;
  }

  interface IMeal {
    name: string;
    ingredients: IIngredient[]; // array of ingredients
  }
*/

// if Typescript
// const mealSchema = new Schema<IMeal>()
// otherwise
// const mealSchema = new Schema();
// note that in my project, the "new" keywords, in other words, the
// schema is being instantiated in the controller, as we're exporting
// this schema definition
