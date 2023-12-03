const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
const Shipment = require("./Shipment");
const jwt = require("jsonwebtoken");
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

// app.post("/", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await collection.findOne({ email });

//     if (user) {
//       // Проверка на паролата
//       if (user.password === password) {
//         // Генериране на токен
//         const token = jwt.sign(
//           { email: user.email, role: user.role },
//           "secret_key"
//         );

//         // Изпращане на токена към клиента
//         res.json({ token });
//       } else {
//         res.json("notexist");
//       }
//     } else {
//       res.json("notexist");
//     }
//   } catch (e) {
//     res.json("fail");
//   }
// });

app.post("/signup", async (req, res) => {
  const { email, password, role, userName } = req.body;

  const data = {
    email: email,
    password: password,
    role: role,
    userName: userName,
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
  const { senderName, senderEmail, receiverEmail, packageDescription } =
    req.body;

  try {
    // Проверка дали пратката със същите имейли на изпращач и получател вече съществува
    const existingShipment = await Shipment.findOne({
      senderEmail,
      receiverEmail,
    });

    if (existingShipment) {
      return res.status(400).json({ error: "Shipment already exists" });
    }

    // Създаване на нова пратка с използване на модела Shipment
    const newShipment = new Shipment({
      senderName,
      senderEmail,
      receiverEmail,
      packageDescription, // Добавяме описание на пакета
    });

    // Запазване на новата пратка в MongoDB
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

app.get("/userShipments", async (req, res) => {
  const { userEmail } = req.query;

  try {
    const userShipments = await Shipment.find({
      receiverEmail: userEmail,
    });

    res.json(userShipments);
  } catch (error) {
    console.error("Error fetching user shipments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/updateUser", async (req, res) => {
  const { email, newPassword, newUserName } = req.body;

  try {
    // Търсене на потребителя в базата данни по имейла
    const user = await collection.findOne({ email });

    if (user) {
      // Актуализиране на потребителя с новата парола и/или новото име
      if (newPassword) {
        user.password = newPassword;
      }

      if (newUserName) {
        user.userName = newUserName;
      }

      // Запазване на актуализирания потребител в базата данни
      await user.save();

      res.json({ message: "User updated successfully" });
    } else {
      // Ако потребителят не е намерен, върнете съобщение за грешка
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // Обработка на грешките при работа с базата данни
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
