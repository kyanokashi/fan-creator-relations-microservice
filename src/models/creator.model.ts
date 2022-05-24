import {Entity, model, property} from '@loopback/repository';

@model()
export class Creator extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  twitterId?: string;

  @property({
    type: 'string',
    required: true,
  })
  publicKey: string;


  constructor(data?: Partial<Creator>) {
    super(data);
  }
}

export interface CreatorRelations {
  // describe navigational properties here
}

export type CreatorWithRelations = Creator & CreatorRelations;
