"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const contact_controller_1 = require("../src/modules/contact/contact.controller");
const contact_service_1 = require("../src/modules/contact/contact.service");
describe('Contact API (e2e)', () => {
    let app;
    let sendContactMessage;
    const validPayload = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello there',
    };
    beforeAll(async () => {
        sendContactMessage = jest
            .fn()
            .mockResolvedValue({ success: true, message: 'Message sent' });
        const moduleFixture = await testing_1.Test.createTestingModule({
            controllers: [contact_controller_1.ContactController],
            providers: [
                { provide: contact_service_1.ContactService, useValue: { sendContactMessage } },
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api');
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    beforeEach(() => {
        sendContactMessage.mockClear();
    });
    it('accepts a valid payload', async () => {
        await (0, supertest_1.default)(app.getHttpServer())
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
        await (0, supertest_1.default)(app.getHttpServer())
            .post('/api/contact')
            .send(payload)
            .expect(400);
        expect(sendContactMessage).not.toHaveBeenCalled();
    });
    it('accepts the declared hidden field', async () => {
        const payload = { ...validPayload, hidden: 'bot value' };
        await (0, supertest_1.default)(app.getHttpServer())
            .post('/api/contact')
            .send(payload)
            .expect(201);
        expect(sendContactMessage).toHaveBeenCalledWith(payload);
    });
});
//# sourceMappingURL=contact.e2e-spec.js.map