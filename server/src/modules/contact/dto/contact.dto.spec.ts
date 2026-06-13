import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ContactDto } from './contact.dto';

const validPayload = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello there',
};

const validatePayload = (payload: Record<string, unknown>) =>
  validate(plainToInstance(ContactDto, payload));

describe('ContactDto', () => {
  it('accepts a valid payload', async () => {
    await expect(validatePayload(validPayload)).resolves.toHaveLength(0);
  });

  it('rejects an invalid email', async () => {
    const errors = await validatePayload({ ...validPayload, email: 'invalid' });

    expect(errors.some((error) => error.property === 'email')).toBe(true);
  });

  it.each([
    ['name shorter than 2 characters', { name: 'J' }, 'name'],
    ['name longer than 50 characters', { name: 'J'.repeat(51) }, 'name'],
    ['message shorter than 2 characters', { message: 'H' }, 'message'],
    ['message longer than 2000 characters', { message: 'H'.repeat(2001) }, 'message'],
    ['hidden longer than 100 characters', { hidden: 'H'.repeat(101) }, 'hidden'],
  ])('rejects %s', async (_description, override, property) => {
    const errors = await validatePayload({ ...validPayload, ...override });

    expect(errors.some((error) => error.property === property)).toBe(true);
  });

  it('accepts an omitted hidden field', async () => {
    await expect(validatePayload(validPayload)).resolves.toHaveLength(0);
  });

  it('trims string fields', () => {
    const dto = plainToInstance(ContactDto, {
      name: '  John Doe  ',
      email: '  john@example.com  ',
      message: '  Hello there  ',
      hidden: '  bot field  ',
    });

    expect(dto).toMatchObject({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello there',
      hidden: 'bot field',
    });
  });
});
