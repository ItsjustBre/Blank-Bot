const { ActivityType, Events } = require("discord.js");
const logger = require("@turkerssh/logger");
const config = require("../../config");

module.exports = (client) => {
    client.once(Events.ClientReady, (readyClient) => {
        readyClient.user.setPresence({
            activities: [
                {
                    name: config.PresenceInformation?.ActivityState || "The B Continental",
                    type: ActivityType.Watching
                }
            ],
            status: "online"
        });

        logger.success({
            type: "client",
            message: `${readyClient.user.tag} is ready!`
        });

        console.log("🗝️ THE STEWARD | The B Continental is open.");
    });
};
