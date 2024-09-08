/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "resume",
  aliases: [],
  cooldown: "",
  category: "music",
  usage: "",
  description: "resume the player",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: true,
  queue: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (client, message, args, emoji) => {
    const player = await client.getPlayer(message.guild.id);

    if (!player.shoukaku.paused) {
      let emb = new client.embed().desc(
        `${emoji.no} **The player is not paused**`,
      );
      return message.reply({ embeds: [emb] }).catch(() => {});
    }

    await player.pause(false);
    await updateEmbed(client, player);
    let emb = new client.embed().desc(`${emoji.yes} **Resumed the player**`);
    return message.reply({ embeds: [emb] }).catch(() => {});
  },
};
