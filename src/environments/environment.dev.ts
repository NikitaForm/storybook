import {EnvironmentEnum, IEnvironment} from './environment.interface';

export const environment: IEnvironment = {
  bearerToken: '8e183ba2-c8eb-45c5-ae48-e6e0c9ef0a07',
  environment: EnvironmentEnum.DEVELOPMENT,
  environmentName: 'DEV',
  aircraftServiceEndpoint: 'http://api.dev.jetsmarter.io/aircraft',
  operatorServiceEndpoint: 'http://operator-service-op.jetsm.com',
  sourcingServiceEndpoint: 'http://api.dev.jetsmarter.io/sourcing',
 // sourcingServiceEndpoint: 'http://localhost:8115',
  // operatorServiceEndpoint: 'http://localhost:5000',
  // graphqlServiceEndpoint: 'https://operator.dev.jetsmarter.io/graphql',
  graphqlServiceEndpoint: 'http://localhost:8080/graphql',
  version: 'DEV',
  testMode: null
};
