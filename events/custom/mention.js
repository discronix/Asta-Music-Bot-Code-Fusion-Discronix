/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 The Extremez
 */

 const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "mention",
  run: async (client, message) => {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// Reply when bot is mentioned ////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    const embed = new EmbedBuilder()
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle("**Hey ASTA here!**")
      .addFields(
        {
          name: `<a:Arrowwhite:1261510814414930031> Try Using ,help to get a list of commands`,
          value: `<a:Arrowwhite:1261510814414930031> If you continue to have problems, consider asking for help on our discord server.`,
        }
      )
      .setImage("https://media.discordapp.net/attachments/1260198329422450789/1263321407857754202/standard_2.gif?ex=6699cf3f&is=66987dbf&hm=b940469ca479fbd94c1c85727e3b5d2c0abfefd945cb7b55d76a79cca60aa50b&");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Support")
        .setStyle(ButtonStyle.Link)
        .setURL(client.support),
      new ButtonBuilder()
        .setLabel("Add Me")
        .setStyle(ButtonStyle.Link)
        .setURL(client.invite.admin)
    );

    await message.reply({ embeds: [embed], components: [row] }).catch(() => {});
  },
};
