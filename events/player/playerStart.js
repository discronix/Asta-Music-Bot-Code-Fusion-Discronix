/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { RateLimitManager } = require("@sapphire/ratelimits");
const adCooldownManager = new RateLimitManager(600000);

module.exports = {
  name: "playerStart",
  run: async (client, player, track) => {
    if (!track?.title) return;

    const premium = await client.db.premium.get(
      `${client.user.id}_${player.guildId}`,
    );
    const path =
      (await client.db.preset.get(`${client.user.id}_${player.guildId}`)) ||
      `embeds/embed3.js`;

    let requester = track?.requester;

    const data = await require(`@presets/${path}`)(
      {
        title:
          track?.title.replace(/[^a-zA-Z0-9\s]/g, "").substring(0, 25) ||
          "Something Good",
        author:
          track?.author.replace(/[^a-zA-Z0-9\s]/g, "").substring(0, 20) ||
          "Painfuego",
        duration: track?.isStream
          ? "◉ LIVE"
          : client.formatTime(player.queue?.current?.length) || "06:09",
        thumbnail:
          track?.thumbnail ||
          client.user.displayAvatarURL().replace("webp", "png"),
        color: client.color || "#FFFFFF",
        progress: Math.floor(Math.random() * 60) + 10 || 70,
        source: track?.sourceName,
        requester: requester,
      },
      client,
      player,
    );

    await player.data.set("autoplaySystem", track);
    const ad = new client.embed()
      .desc(
        `Sponsored content [ Ends in 10s ]\n` +
          `**Want your server's AD here ? Join [Support Server](${client.support})**`,
      )
      .img("https://share.creavite.co/668e3360c7f9c736f75568f1.gif")
      .setFooter({
        text: `Its the sponsors that help us keep our services free for the users. ㅤㅤ ㅤㅤㅤ`,
      });

    let channel = await client.channels.cache.get(player.textId);

    const adCooldownBucket = adCooldownManager.acquire(`${player.guildId}`);
    if (!adCooldownBucket.limited && !premium) {
      await channel
        ?.send({ embeds: [ad] })
        .then((m) =>
          setTimeout(async () => {
            await m.delete().catch(() => {});
          }, 30000),
        )
        .catch(() => {});
      try {
        adCooldownBucket.consume();
      } catch (e) {}
    }

    const msg = await channel
      ?.send({
        embeds: data[0],
        files: data[1],
        components: data[2],
      })
      .catch(() => {});

    if (msg) player.data.set("message", msg);

    await client.webhooks.player
      .send({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [
          new client.embed().desc(
            `**Playing** ${track?.title
              .replace(/[^a-zA-Z0-9\s]/g, "")
              .substring(0, 35)} in [ ${client.guilds.cache.get(
              player.guildId,
            )} ]`,
          ),
        ],
      })
      .catch(() => {});
  },
};
