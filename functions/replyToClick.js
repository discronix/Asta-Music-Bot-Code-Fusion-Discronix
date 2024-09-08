/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = replyToClick = async (int, args, ephemeral = true) => {
  args
    ? await int
        .reply({
          embeds: [new int.client.embed().desc(`${args}`)],
          ephemeral: ephemeral,
        })
        .catch((err) => {
          int.deferUpdate();
        })
    : await int.deferUpdate();
};
