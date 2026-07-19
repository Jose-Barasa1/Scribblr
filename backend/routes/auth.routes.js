import express from "express";
import passport from "passport";

const router = express.Router();

// Start Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    session: true // We need sessions for persistent login
  }),
  (req, res) => {
    // Successfully authenticated
    // Redirect to the frontend dashboard
    res.redirect("http://localhost:3000/dashboard");
  }
);

// Optional: Logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000/login");
  });
});

export default router;