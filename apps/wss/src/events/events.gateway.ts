import {
  MessageBody,
  OnGatewayInit,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  // namespace: "events",
})
export class EventsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit() {
    this.logger.log(`Socket server init`);
  }

  @SubscribeMessage('saveQuestionsProgress')
  saveQuestionsProgress(@MessageBody() progress: number): void {
    this.server.emit('saveQuestionsProgress', progress);
  }
}
