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

const consumer = kafka.consumer({ groupId: "test-group" });

const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test.topic" });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
        key: message.key.toString(),
        partition,
        topic,
      });
    },
  });
};

consume();
