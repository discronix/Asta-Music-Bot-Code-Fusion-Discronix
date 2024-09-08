/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "buy",
  aliases: [],
  cooldown: "",
  category: "config",
  usage: "",
  description: "Use coins to buy premium",
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
    let [coins, premiumUser, premiumGuild] = await Promise.all([
      parseInt((await client.db.coins.get(`${message.author.id}`)) || 0),
      await client.db.premium.get(`${client.user.id}_${message.author.id}`),
      await client.db.premium.get(`${client.user.id}_${message.guild.id}`),
    ]);

    let user = new StringSelectMenuBuilder()
      .setCustomId("user")
      .setMinValues(1)
      .setMaxValues(1)
      .setPlaceholder("Choose the following plans given below(User)")
      .addOptions([
        {
          label: "7 days premium (300 coins)",
          value: "7_300",
          emoji: `<a:diamond:1263093738624782407>`,
        },
        {
          label: "28 days premium (1000 coins)",
          value: "28_1000",
          emoji: `<a:diamond:1263093738624782407>`,
          disabled: true,
        },
        {
          label: "84 days premium (2500 coins)",
          value: "84_2500",
          emoji: `<a:diamond:1263093738624782407>`,
        },
        {
          label: "168 days premium (5000 coins)",
          value: "168_5000",
          emoji: `<a:diamond:1263093738624782407>`,
        },
      ]);
    let guild = new StringSelectMenuBuilder()
      .setCustomId("guild")
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "7 days premium (500 coins)",
          value: "7_500",
          emoji: `<a:diamond:1263093738624782407>`,
        },
        {
          label: "28 days premium (1800 coins)",
          value: "28_1800",
          emoji: `<a:diamond:1263093738624782407>`,
          disabled: true,
        },
        {
          label: "84 days premium (5000 coins)",
          value: "84_5000",
          emoji: `<a:diamond:1263093738624782407>`,
        },
        {
          label: "168 days premium (7500 coins)",
          value: "168_7500",
          emoji: `<a:diamond:1263093738624782407>`,
        },
      ]);

    let rows = [
      premiumUser
        ? new ActionRowBuilder().addComponents(
            user
              .setDisabled(true)
              .setPlaceholder("Premium is already active"),
          )
        : new ActionRowBuilder().addComponents(
            user
              .setDisabled(false)
              .setPlaceholder("Choose your premium plan (User)"),
          ),
      premiumGuild
        ? new ActionRowBuilder().addComponents(
            guild
              .setDisabled(true)
              .setPlaceholder("Guild premium is already active"),
          )
        : new ActionRowBuilder().addComponents(
            guild
              .setDisabled(false)
              .setPlaceholder("Choose your premium plan (Guild)"),
          ),
    ];

    const m = await message
      .reply({
        embeds: [
          new client.embed()
            .desc(
              `<a:coin1:1263134517443694652> **You have a total of ${coins || `0`} coins\n\n` +
                `<:red_musicnote:1263128464043675648> Ready to Upgrade? Purchase Premium Now! <:red_musicnote:1263128464043675648>

With our ,buy command, securing your Premium membership is just a step away. Unlock exclusive features, enjoy high-quality audio, and elevate your music experience instantly!

Simply type ,buy to get started, and join our community of music lovers who are already enjoying the best we have to offer.

<a:diamond:1263093738624782407> Your premium music journey awaits! <a:diamond:1263093738624782407>**`,
            )

            .setFooter({
              text: `developed by not.amit.ㅤㅤ`,
            }),
        ],
        components: rows,
      })
      .catch(() => {});

    const filter = async (interaction) => {
      if (interaction.user.id === message.author.id) {
        return true;
      }
      await interaction
        .reply({
          embeds: [
            new client.embed().desc(
              `${emoji.no} Only **${message.author.tag}** can use this`,
            ),
          ],
          ephemeral: true,
        })
        .catch(() => {});
      return false;
    };
    const collector = m?.createMessageComponentCollector({
      filter: filter,
      time: 60000,
      idle: 60000 / 2,
    });

    collector?.on("collect", async (interaction) => {
      if (!interaction.deferred) await interaction.deferUpdate();

      const choice = interaction.values[0];
      let duration = choice.split("_")[0];
      let coinsNeeded = choice.split("_")[1];
      let type = interaction.customId;

      if (coins < coinsNeeded) {
        await m.edit({ components: rows });
        return interaction.followUp({
          embeds: [
            new client.embed().desc(
              `**Need coins ? Here's how you can get them:**\n\n` +
                `${emoji.free}**For Freebies :**\n` +
                `⠀⠀⠀Each cmd used (1-3 coins)\n` +
                `⠀⠀⠀Add me in server (150 coins)\n` +
                `${emoji.rich}**For Rich boys :**\n` +
                `⠀⠀⠀Boost support server (1000 coins)\n` +
                `⠀⠀⠀Pay 1.5M UwU or 29.99 INR (1800 coins)\n` +
                `${emoji.danger}**For Daredevils :**\n` +
                `⠀⠀⠀Beg ! May get u rich / blacklisted\n\n` +
                `${emoji.warn} **You need ${
                  coinsNeeded - coins
                } more coins for this plan**`,
            ),
          ],
          ephemeral: true,
        });
      }

      coins = coins - coinsNeeded;
      await client.db.coins.set(`${message.author.id}`, coins);
      let time = new Date();
      time = time.setDate(time.getDate() + parseInt(duration));
      await client.db.premium.set(
        `${client.user.id}_${
          type == "user" ? message.author.id : message.guild.id
        }`,
        time,
      );

      interaction.CustomId;
      await m
        .edit({
          embeds: [
            new client.embed()
              .title(`Premium Activated !`)
              .desc(
                `**${emoji.cool} Expiry : **<t:${Math.round(
                  time / 1000,
                )}:R>\n` +
                  `**${emoji.premium} Premium Type : **${type.toUpperCase()}\n`,
              )
              .addFields({
                name: `Privilages attained :\n`,
                value: `${
                  type == "user"
                    ? `${emoji.on} \`No prefix\`\n` +
                      `${emoji.on} \`Vote bypass\`\n` +
                      `${emoji.on} \`Support priority\`\n` +
                      `${emoji.on} \`Badge in profile\`\n` +
                      `${emoji.on} \`Role in support Server\`\n` +
                      `${emoji.on} \`Early access & more...\``
                    : `${emoji.on} \`Vote bypass\`\n` +
                      `${emoji.on} \`Customizable playEmbed\`\n` +
                      `${emoji.on} \`Better sound quality\`\n` +
                      `${emoji.on} \`Volume limit increase\`\n` +
                      `${emoji.on} \`Early access & more...\``
                }`,
              })
              .thumb(
                `https://media.discordapp.net/attachments/1188399617121984542/1188742184095195228/8ef5f8c801f3cdbcb74794e2b153f445.webp?ex=659ba16e&is=65892c6e&hm=2b4d78014d77d635cc22e603979e1b8e121070cf2a72abd44b38d165dc24b708&=&format=png`,
              )
              .setFooter({
                text: `${message.author.username}, we hope you enjoy our services`,
              }),
          ],
          components: [],
        })
        .catch(() => {});
    });

    collector?.on("end", async () => {
      await m.edit({ components: [] }).catch(() => {});
    });
  },
};
