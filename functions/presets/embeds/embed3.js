/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const genButtons = require("@gen/playerButtons.js");
const { AttachmentBuilder } = require("discord.js");

module.exports = async (data, client, player) => {
  /*
  const title = data.title;
  const author = data.author;
  const thumbnail = data.thumbnail;
  const duration = data.duration;
  const color = data.color;
  const progress = data.progress;
  const source = data.source;
  */

  const title = data.title;
  const author = data.author;
  const duration = data.duration;
  const thumbnail = data.thumbnail;

  const embed = new client.embed()
    .addFields([
      {
        name: `<a:x_filters:1247590000523214962> **Now Playing..**`,
        value:
          `<a:x_LightingBolt:1247589192003878943> **Song <a:Arrowwhite:1261510814414930031>** ${title.substring(0, 20)}...\n` +
          `<a:x_LightingBolt:1247589192003878943> **Author <a:Arrowwhite:1261510814414930031>** ${author}\n` +
          `<a:x_LightingBolt:1247589192003878943> **Duration <a:Arrowwhite:1261510814414930031>**${duration}\n` +
          `**Requester <a:Arrowwhite:1261510814414930031>**${player.queue.current.requester}`,
        inline: true,
      },
    ])
    .thumb(thumbnail)
    .img(
      "https://media.discordapp.net/attachments/1260198329422450789/1263323005795172444/standard_3.gif?ex=6699d0bb&is=66987f3b&hm=55cc22db373e45c6ba36aad3ab7ce9d25b57d01931cee27a0dda955c40e7f78d&",
    );

  return [[embed], [], [genButtons(client, player, 5)[0]]];
};
