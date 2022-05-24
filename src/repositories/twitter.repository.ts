import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeptuneGremlinDataSource} from '../datasources';
import {Twitter, TwitterRelations} from '../models';

export class TwitterRepository extends DefaultCrudRepository<
  Twitter,
  typeof Twitter.prototype.id,
  TwitterRelations
> {
  constructor(
    @inject('datasources.neptuneGremlin') dataSource: NeptuneGremlinDataSource,
  ) {
    super(Twitter, dataSource);
  }
}
