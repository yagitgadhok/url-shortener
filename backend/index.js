// module type defination

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import QRCode from "qrcode";

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
    if (!originalUrl) return res.status(404).json({ error: "Invalid URL" });
    const shortUrl = nanoid(8);
    const url = new Url({ originalUrl, shortUrl });
    const myUrl = `https://url-shortener-odbp.onrender.com/${shortUrl}`;
    const qrCodeImg = await QRCode.toDataURL(myUrl);
    await url.save();
    return res.status(200).json({
      message: "URL Generated Successfully",
      shortUrl: myUrl,
      qrCodeImg,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Generating URL" });
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).jsons({ error: "URL not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Generating URL" });
  }
});

app.listen(process.env.PORT, () => console.log("server running on port 3000"));
