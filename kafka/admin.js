import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

export async function adminInit() {
  const admin = kafka.admin();
  admin.connect();
  console.log("admin connected");

  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });

  console.log("topics created");

  await admin.disconnect();
}

adminInit();
