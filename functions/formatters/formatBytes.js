/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = (bytes, unit = true, places = 2) => {
  if (!+bytes) return "0 Bytes";
  const decimals = 0 > places ? 0 : places;
  const power = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, power)).toFixed(decimals))}${
    unit
      ? ` ${
          ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][
            power
          ]
        }`
      : ``
  }`;
};
