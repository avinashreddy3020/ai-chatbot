import dotenv from "dotenv";
dotenv.config(); // must be first

console.log("API KEY loaded:", !!process.env.OPENAI_API_KEY);

import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});