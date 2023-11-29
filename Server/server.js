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
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("port connected");
});
