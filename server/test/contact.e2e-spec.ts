import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ContactController } from '../src/modules/contact/contact.controller';
import { ContactService } from '../src/modules/contact/contact.service';

describe('Contact API (e2e)', () => {
  let app: INestApplication;
  let sendContactMessage: jest.Mock;

  const validPayload = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello there',
  };

  beforeAll(async () => {
    sendContactMessage = jest
      .fn()
      .mockResolvedValue({ success: true, message: 'Message sent' });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        { provide: ContactService, useValue: { sendContactMessage } },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    sendContactMessage.mockClear();
  });

  it('accepts a valid payload', async () => {
    await request(app.getHttpServer())
      .post('/api/contact')
      .send(validPayload)
      .expect(201)
      .expect({ success: true, message: 'Message sent' });

    expect(sendContactMessage).toHaveBeenCalledWith(validPayload);
  });

  it.each([
    ['an invalid email', { ...validPayload, email: 'invalid' }],
    ['a missing name', { email: validPayload.email, message: validPayload.message }],
    ['a missing message', { name: validPayload.name, email: validPayload.email }],
    ['an extra field', { ...validPayload, role: 'admin' }],
  ])('rejects %s', async (_description, payload) => {
    await request(app.getHttpServer())
      .post('/api/contact')
      .send(payload)
      .expect(400);

    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it('accepts the declared hidden field', async () => {
    const payload = { ...validPayload, hidden: 'bot value' };

    await request(app.getHttpServer())
      .post('/api/contact')
      .send(payload)
      .expect(201);

    expect(sendContactMessage).toHaveBeenCalledWith(payload);
  });
});
