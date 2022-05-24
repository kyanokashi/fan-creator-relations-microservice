import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where,} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response,} from '@loopback/rest';
import {Fan} from '../models';
import {FanRepository, TwitterRepository} from '../repositories';

export class FanController {
  constructor(
    @repository(FanRepository)
    public fanRepository : FanRepository,
    public twitterRepository: TwitterRepository
  ) {}

  @post('/fans')
  @response(200, {
    description: 'Fan model instance',
    content: {'application/json': {schema: getModelSchemaRef(Fan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fan, {
            title: 'NewFan',
            exclude: ['id'],
          }),
        },
      },
    })
    fan: Omit<Fan, 'id'>,
  ): Promise<Fan> {
    return this.fanRepository.create(fan);
  }

  @get('/fans/count')
  @response(200, {
    description: 'Fan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Fan) where?: Where<Fan>,
  ): Promise<Count> {
    return this.fanRepository.count(where);
  }

  @get('/fans/relation-exists-with-creator/{fanId}/{creatorId}/{relationName}')
  @response(200, {
    description: 'Array of Fan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fan, {includeRelations: true}),
        },
      },
    },
  })
  async relationExistsWithCreator(
      @param.path.string('fanId') fanId: string,
      @param.path.string('creatorId') creatorId: string,
      @param.path.string('relationName') relationName: string,
      @param.filter(Fan) filter?: Filter<Fan>,
  ): Promise<boolean> {
    return this.fanRepository.findRelation(fanId, creatorId, relationName);
  }

  @get('/fans')
  @response(200, {
    description: 'Array of Fan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Fan) filter?: Filter<Fan>,
  ): Promise<Fan[]> {
    return this.fanRepository.find(filter);
  }

  @patch('/fans')
  @response(200, {
    description: 'Fan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fan, {partial: true}),
        },
      },
    })
    fan: Fan,
    @param.where(Fan) where?: Where<Fan>,
  ): Promise<Count> {
    return this.fanRepository.updateAll(fan, where);
  }

  @get('/fans/{id}')
  @response(200, {
    description: 'Fan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Fan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Fan, {exclude: 'where'}) filter?: FilterExcludingWhere<Fan>
  ): Promise<Fan> {
    return this.fanRepository.findById(id, filter);
  }

  @patch('/fans/{id}')
  @response(204, {
    description: 'Fan PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fan, {partial: true}),
        },
      },
    })
    fan: Fan,
  ): Promise<void> {
    await this.fanRepository.updateById(id, fan);
  }

  @put('/fans/{id}')
  @response(204, {
    description: 'Fan PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() fan: Fan,
  ): Promise<void> {
    await this.fanRepository.replaceById(id, fan);
  }

  @del('/fans/{id}')
  @response(204, {
    description: 'Fan DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.fanRepository.deleteById(id);
  }
}
