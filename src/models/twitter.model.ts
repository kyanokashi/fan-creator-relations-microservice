import {Entity, model, property} from '@loopback/repository';

@model()
export class Twitter extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  value?: number;

  @property({
    type: 'string',
    required: true,
    neptune: {
      columnName: 'from'
    },
  })
  fan: string;

  @property({
    type: 'string',
    required: true,
    neptune: {
      columnName: 'to'
    },
  })
  creator: string;

  constructor(data?: Partial<Twitter>) {
    super(data);
  }
}

export interface TwitterRelations {
  // describe navigational properties here
}

export type TwitterWithRelations = Twitter & TwitterRelations;
