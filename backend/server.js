const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectdb");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

if (!process.env.MONGODB_URI) {
  console.error("Error: MONGO_URI missing");
  process.exit(1);
}

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/auth", userRoutes);
app.use("/api/role", roleRoutes);

app.use(express.static(path.join(__dirname, "../frontend", "dist")));
app.use(express.static(path.join(__dirname, "../frontend", "public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});
