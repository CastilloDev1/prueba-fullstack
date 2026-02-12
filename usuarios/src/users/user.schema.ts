import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'users' })
export class User extends Document<string> {
  @Prop({ required: true })
  declare _id: string;

  @Prop() name: string;
  @Prop() email: string;
  @Prop() role: string;
}

export const UserSchema: MongooseSchema<User> = SchemaFactory.createForClass(User);
