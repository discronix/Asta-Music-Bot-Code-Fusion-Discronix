const genCommandList = require("@gen/commandList.js");
const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's help menu",
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
    let categories = await client.categories.filter((c) => c != "owner");
    categories = categories.sort((b, a) => b.length - a.length);
    let cat = categories
      .map(
        (c) =>
          `> **${emoji[c]} • ${
            c.charAt(0).toUpperCase() + c.slice(1)
          } Commands**\n`,
      )
      .join("");

    const Menu = ` # My Commands`;

    const embed = new client.embed()
      
      .setDescription(`<a:music:1262124876685381704> **Hey ASTA here preseting you the best quality music bot which you can experience by using my prefix , and ,help for more info.<a:coding:1259421116120961046>

<:headphones:1263310608174940211>you can also join our [server](https://discord.com/invite/UFuhyzhrbX)
<:headphones:1263310608174940211>thanks for choosing me.**

## <:arrow:1263094167027056661> **__CATEGORY__**

\n${cat}`) // Help links are now above the categories
      .setThumbnail(client.user.displayAvatarURL())
      .img(
      "https://media.discordapp.net/attachments/1260198329422450789/1263321407857754202/standard_2.gif?ex=6699cf3f&is=66987dbf&hm=b940469ca479fbd94c1c85727e3b5d2c0abfefd945cb7b55d76a79cca60aa50b&",
    );
   
        
   



    let arr = [];
    for (let category of categories) {
      let cmnds = client.commands.filter((c) => c.category == category);
      arr.push(cmnds.map((c) => `\`${c.name}\``));
    }

   let allCmds = categories.map(
  (cat, i) =>
    `${emoji[cat]} __**${cat.charAt(0).toUpperCase() + cat.slice(1)}**__**\n${arr[i].join(", ")}**`
);
let desc = allCmds.join("\n");

    const all = new client.embed()
      .setDescription(desc)
      .img(
      "https://media.discordapp.net/attachments/1260198329422450789/1263321407857754202/standard_2.gif?ex=6699cf3f&is=66987dbf&hm=b940469ca479fbd94c1c85727e3b5d2c0abfefd945cb7b55d76a79cca60aa50b&",
    );



    let menu = new StringSelectMenuBuilder()
      .setCustomId("menu")
      .setMinValues(1)
      .setMaxValues(1)
      .setPlaceholder("ASTA | SELECT THE CATEGORY TO BROWSE CMDS")
      .addOptions([
        {
          label: "Go to homepage",
          value: "home",
          emoji: `${emoji.home}`,
        },
      ]);

    const selectMenu = new ActionRowBuilder().addComponents(menu);

    categories.forEach((category) => {
      menu.addOptions({
        label:
          category.charAt(0).toUpperCase() + category.slice(1) + ` commands`,
        value: category,
        emoji: `${emoji[category]}`,
      });
    });

    menu.addOptions([
      {
        label: "Show all commands",
        value: "all",
        emoji: `${emoji.all}`,
      },
    ]);

    const m = await message.reply({
      embeds: [embed],
      components: [selectMenu],
    });

    const filter = async (interaction) => {
      if (interaction.user.id === message.author.id) {
        return true;
      }
      await interaction.message.edit({
        components: [selectMenu],
      });
      await interaction
        .reply({
          embeds: [
            new client.embed().setDescription(
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

      const category = interaction.values[0];
      switch (category) {
        case "home":
          await m.edit({
            embeds: [embed],
          }).catch(() => {});
          break;

        case "all":
          await m.edit({
            embeds: [all],
          }).catch(() => {});
          break;

        default:
          await m.edit({
            embeds: [
              new client.embed().setTitle(`__**${category.toUpperCase()} Commands**__`).setDescription(await genCommandList(client, category))





                .img(
      "https://media.discordapp.net/attachments/1260198329422450789/1263321407857754202/standard_2.gif?ex=6699cf3f&is=66987dbf&hm=b940469ca479fbd94c1c85727e3b5d2c0abfefd945cb7b55d76a79cca60aa50b&",
    )


            ],
          }).catch(() => {});
          break;
      }
    });

    collector?.on("end", async () => {
      await m.edit({ components: [] }).catch(() => {});
    });
  },
};
