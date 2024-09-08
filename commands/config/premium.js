/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

const voucher_codes = require("voucher-code-generator");

module.exports = {
  name: "premium",
  aliases: [],
  cooldown: "",
  category: "config",
  usage: "",
  description: "Shows your premium status",
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
    let [premiumUser, premiumGuild, owner, admin] = await Promise.all([
      await client.db.premium.get(`${client.user.id}_${message.author.id}`),
      await client.db.premium.get(`${client.user.id}_${message.guild.id}`),
      await client.owners.find((x) => x === message.author.id),
      await client.admins.find((x) => x === message.author.id),
    ]);

    const cmd = args[0] ? args[0].toLowerCase() : null;
    const type = args[1] ? args[1].toLowerCase() : null;

    switch (cmd) {
      case "gen":
        if (!owner && !admin)
          return await message.reply({
            embeds: [
              new client.embed().desc(
                `${emoji.admin} **Only my Owner/s and Admin/s can use this command**`,
              ),
            ],
          });
        let code;
        switch (type) {
          case "guild":
            code = voucher_codes.generate({
              pattern: `ASTA-####-GUILD-DUR${args[2] || 7}`,
            });
            code = code[0].toUpperCase();
            await client.db.vouchers.set(code, true);
            break;
          default:
            code = voucher_codes.generate({
              pattern: `ASTA-#####-USER-DUR${args[2] || 7}`,
            });
            code = code[0].toUpperCase();
            await client.db.vouchers.set(code, true);
            break;
        }
        await message
          .reply({
            embeds: [
              new client.embed().desc(
                `<a:Arrowwhite:1261510814414930031> **Here's your generated code**\n` +
                  `${emoji.bell} **Usage :** ${client.prefix}redeem your_code\n` +
                  `${emoji.rich} ||${code}||\n`,
              ),
            ],
          })
          .catch(() => {});
        break;
      default:
        await message
          .reply({
            embeds: [
              new client.embed()
                .setAuthor({
                  name: `What about my premium ?`,
                  iconURL: client.user.displayAvatarURL(),
                })
                .desc(
                  `
                    <:red_musicnote:1263128464043675648> Unlock the Ultimate Music Experience with Premium! <:red_musicnote:1263128464043675648>

Thank you for your interest in upgrading to Premium! <a:diamond:1263093738624782407> With our Premium plan, youâ€™ll elevate your music sessions to the next level. Hereâ€™s what youâ€™ll get:

<:Skip:1263311019103748139> Unlimited Skips - Skip as many tracks as you like, whenever you like!

<:headphones:1263310608174940211> High-Quality Audio - Enjoy music in stunning clarity, making every beat feel alive.

<a:users:1263867768856383594> 24/7 Playback - Keep the tunes going non-stop, even when youâ€™re offline.

<a:developer:1262274993077616660> Advanced Commands - Access exclusive features to customize your listening experience.

<a:member:1269349591455760456> Early Access - Be the first to try out new features and updates.

<a:server:1263823877314711614> No Ads - There Will Be No Server Ads When Played Music.

<a:Spotify:1261511104102924331> No Prefix - You Can Use Bot Without Any Prefix.

**Ready to take your music to the next level? Upgrade now and enjoy an uninterrupted, premium experience!

This introduction is designed to highlight the key benefits of the Premium plan, encouraging users to consider upgrading.**`,
                ),
            ],
          })
          .catch(() => {});
        break;
    }
  },
};
