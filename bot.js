const { Client, GatewayIntentBits } = require("discord.js");
const cron = require("node-cron");
const axios = require("axios");

// Create a new Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Log in the bot using the token
client.login(
  "TOKEN_PLACEHOLDER"
);

// When the bot is ready
client.once("ready", () => {
  console.log("Bot is online!");

  // Schedule a message to be sent every Thursday at 5:10 PM
  cron.schedule("0 17 10 * * 4", () => {
    
    console.log("Sending message...");
    // Replace 'CHANNEL_ID_PLACEHOLDER' with the ID of the channel you want to send the message to
    const channel = client.channels.cache.get("CHANNEL_ID_PLACEHOLDER");
    if (channel) {
      channel.send(":sparkles::sparkles::sparkles::sparkles::sparkles:**Epic Games haut wieder neue Dinger raus!**:sparkles::sparkles::sparkles::sparkles::sparkles:");
    }

    if (channel) {
        // Define headers
        const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        };

        axios.get("https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=de&country=DE&allowCountries=DE", { headers })
        .then((response) => {
            const elements = response.data.data.Catalog.searchStore.elements;
            const endDate = new Date( Date.parse( elements[0].promotions.promotionalOffers[0].promotionalOffers[0] .endDate ) ).toDateString();
            channel.send( "**" + elements[0].title + "**\n- " + elements[0].description + "\n- link: https://store.epicgames.com/de/p/" + elements[0].catalogNs.mappings[0].pageSlug + "\n**Endet: " + endDate + "**" );
            channel.send( "**" + elements[1].title + "**\n- " + elements[1].description + "\n- link: https://store.epicgames.com/de/p/" + elements[1].catalogNs.mappings[0].pageSlug + "\n**Endet: " + endDate + "**" );
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }
  });
});
