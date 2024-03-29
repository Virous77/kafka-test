import { Kafka } from "kafkajs";
import readline from "readline";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function producerInit() {
  const producer = kafka.producer();
  await producer.connect();

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [location, rider] = line.split(" ");
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "location",
          value: JSON.stringify({ name: location, location: rider }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
}

producerInit();
