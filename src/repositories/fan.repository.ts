import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeptuneGremlinDataSource} from '../datasources';
import {Fan, FanRelations} from '../models';

export class FanRepository extends DefaultCrudRepository<
  Fan,
  typeof Fan.prototype.id,
  FanRelations
> {
  g;

  constructor(
    @inject('datasources.neptuneGremlin') dataSource: NeptuneGremlinDataSource,
  ) {
    super(Fan, dataSource);

    this.g = this.dataSource.connector?.g;

  }

  async findRelation(
      fanId: string,
      creatorId: string,
      relationName: string
  ) : Promise<boolean>{
    const query = this.g.V().hasLabel('Fan').has('id', fanId).out(relationName).has('creator', 'id', creatorId);

    const result = await this.execute(query);

    return !!result;
  }
}
