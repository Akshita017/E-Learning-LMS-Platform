const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = express.Router();
const purchasesFilePath = path.join(__dirname, "../data/Purchased.json");

// Ensure purchases.json exists
fs.mkdirSync(path.dirname(purchasesFilePath), { recursive: true });
if (!fs.existsSync(purchasesFilePath)) {
  fs.writeFileSync(purchasesFilePath, JSON.stringify([]));
}

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, course, paymentMethod , image } = req.body;

    if (!amount || !course || !course.id || !course.title || !paymentMethod) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Stripe-supported payment methods
    const validPaymentMethods = {
      card: "card",
      googlepay: "card", // Google Pay is typically processed as a card payment
    };

    if (!validPaymentMethods[paymentMethod]) {
      return res.status(400).json({ error: "Unsupported payment method" });
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "inr",
      payment_method_types: [validPaymentMethods[paymentMethod]],
    });

    // Store purchase details
    const purchaseData = {
      courseId: course.id,
      courseTitle: course.title,
      price: amount,
      paymentMethod,
      image : image || "abc",
      purchasedAt: new Date().toISOString(),
    };

    savePurchase(purchaseData);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({ error: "Payment processing failed" });
  }
});

// Function to save purchases
const savePurchase = (purchaseData) => {
  try {
    let data = "[]";
    if (fs.existsSync(purchasesFilePath)) {
      data = fs.readFileSync(purchasesFilePath, "utf8");
    }

    let purchases = [];
    try {
      purchases = JSON.parse(data);
      // Ensure purchases is an array
      if (!Array.isArray(purchases)) {
        throw new Error("Purchases data is not an array");
      }
    } catch (parseError) {
      console.error("Error parsing purchase data:", parseError);
      purchases = [];
    }

    purchases.push(purchaseData);

    fs.writeFileSync(purchasesFilePath, JSON.stringify(purchases, null, 2));
  } catch (err) {
    console.error("Error saving purchase:", err);
  }
};

module.exports = router;
