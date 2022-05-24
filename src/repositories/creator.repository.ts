import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeptuneGremlinDataSource} from '../datasources';
import {Creator, CreatorRelations} from '../models';

export class CreatorRepository extends DefaultCrudRepository<
  Creator,
  typeof Creator.prototype.id,
  CreatorRelations
> {
  constructor(
    @inject('datasources.neptuneGremlin') dataSource: NeptuneGremlinDataSource,
  ) {
    super(Creator, dataSource);
  }
}
