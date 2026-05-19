import {
  BadGatewayException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendContactMessage(contactDto: ContactDto) {
    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    const chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');

    if (!botToken || !chatId) {
      throw new ServiceUnavailableException('Telegram delivery is not configured');
    }

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: this.formatTelegramMessage(contactDto),
          disable_web_page_preview: true,
        }),
      },
    );

    if (!response.ok) {
      const body = await response.text();
      this.logger.warn(`Telegram API failed with status ${response.status}`);
      if (this.configService.get<string>('NODE_ENV') !== 'production') {
        this.logger.debug(body);
      }
      throw new BadGatewayException('Failed to send contact message');
    }

    return {
      success: true,
      message: 'Message sent',
    };
  }

  private formatTelegramMessage({ name, email, message }: ContactDto): string {
    return [
      'New portfolio contact message',
      '',
      `Name: ${this.escapeTelegramText(name)}`,
      `Email: ${this.escapeTelegramText(email)}`,
      'Message:',
      this.escapeTelegramText(message),
    ].join('\n');
  }

  private escapeTelegramText(value: string): string {
    return value.replace(/[<>]/g, '');
  }
}
