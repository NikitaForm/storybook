import {EnvironmentEnum, IEnvironment} from './environment.interface';

export const environment: IEnvironment = {
  bearerToken: null,
  environment: EnvironmentEnum.PRODUCTION,
  environmentName: 'PROD',
  aircraftServiceEndpoint: null,
  operatorServiceEndpoint: null,
  sourcingServiceEndpoint: null,
  graphqlServiceEndpoint: null,

  version: '2.1.0',
  testMode: null
};
