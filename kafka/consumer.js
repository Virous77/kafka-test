import { Kafka } from "kafkajs";
import { Sequelize } from "sequelize";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

export const sequelize = new Sequelize({
  port: 3307,
  host: "localhost",
  database: "logs",
  password: "test12",
  username: "root",
  dialect: "mysql",
});

async function connect() {
  await sequelize.authenticate();
  console.log("connected");
}

connect();

const logs = sequelize.define("user", {
  location: {
    type: Sequelize.STRING,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const input = process.argv[2];

const createUser = async (req) => {
  console.log(req);
  try {
    const cc = await logs.create(JSON.parse(req));
    console.log(cc);
  } catch (error) {
    console.log(error);
  }
};

export async function consumerInit() {
  const consumer = kafka.consumer({ groupId: input });

  await consumer.connect();
  console.log("consumer connected");

  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      createUser(message.value.toString());
    },
  });
}

consumerInit();
