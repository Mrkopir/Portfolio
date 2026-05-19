import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post()
  sendContactMessage(@Body() contactDto: ContactDto) {
    return this.contactService.sendContactMessage(contactDto);
  }
}
