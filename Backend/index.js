const express = require("express");
const app = express();
app.use(express.json());
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());

const dbPath = path.join(__dirname, "megamindDB.db");
let db;

initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server successfully running");
    });
  } catch (error) {
    console.log(`DB Error: ${error}`);
  }
};
initializeDbAndServer();

// JWT Secret Key
const jwtSecretKey = "YOUR_SECRET_KEY";

// Middleware for JWT Authentication
const authValid = (request, response, next) => {
  const auth = request.headers["Authorization"];
  if (auth === undefined) {
    response.status(401);
    response.send("Unauthorized User");
  } else {
    const jwtToken = auth.split(" ")[1];
    if (jwtToken === undefined) {
      response.send("Unauthenticated user");
    } else {
      jwt.verify(jwtToken, jwtSecretKey, (error, user) => {
        if (error) {
          response.send("Invalid JWT token");
        } else {
          next();
        }
      });
    }
  }
};

// Login API
app.post("/login", async (request, response) => {
  const userData = request.body;
  const query = `SELECT * FROM login WHERE user_name="${userData.userName}";`;
  const user = await db.get(query);
  if (user === undefined) {
    response.status(400);
    response.send("Invalid username.");
  } else {
    if (userData.password === user.password) {
      const jwtToken = jwt.sign({ userName: user.user_name }, jwtSecretKey);
      response.status(200);
      response.send({ jwt_token: jwtToken });
      console.log(jwtToken);
    } else {
      response.send("Invalid Password");
    }
  }
});

// Register API
app.post("/register", async (request, response) => {
  const newUser = request.body;
  const { userName, password } = newUser;
  const userQuery = `SELECT * FROM login WHERE user_name="${userName}";`;
  const user = await db.get(userQuery);
  if (user === undefined) {
    const query = `INSERT INTO login (user_name, password) VALUES ("${userName}", "${password}");`;
    await db.run(query);
    response.send(`Mr. ${userName}! You are successfully registered.`);
  } else {
    response.send("User Already Existed. Please Login.");
  }
});

// Get services
app.get("/services", async (request, response) => {
  const query = `SELECT * FROM services`;
  const services = await db.all(query);
  response.send(services);
});

// Add a new service (requires authentication)
app.post("/services", authValid, async (request, response) => {
  const newService = request.body;
  const { icon, name, text } = newService;
  const query = `INSERT INTO services (icon, name, text) VALUES ("${icon}", "${name}", "${text}");`;
  await db.run(query);
  response.send("Service Added Successfully");
});

// Update a service (requires authentication)
app.put("/services/:serviceId", authValid, async (request, response) => {
  const { serviceId } = request.params;
  const updatedService = request.body;
  const { icon, name, text } = updatedService;
  const query = `UPDATE services SET icon="${icon}", name="${name}", text="${text}" WHERE service_id=${serviceId};`;
  await db.run(query);
  response.send("Service Updated Successfully");
});

// Delete a service (requires authentication)
app.delete("/services/:serviceId", authValid, async (request, response) => {
  const { serviceId } = request.params;
  const query = `DELETE FROM services WHERE service_id=${serviceId};`;
  await db.run(query);
  response.send("Service Deleted Successfully");
});


app.listen(5000, () => {
  console.log(`Server is running on port ${port}`);
});
