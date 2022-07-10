import express from 'express';
import dotenv from 'dotenv';

import TelegramService from './services/telegram';

dotenv.config();

const app = express();

app.listen(8000, async () => {
  const telegram = new TelegramService({
    apiId: parseFloat(process.env.TELEGRAM_API_ID),
    apiHash: process.env.TELEGRAM_API_HASH,
    phoneNumber: process.env.TELEGRAM_PHONE_NUMBER,
  });

  // const channel = await telegram.getChannelByUsername('nkt_isay');
  // console.log(channel);
});
