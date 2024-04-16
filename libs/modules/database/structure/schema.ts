import { Prop } from '@nestjs/mongoose';
import { DateTime } from 'luxon';

export class BaseEntity {
    @Prop({ default: DateTime.now().toMillis() })
    createdAt: number;
    @Prop({ default: null })
    deletedAt: number;
    @Prop({ default: null })
    updatedAt: number;
}
