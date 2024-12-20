import express from "express";
import connectDB from "./config/dbConnect.js";
import dotenv from "dotenv";
import updatePassword from "./routes/updatePassword.js";
import signupRoute from "./routes/signup.js";
import signinRoute from "./routes/signin.js";
import verifyUserRoute from "./routes/verifyUser.js";
import forgotPassword from "./routes/forgotPassword.js";
import newPost from "./routes/newPost.js";
import readPost from "./routes/readPost.js";
import editPost from "./routes/editPost.js";
import deletePost from "./routes/deletePost.js";
import likePost from "./routes/likePost.js";
import addComment from "./routes/addComment.js";
import viewComment from "./routes/viewComments.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! Welcome to Express.js!");
});

app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/verify", verifyUserRoute);
app.use("/forgot-password", forgotPassword);
app.use("/update-password", updatePassword);
app.use("/newpost",newPost);
app.use("/readpost",readPost);
app.use("/editpost",editPost);
app.use("/deletepost",deletePost);
app.use("/likepost",likePost);
app.use("/addcomment",addComment);
app.use("/viewcomment",viewComment);

// Handle undefined routes (404)
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
