import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import config from './env7.datasource.config'

/*const config = {
  name: 'esv7',
  connector: 'esv6',
  index: 'catalog',
  apiVersion: '7',
  defaultSize: ''
};*/

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class Esv7DataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'esv7';
  static readonly defaultConfig = config;

  constructor(
    // @inject('datasources.config.esv7', {optional: true})
    // dsConfig: object = config,
  ) {
    super(config);
  }
}
