export enum DatabaseLocation {
  AWS,
  SelfHosted,
}

export enum DatabaseEngine {
  PostgreSQL,
  MySQL,
  SQLServer,
  RedShift,
  Mongo,
  Redis,
}

export interface Database {
  location: DatabaseLocation;
  engine: DatabaseEngine;
  name: string;
  popular?: boolean;
}

export const DATABASES: Database[] = [
  {
    location: DatabaseLocation.AWS,
    engine: DatabaseEngine.MySQL,
    name: 'AWS RDS MySQL',
    popular: true,
  },
  {
    location: DatabaseLocation.AWS,
    engine: DatabaseEngine.PostgreSQL,
    name: 'AWS RDS PostgreSQL',
    popular: true,
  },
  {
    location: DatabaseLocation.AWS,
    engine: DatabaseEngine.SQLServer,
    name: 'AWS RDS SQL Server',
    popular: true,
  },
  {
    location: DatabaseLocation.AWS,
    engine: DatabaseEngine.Redis,
    name: 'AWS ElastiCache',
  },
  {
    location: DatabaseLocation.AWS,
    engine: DatabaseEngine.Redis,
    name: 'AWS MemoryDB for Redis',
  },

  {
    location: DatabaseLocation.SelfHosted,
    engine: DatabaseEngine.Redis,
    name: 'Self Hosted Redis',
    popular: true,
  },
];
