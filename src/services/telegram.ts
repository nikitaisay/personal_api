import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import input from 'input';

type TelegramServiceConfig = {
  apiId: number;
  apiHash: string;
  phoneNumber: string;
};

class TelegramService {
  readonly client: TelegramClient;
  private session: StringSession;
  private phoneNumber: string;

  constructor(config: TelegramServiceConfig) {
    this.phoneNumber = config.phoneNumber;
    this.session = new StringSession('');
    this.client = new TelegramClient(
      this.session,
      config.apiId,
      config.apiHash,
      {
        connectionRetries: 5,
      },
    );
    (async () => await this.checkAuthSession(config.phoneNumber))();
  }

  async checkAuthSession(phoneNumber: string): Promise<void> {
    if (!this.client.session) {
      await this.client.start({
        phoneNumber,
        phoneCode: async () => await input.text('phoneCode ?'),
        onError: (err) => console.log(err),
      });
      this.client.session.save();
    }
  }

  async getChannelByUsername(username: string): Promise<Api.messages.ChatFull> {
    await this.checkAuthSession(this.phoneNumber);
    return await this.client.invoke(
      new Api.channels.GetFullChannel({
        channel: username,
      }),
    );
  }
}

export default TelegramService;
