import { Controller, ForbiddenException, Get, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern({ cmd: "get-user" })
  async getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const message = context.getMessage()
    const jsonData = JSON.parse(message.content.toString());
    

    channel.ack(message)
 
    return {
      user: "USER"
    }
  }
}
