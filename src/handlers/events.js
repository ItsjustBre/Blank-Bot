const logger = require("@turkerssh/logger");
const { readdirSync } = require("fs");

module.exports = (client) => {
    const files = readdirSync("./src/events")
        .filter(file => file.endsWith(".js"));

    for (const file of files) {
        try {
            const setup = require(`../events/${file}`);

            // Each event module registers its own listeners.
            setup(client);

            logger.success({
                type: "events",
                message: `Loaded ${file}`
            });
        } catch (error) {
            logger.error({
                type: "events",
                message: `Error loading ${file}: ${error.message}`
            });
            console.error(error);
        }
    }
};
