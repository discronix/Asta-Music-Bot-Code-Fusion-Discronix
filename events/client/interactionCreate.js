/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.isModalSubmit()) {
      switch (interaction.customId) {
        case "report":
          await client.emit("reportSubmit", interaction);
          break;

        default:
          break;
      }
      return;
    }

    if (interaction.isButton()) {
      let playerButtonIds = [
        `${interaction.guildId}play_pause`,
        `${interaction.guildId}previous`,
        `${interaction.guildId}skip`,
        `${interaction.guildId}stop`,
        `${interaction.guildId}autoplay`,
      ];
      if (playerButtonIds.includes(interaction.customId))
        return client.emit("playerButtonClick", interaction);
      return;
    }
  },
};
