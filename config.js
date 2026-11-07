module.exports = {
  GeneralInformation: {
    BotName: process.env.BOT_NAME || "The Steward",
    BotToken: process.env.BOT_TOKEN,
    BotId: process.env.BOT_ID,
  },

  PresenceInformation: {
    ActivityState: process.env.BOT_ACTIVITY || "Watching over The B Continental",
  },

  WebhookInformation: {
    ShardWebhook: process.env.SHARD_WEBHOOK_URL || "",
  },
};
