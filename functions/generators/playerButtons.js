const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = (client, player, number = 5) => {
  const isPaused = player.shoukaku.paused;
  const playPauseEmoji = isPaused ? '▶️' : '⏸️';
  const autoplayStyle = player.data.get("autoplay") ? ButtonStyle.Success : ButtonStyle.Secondary;

  const row = new ActionRowBuilder();

  const previousButton = new ButtonBuilder()
    .setCustomId(`${player.guildId}previous`)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji('◀️');

  const playPauseButton = new ButtonBuilder()
    .setCustomId(`${player.guildId}play_pause`)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji(playPauseEmoji);

  const skipButton = new ButtonBuilder()
    .setCustomId(`${player.guildId}skip`)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji('▶️');

  const autoplayButton = new ButtonBuilder()
    .setCustomId(`${player.guildId}autoplay`)
    .setStyle(autoplayStyle)
    .setLabel('Auto');

  const stopButton = new ButtonBuilder()
    .setCustomId(`${player.guildId}stop`)
    .setStyle(ButtonStyle.Danger)
    .setEmoji('✖');

  switch (number) {
    case 5:
      row.addComponents(previousButton, playPauseButton, skipButton, autoplayButton, stopButton);
      break;
    case 4:
      row.addComponents(previousButton, playPauseButton, skipButton, stopButton);
      break;
    case 3:
      row.addComponents(playPauseButton, skipButton, stopButton);
      break;
  }

  return [row];
};
