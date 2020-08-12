import {EnvironmentEnum, IEnvironment} from './environment.interface';

export const environment: IEnvironment = {
  bearerToken: 'abf37e6d-328c-4973-84a3-a662db26c35f',
  environment: EnvironmentEnum.LOCAL,
  environmentName: 'LOCAL',
  aircraftServiceEndpoint: 'http://localhost:8100',
  operatorServiceEndpoint: 'http://operator-service-op.jetsm.com',
  sourcingServiceEndpoint: 'http://api.dev.jetsmarter.io/sourcing',
  graphqlServiceEndpoint: 'http://localhost:8115/graphql',
  version: 'LOCAL',
  testMode: null
};
