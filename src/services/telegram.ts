import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import input from 'input';

type TelegramServiceConfig = {
  apiId: number;
  apiHash: string;
  phoneNumber: string;
};

type SendMessageOptions = {
  username: string; 
  noWebpage: boolean; 
  message: string;
}

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
    (async () => await this.init(this.phoneNumber))();
  }

  async init(phoneNumber: string): Promise<void> {
    await this.client.start({
      phoneNumber,
      phoneCode: async () => await input.text('phoneCode?: '),
      onError: (err) => console.log(err),
    });
    this.client.session.save();
  }

  async getChannelByUsername(username: string): Promise<Api.messages.ChatFull> {
    return await this.client.invoke(
      new Api.channels.GetFullChannel({
        channel: username,
      }),
    );
  }

  async sendMessage(options: SendMessageOptions): Promise<Api.TypeUpdates> {
    return await this.client.invoke(
      new Api.messages.SendMessage({
        peer: options.username,
        message: options.message,
        noWebpage: options.noWebpage,
      }),
    );
  }
}

export default TelegramService;
