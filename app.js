const { MessageBuilder } = require("discord-webhook-node");
const DataParse = require("./DataParse");
const hooks = require("./WebhookConnection");
const [aiWebhook, devWebhook, hireWebhook] = hooks;
const schedule = require("node-schedule");

const sendData = async () => {
  const data = await DataParse.getData();

  data.forEach((e) => {
    e.slice(0, 1).forEach((ee) => {
      let hook;

      switch (ee.code) {
        case "ai":
          hook = aiWebhook;
          break;
        case "developer":
          hook = devWebhook;
          break;
        case "hire":
          hook = hireWebhook;
          break;
        default:
          return;
      }

      const embed = new MessageBuilder()
        .setColor(`#${process.env.EMBED_COLOR}`)
        .setAuthor(ee.name)
        .setTitle(ee.title)
        .setURL(ee.link)
        .setDescription(ee.content)
        .setTimestamp(ee.createdAt);
      hook.send(embed);
    });
  });
};

const sendSchedule = schedule.scheduleJob("0 0 8 * * *", () => {
  sendData();
});
