const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
const Shipment = require("./Shipment");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email });

    if (user) {
      // Проверка на паролата
      if (user.password === password) {
        res.json("exist");
      } else {
        res.json("notexist");
      }
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;

  const data = {
    email: email,
    password: password,
    role: role,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      await collection.create(data);
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.get("/userRole", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await collection.findOne({ email });

    if (user) {
      res.json({ role: user.role });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", async (req, res) => {
  const { role } = req.query;

  try {
    const users = await collection.find({ role });

    if (users) {
      res.json(users);
    } else {
      res.status(404).json({ error: "No client users found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/sendPackage", async (req, res) => {
  const { senderName, senderEmail, receiverEmail } = req.body;

  try {
    // Check if a shipment with the same sender and receiver emails already exists
    const existingShipment = await Shipment.findOne({
      senderEmail,
      receiverEmail,
    });

    if (existingShipment) {
      return res.status(400).json({ error: "Shipment already exists" });
    }

    // Create a new shipment using the Shipment model
    const newShipment = new Shipment({
      senderName,
      senderEmail,
      receiverEmail,
    });

    // Save the new shipment to MongoDB
    await newShipment.save();

    res.json({ message: "Package sent successfully", shipment: newShipment });
  } catch (error) {
    console.error("Error sending package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/shipments", async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    console.error("Error fetching shipments", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/shipments/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Use Mongoose to find and delete the shipment
    const deletedShipment = await Shipment.findByIdAndDelete(id);

    if (!deletedShipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }

    res.json({ message: "Shipment deleted successfully" });
  } catch (error) {
    console.error("Error deleting shipment", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
