const express = require("express");
const router = express.Router();
const Shipment = require("../models/Shipments");
const qr = require("qr-image");
const { jsPDF } = require("jspdf");

// Save shipment data and generate QR code
router.post("/", async (req, res) => {
  try {
    const shipmentData = req.body;

    // Save the shipment data to MongoDB
    const shipment = new Shipment(shipmentData);
    await shipment.save();

    // Generate QR Code as a PNG image
    const qrCode = qr.imageSync(JSON.stringify(shipmentData), { type: "png" });
    const qrCodeBase64 = qrCode.toString("base64");

    // Generate a PDF with the QR Code
    const doc = new jsPDF();
    doc.text("Form Data QR Code", 10, 10);
    doc.addImage(
      `data:image/png;base64,${qrCodeBase64}`,
      "PNG",
      10,
      20,
      180,
      180
    );
    const pdfData = doc.output("arraybuffer");

    // Send the PDF data as a base64 string in the response
    res.json({ success: true, pdf: Buffer.from(pdfData).toString("base64") });
  } catch (error) {
    console.error("Error processing shipment:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
