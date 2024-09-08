/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = async (client) => {
  let functionFile = Object.keys(require.cache).filter(
    (f) => f.includes("functions") && !f.includes("node_modules"),
  );

  for (key of functionFile) {
    try {
      delete require.cache[require.resolve(key)];
    } catch (e) {}
  }

  return `Re-Loaded Functions`;
};
