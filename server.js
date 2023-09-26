import express from "express";
import { Sequelize } from "sequelize";

const app = express();

export const sequelize = new Sequelize({
  port: 3306,
  host: "mysql",
  database: "logs",
  password: "test12",
  username: "root",
  dialect: "mysql",
});

const User = sequelize.define(
  "user",
  {
    location: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
  }
);

async function initializeDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
}

initializeDatabase();

app.get("/", (req, res) => {
  res.send("welcome to kafka test");
});

app.listen(4000, () => console.log("connected"));

// docker run -p 2181:2181 -d --rm zookeeper
// docker run -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=192.168.1.37:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.1.37:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 --rm -d confluentinc/cp-kafka