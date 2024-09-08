/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const roundRect = require("./roundedRect.js");

module.exports = (ctx, bar) => {
  ctx.fillStyle = bar.bg;
  roundRect(ctx, bar.x, bar.y, bar.width, bar.height, bar.radius);
  ctx.fillStyle = bar.fg;
  roundRect(
    ctx,
    bar.x,
    bar.y,
    (bar.width / 100) * bar.progress,
    bar.height,
    bar.radius,
  );
  ctx.beginPath();
  ctx.arc(
    bar.x + (bar.width / 100) * bar.progress,
    bar.y + bar.height / 2,
    bar.height * 0.8,
    0,
    360,
  );
  ctx.fill();
  ctx.closePath();
};
