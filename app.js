import express from "express";
// import ejs from "ejs";
import session from "express-session";
import cookieParser from "cookie-parser";
import { userRoutes } from "./job-portal/routes/auth.routes.js";
import { jobRoutes } from "./job-portal/routes/job.routes.js";
import { auth } from "./job-portal/middleware/auth.js";
import ejsLayouts from "express-ejs-layouts";

const app = express();
app.use(ejsLayouts);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./job-portal/views");

// Session management
app.use(
  session({
    secret: "job-portal-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// Static files
app.use("/public", express.static("public"));
app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/", userRoutes);
app.use("/jobs", auth, jobRoutes);
app.get("/404", (req, res) => {
  res.render("404");
});

// Error handling
// app.use((req, res) => {
//   res.status(404).render("404");
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
