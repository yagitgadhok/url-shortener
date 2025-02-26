// module type defination

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { nanoid } from "nanoid";
import dotenv from "dotenv";

dotenv.config();

// commonjs type definitions
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const { nanoid } = require("naonoid");
// require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connecting to Database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connecting to Database Successfully");
  })
  .catch((err) => {
    console.log("Error connecting ", err);
  });

// Creating a model for the URL schema
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  clicks: { type: Number, default: 0 },
});

// Creating model for the schema
const Url = mongoose.model("Url", urlSchema);

app.post("/api/short", async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = nanoid(8);
    const url = new Url({ originalUrl, shortUrl });
    await url.save();
    return res
      .status(200)
      .json({ message: "URL Generated Successfully", url: url });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Generating URL" });
  }
});

app.listen(3000, () => console.log("server running on port 3000"));
