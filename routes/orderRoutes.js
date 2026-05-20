const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { items, totalAmount } = req.body;

  const order = await Order.create({
    items,
    totalAmount,
    createdBy: req.user.id
  });

  res.json(order);
});

router.get("/", auth, async (req, res) => {
  const orders = await Order.find().populate("createdBy", "name");
  res.json(orders);
});

module.exports = router;