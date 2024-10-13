//const express = require("express");
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Define an object to store form data
let packListDataStore = [];

// POST API route to handle form data
app.post("/submit-packList", (req, res) => {
  const {
    departDate,
    return: returnDate,
    country,
    city,
    airline,
    cabinClass,
    nationality,
    accommodation,
  } = req.body;

  // Create an object to hold the form data
  const packListData = {
    userId: "string", // You can modify this as needed
    departDate: departDate,
    returnDate: returnDate,
    country: country,
    city: city,
    airline: airline,
    cabinClass: cabinClass,
    nationality: nationality,
    accommodationType: accommodation,
  };

  // Store the form data in the array
  packListDataStore.push(packListData);

  res.json({ message: "Form data recived and sorted", formData: packListData });

  let packingList = generatePackingList(packListData);
  let pdfList;
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
