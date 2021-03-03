
const firebaseJS = require('../../config/firebase.js');
const SlackBot = require('slackbots');

async function sendBotMessage(channelName, message) {
  try {
    const settings = await firebaseJS.getDocument("Settings", "Backend");
    const thisToken = await settings.data().slackbot;
    const thisName = await settings.data().botName;
    const bot = new SlackBot({
      token: `${thisToken}`,
      name: thisName
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
  catch(error) {
    console.log(error)
  }
}

module.exports = {sendBotMessage}