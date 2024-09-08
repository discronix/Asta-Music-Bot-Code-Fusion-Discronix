/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = progressBar = (player, size = 15) => {
  const redLine = "<:emoji_35:1260225154596733028>";
  const whiteLine = "<:emoji_32:1260225056496156733>";
  const slider = "<:emoji_27:1260224801654444084>";

  if (!player.queue.current) {
    return `${slider}${whiteLine.repeat(size - 1)}`;
  }

  const current = player.shoukaku.position || 0;
  const total = player.queue.current.length;

  if (current > total) {
    return `${redLine.repeat(size - 1)}${slider}`;
  }

  const progress = Math.round((size - 1) * (current / total));
  const remaining = size - 1 - progress;
  const bar = `${redLine.repeat(progress)}${slider}${whiteLine.repeat(
    remaining,
  )}`;

  return bar;
};
