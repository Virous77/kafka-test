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

const producer = kafka.producer();

const produce = async () => {
  await producer.connect();
  await producer.send({
    topic: "test.topic",
    messages: [{ value: "Hello Upstash!", partition: 0, key: "message" }],
  });
  console.log("Produced message");
  await producer.disconnect();
};
produce();
