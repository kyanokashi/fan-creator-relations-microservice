import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    type: 'vertex'
  }
})
export class Fan extends Entity {
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


  constructor(data?: Partial<Fan>) {
    super(data);
  }
}

export interface FanRelations {
  // describe navigational properties here
}

export type FanWithRelations = Fan & FanRelations;
