/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "voiceStateUpdate",
  run: async (client, oldState, newState) => {
    let guildId = newState.guild.id;
    if (!newState.guild.members.cache.get(client.user.id).voice.channelId) {
      await client.sleep(1500);
      await client.getPlayer(guildId).then((player) => player?.destroy());
    }
  },
};
