/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's invite link",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
    await message
      .reply({
        embeds: [
          new client.embed().desc(
            `${emoji.bell} **Hey! Asta Here. Want To Invite Me? Click The Button Below To Invite**`,
          ),
        ],
        components: [
          new ActionRowBuilder().addComponents(
            new client.button().link("Admin Perms", client.invite.admin),
            new client.button().link("Required Perms", client.invite.required),
          ),
        ],
      })
      .catch(() => {});
  },
};
