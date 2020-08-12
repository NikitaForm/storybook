export enum EnvironmentEnum {
  DEVELOPMENT = 0,
  LOCAL,
  PRODUCTION,
  TEST
}

export interface IEnvironment {
  environment: EnvironmentEnum;
  environmentName: string;
  bearerToken: string;
  version: string;

  aircraftServiceEndpoint: string;
  operatorServiceEndpoint: string;
  sourcingServiceEndpoint: string;
  graphqlServiceEndpoint: string;
  testMode: string;
}
