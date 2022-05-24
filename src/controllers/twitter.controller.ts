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
import {Twitter} from '../models';
import {TwitterRepository} from '../repositories';

export class TwitterController {
  constructor(
    @repository(TwitterRepository)
    public twitterRepository : TwitterRepository,
  ) {}

  @post('/twitters')
  @response(200, {
    description: 'Twitter model instance',
    content: {'application/json': {schema: getModelSchemaRef(Twitter)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Twitter, {
            title: 'NewTwitter',
            exclude: ['id'],
          }),
        },
      },
    })
    twitter: Omit<Twitter, 'id'>,
  ): Promise<Twitter> {
    return this.twitterRepository.create(twitter);
  }

  @get('/twitters/count')
  @response(200, {
    description: 'Twitter model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Twitter) where?: Where<Twitter>,
  ): Promise<Count> {
    return this.twitterRepository.count(where);
  }

  @get('/twitters')
  @response(200, {
    description: 'Array of Twitter model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Twitter, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Twitter) filter?: Filter<Twitter>,
  ): Promise<Twitter[]> {
    return this.twitterRepository.find(filter);
  }

  @patch('/twitters')
  @response(200, {
    description: 'Twitter PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Twitter, {partial: true}),
        },
      },
    })
    twitter: Twitter,
    @param.where(Twitter) where?: Where<Twitter>,
  ): Promise<Count> {
    return this.twitterRepository.updateAll(twitter, where);
  }

  @get('/twitters/{id}')
  @response(200, {
    description: 'Twitter model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Twitter, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Twitter, {exclude: 'where'}) filter?: FilterExcludingWhere<Twitter>
  ): Promise<Twitter> {
    return this.twitterRepository.findById(id, filter);
  }

  @patch('/twitters/{id}')
  @response(204, {
    description: 'Twitter PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Twitter, {partial: true}),
        },
      },
    })
    twitter: Twitter,
  ): Promise<void> {
    await this.twitterRepository.updateById(id, twitter);
  }

  @put('/twitters/{id}')
  @response(204, {
    description: 'Twitter PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() twitter: Twitter,
  ): Promise<void> {
    await this.twitterRepository.replaceById(id, twitter);
  }

  @del('/twitters/{id}')
  @response(204, {
    description: 'Twitter DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.twitterRepository.deleteById(id);
  }
}
