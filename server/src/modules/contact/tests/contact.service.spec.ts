import {
  BadGatewayException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from '../contact.service';
import { ContactDto } from '../dto/contact.dto';

describe('ContactService', () => {
  let service: ContactService;
  let configGet: jest.Mock;
  let fetchMock: jest.MockedFunction<typeof fetch>;
  const originalFetch = global.fetch;

  const contactDto: ContactDto = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello there',
  };

  beforeEach(async () => {
    configGet = jest.fn((key: string) => {
      const config: Record<string, string> = {
        TELEGRAM_BOT_TOKEN: 'test-token',
        TELEGRAM_CHAT_ID: 'test-chat-id',
        NODE_ENV: 'test',
      };
      return config[key];
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        { provide: ConfigService, useValue: { get: configGet } },
      ],
    }).compile();

    service = module.get(ContactService);
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('is defined', () => {
    expect(service).toBeDefined();
  });

  it('calls the Telegram API with the correct URL and body', async () => {
    fetchMock.mockResolvedValue({ ok: true } as Response);

    await service.sendContactMessage(contactDto);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.telegram.org/bottest-token/sendMessage',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: 'test-chat-id',
          text: [
            'New portfolio contact message',
            '',
            'Name: John Doe',
            'Email: john@example.com',
            'Message:',
            'Hello there',
          ].join('\n'),
          disable_web_page_preview: true,
        }),
      }),
    );
  });

  it('returns success after Telegram accepts the message', async () => {
    fetchMock.mockResolvedValue({ ok: true } as Response);

    await expect(service.sendContactMessage(contactDto)).resolves.toEqual({
      success: true,
      message: 'Message sent',
    });
  });

  it.each(['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'])(
    'throws when %s is missing',
    async (missingKey) => {
      configGet.mockImplementation((key: string) =>
        key === missingKey ? undefined : 'configured',
      );

      await expect(service.sendContactMessage(contactDto)).rejects.toBeInstanceOf(
        ServiceUnavailableException,
      );
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it('accepts a filled hidden field without calling Telegram', async () => {
    await expect(
      service.sendContactMessage({ ...contactDto, hidden: 'bot value' }),
    ).resolves.toEqual({ success: true, message: 'Message sent' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('throws when Telegram rejects the message', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      text: jest.fn().mockResolvedValue('telegram failure'),
    } as unknown as Response);

    await expect(service.sendContactMessage(contactDto)).rejects.toBeInstanceOf(
      BadGatewayException,
    );
  });

  it('removes angle brackets from user input in the Telegram text', async () => {
    fetchMock.mockResolvedValue({ ok: true } as Response);

    await service.sendContactMessage({
      name: '<John>',
      email: '<john@example.com>',
      message: '<script>alert(1)</script>',
    });

    const [, options] = fetchMock.mock.calls[0];
    const body = JSON.parse(options?.body as string) as { text: string };

    expect(body.text).not.toContain('<');
    expect(body.text).not.toContain('>');
    expect(body.text).toContain('scriptalert(1)/script');
  });
});
