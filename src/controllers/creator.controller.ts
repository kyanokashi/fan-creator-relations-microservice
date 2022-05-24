import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Creator} from '../models';
import {CreatorRepository} from '../repositories';

export class CreatorController {
  constructor(
    @repository(CreatorRepository)
    public creatorRepository : CreatorRepository,
  ) {}

  @post('/creators')
  @response(200, {
    description: 'Creator model instance',
    content: {'application/json': {schema: getModelSchemaRef(Creator)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Creator, {
            title: 'NewCreator',
            exclude: ['id'],
          }),
        },
      },
    })
    creator: Omit<Creator, 'id'>,
  ): Promise<Creator> {
    return this.creatorRepository.create(creator);
  }

  @get('/creators/count')
  @response(200, {
    description: 'Creator model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Creator) where?: Where<Creator>,
  ): Promise<Count> {
    return this.creatorRepository.count(where);
  }

  @get('/creators')
  @response(200, {
    description: 'Array of Creator model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Creator, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Creator) filter?: Filter<Creator>,
  ): Promise<Creator[]> {
    return this.creatorRepository.find(filter);
  }

  @patch('/creators')
  @response(200, {
    description: 'Creator PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Creator, {partial: true}),
        },
      },
    })
    creator: Creator,
    @param.where(Creator) where?: Where<Creator>,
  ): Promise<Count> {
    return this.creatorRepository.updateAll(creator, where);
  }

  @get('/creators/{id}')
  @response(200, {
    description: 'Creator model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Creator, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Creator, {exclude: 'where'}) filter?: FilterExcludingWhere<Creator>
  ): Promise<Creator> {
    return this.creatorRepository.findById(id, filter);
  }

  @patch('/creators/{id}')
  @response(204, {
    description: 'Creator PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Creator, {partial: true}),
        },
      },
    })
    creator: Creator,
  ): Promise<void> {
    await this.creatorRepository.updateById(id, creator);
  }

  @put('/creators/{id}')
  @response(204, {
    description: 'Creator PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() creator: Creator,
  ): Promise<void> {
    await this.creatorRepository.replaceById(id, creator);
  }

  @del('/creators/{id}')
  @response(204, {
    description: 'Creator DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.creatorRepository.deleteById(id);
  }
}
