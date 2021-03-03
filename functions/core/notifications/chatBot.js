

const SlackBot = require('slackbots');

function sendBotMessage(channelName, message) {
  const bot = new SlackBot({
      token: `xoxb-13549599124-1709663809237-tdLLwfcIdU48xlXiurbs7HG5`,
      name: 'jobox_app'
  })
  bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }
    bot.postMessageToChannel(
        channelName,
        message,
        params
    );
  })
}

module.exports = {sendBotMessage}