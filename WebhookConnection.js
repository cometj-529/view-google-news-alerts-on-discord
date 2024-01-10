require("dotenv").config();
const { Webhook } = require("discord-webhook-node");

const aiWebhook = new Webhook(`${process.env.AI_WEBHOOK_URL}`);

const devWebhook = new Webhook(`${process.env.DEV_WEBHOOK_URL}`);

const hireWebhook = new Webhook(`${process.env.HIRE_WEBHOOK_URL}`);

module.exports = [aiWebhook, devWebhook, hireWebhook];
