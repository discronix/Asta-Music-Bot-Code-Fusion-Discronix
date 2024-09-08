/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "profile",
  aliases: ["pr"],
  cooldown: "",
  category: "config",
  usage: "",
  description: "See server configs",
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
    let [pfx, premiumUser, dev, admin] = await Promise.all([
      await client.db.pfx.get(`${client.user.id}_${message.author.id}`),
      await client.db.premium.get(`${client.user.id}_${message.author.id}`),
      await client.owners.find((x) => x === message.author.id),
      await client.admins.find((x) => x === message.author.id),
    ]);

    let premium =
      premiumUser == true
        ? "Lifetime"
        : premiumUser
          ? `Expiring <t:${`${premiumUser}`?.slice(0, -3)}:R>`
          : `\`No Active Plan\``;

    await message
      .reply({
        embeds: [
          new client.embed()

            .setAuthor({
              name: `Profile Panel`,

              iconURL: client.user.displayAvatarURL(),
            })
            .desc(
                `**Hey! Asta here, Welcome to Profile Overview**\n` +
                
              `\n**<a:music:1262124876685381704> User Prefix : ${pfx ? `\`${pfx}\`` : `\`Not set\``}**\n\n` +
                `${dev ? `<a:developer:1262274993077616660> - Developer\n` : ``}` +
                `${admin ? `<:Moderator:1261512451082682418> - Administrator\n` : ``}` +
                `${
                  premiumUser ? `<a:diamond:1263093738624782407> - Premium User\n` : ``
                }` +
                `<a:users:1263867768856383594> - Asta user/(s)\n\n` +
                `**Premium : ${premium}**\n\n`,
            )

            .thumb(message.member.displayAvatarURL())
            .img(

      "https://media.discordapp.net/attachments/1260198329422450789/1263321407857754202/standard_2.gif?ex=6699cf3f&is=66987dbf&hm=b940469ca479fbd94c1c85727e3b5d2c0abfefd945cb7b55d76a79cca60aa50b&",

    )


        ],
      })
      .catch(() => {});
  },
};
