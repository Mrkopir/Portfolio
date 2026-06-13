import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from '../contact.controller';
import { ContactService } from '../contact.service';
import { ContactDto } from '../dto/contact.dto';

describe('ContactController', () => {
  let controller: ContactController;
  let sendContactMessage: jest.Mock;

  beforeEach(async () => {
    sendContactMessage = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        { provide: ContactService, useValue: { sendContactMessage } },
      ],
    }).compile();

    controller = module.get(ContactController);
  });

  it('is defined', () => {
    expect(controller).toBeDefined();
  });

  it('calls ContactService with the DTO and returns its response', async () => {
    const dto: ContactDto = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello there',
    };
    const response = { success: true, message: 'Message sent' };
    sendContactMessage.mockResolvedValue(response);

    await expect(controller.sendContactMessage(dto)).resolves.toEqual(response);
    expect(sendContactMessage).toHaveBeenCalledWith(dto);
  });
});
