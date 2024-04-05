import cron from "node-cron";

export const cronJob = async () => {
  const serverUrl = process.env.SERVER_URL;

  cron.schedule("*/15 * * * *", async () => {
    try {
      await fetch(`${serverUrl}/test`);

      console.log("Server Check every 15 min");
    } catch (error) {
      console.error("Error while hitting API:", error);
    }
  });
};
