const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, trim: true, lowercase: true },
  address: { type: String, trim: true },
  phoneNumber: { type: Number, min: 1000000000, max: 9999999999 },
  receiverName: { type: String, trim: true },
  receiverEmail: { type: String, trim: true, lowercase: true },
  receiverAddress: { type: String, trim: true },
  receiverPhoneNumber: { type: Number, min: 1000000000, max: 9999999999 },
  shippingMethod: { type: String, trim: true },
  trackingNumber: { type: String, trim: true },
  shippingAddress: { type: String, trim: true },
  shippingPhoneNumber: { type: Number, min: 1000000000, max: 9999999999 },
  price: { type: Number, min: 0 },
  currency: { type: String },
});

module.exports = mongoose.model("Shipment", shipmentSchema);
