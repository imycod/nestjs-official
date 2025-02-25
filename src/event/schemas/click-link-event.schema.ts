import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ClickLinkEvent {
  kind: string;
  time: Date;

  @Prop({ type: String, required: true })
  url: string;
}

export const ClickedLinkEventSchema =
  SchemaFactory.createForClass(ClickLinkEvent);
