import { Request, Response } from 'express';

import TelegramService from '../services/telegram';

const telegram = new TelegramService({
  apiId: parseFloat(process.env.TELEGRAM_API_ID),
  apiHash: process.env.TELEGRAM_API_HASH,
  phoneNumber: process.env.TELEGRAM_PHONE_NUMBER,
});

class ContentfulController {
  async sendArticlePreviewToTelegram(req: Request, res: Response) {
    const fields = req.body.fields;

    const message = 
      `${fields.title['en-US']}
      \n${fields.description['en-US']}
      \nRead on ${process.env.WEBSITE_URL}/articles/${fields.articleId['en-US']}`;

    const response = await telegram.sendMessage({
      message,
      username: process.env.TELEGRAM_CHANNEL_ID,
      noWebpage: false,
    });

    res.status(200).send(response);
  }
}

export default ContentfulController;
