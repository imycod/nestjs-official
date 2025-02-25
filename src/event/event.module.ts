import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventSchema } from './schemas/event.schema';
import {
  ClickedLinkEventSchema,
  ClickLinkEvent,
} from './schemas/click-link-event.schema';
import { SignUpEvent, SignUpEventSchema } from './schemas/sign-up-event.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
        discriminators: [
          {
            name: SignUpEvent.name,
            schema: SignUpEventSchema,
          },
          {
            name: ClickLinkEvent.name,
            schema: ClickedLinkEventSchema,
          },
        ],
      },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
