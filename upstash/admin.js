import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  brokers: [process.env.URL],
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  ssl: true,
  logLevel: logLevel.ERROR,
});

const admin = kafka.admin();

export async function adminInit() {
  try {
    admin.connect();
    admin.listTopics().then((data) => {
      console.log("Topics", data);
    });
    // await admin.createTopics({
    //   validateOnly: false,
    //   waitForLeaders: true,
    //   topics: [{ topic: "tes", numPartitions: 1, replicationFactor: 1 }],
    // });
    await admin.disconnect();
  } catch (error) {
    console.error("Error in adminInit", error);
  }
}

adminInit();
