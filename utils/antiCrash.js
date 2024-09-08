/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = (client) => {
  client.log(`Loaded Anti-Crash Error Handler (UR, UE)`, "ready");

  process.on("unhandledRejection", (...args) => {
    if (`${args}`.includes("Player is already destroyed")) return;
    client.log(`unhandledRejection ${args}`, "warn");
    console.log(...args);
  });
  process.on("uncaughtException", (...args) => {
    client.log(`uncaughtException ${args}`, "warn");
    console.log(...args);
  });
};
