/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */
const { registerFont } = require("canvas");
registerFont(`${process.cwd()}/assets/fonts/alka.ttf`, {
  family: "alka",
});
registerFont(`${process.cwd()}/assets/fonts/manrope.ttf`, {
  family: "manrope",
});
module.exports = (ctx, x, y, maxWidth, color, font, size, align, text) => {
  ctx.fillStyle = color;
  ctx.font = `${size}px ${font}`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y, maxWidth);
};
