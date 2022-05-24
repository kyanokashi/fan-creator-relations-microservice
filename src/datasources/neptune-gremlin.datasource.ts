import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'neptuneGremlin',
  connector: 'loopback-connector-neptune',
  url: 'wss://encore-oracle-dev.cluster-cubaxtzqr1qf.us-east-2.neptune.amazonaws.com:8182/gremlin',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class NeptuneGremlinDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'neptuneGremlin';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.neptuneGremlin', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
