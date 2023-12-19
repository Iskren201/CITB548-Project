const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
const Shipment = require("./Shipment");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Office = require("./Office");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const todoSchema = new mongoose.Schema({
  text: String,
  createdBy: String,
  done: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

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
      packageDescription,
      // sentBy,
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
  authenticateUser;

  try {
    // const userShipments = await Shipment.find({
    //   receiverEmail: userEmail,
    // });

    const receivedBy = req.user.email;

    const userShipments = await Shipment.find({
      receiverEmail: userEmail,
      receivedBy,
    });

    res.json(userShipments);
  } catch (error) {
    console.error("Error fetching user shipments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  next();
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

app.post("/todos", async (req, res) => {
  const { text, createdBy, done } = req.body;

  try {
    // Използвайте create, за да създадете нов Todo в базата данни
    const newTodo = await Todo.create({
      text,
      createdBy,
      done,
    });

    res.json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/todos", async (req, res) => {
  try {
    // Използвайте find, за да вземете всички todos от базата данни
    const todos = await Todo.find();

    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    // Използвайте findByIdAndDelete, за да изтриете Todo от базата данни
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/offices", async (req, res) => {
  try {
    const offices = await Office.find();
    res.json(offices);
  } catch (error) {
    console.error("Error fetching offices", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addOffice", async (req, res) => {
  const officeInfo = req.body;

  try {
    // Save the new office information to MongoDB or perform any necessary actions
    const result = await Office.create(officeInfo);

    // Respond to the client
    res.json({
      message: "Office added successfully" /* any additional data */,
    });
  } catch (error) {
    console.error("Error adding office:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
