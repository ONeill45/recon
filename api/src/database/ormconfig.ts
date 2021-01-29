import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

/* istanbul ignore next */
const loadEnvironmentVariable = (key: string): string => {
  const envVariable = process.env[key]

  if (!envVariable)
    throw new Error(`Must configure ${key} environment variable.`)

  return envVariable
}

const host = loadEnvironmentVariable('POSTGRES_HOST')
const database = loadEnvironmentVariable('POSTGRES_DATABASE')
const username = loadEnvironmentVariable('POSTGRES_USERNAME')
const password = loadEnvironmentVariable('POSTGRES_PASSWORD')
const port = loadEnvironmentVariable('POSTGRES_PORT')
const sslCertPath = process.env.POSTGRES_SSL_CERT_PATH

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: `postgresql://${username}:${password}@${host}:${port}/${database}`,
  ssl: sslCertPath
    ? /* istanbul ignore next */ { ca: sslCertPath, rejectUnauthorized: false }
    : false,
  entities: [__dirname + '/../models/index{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: ['schema', 'error'],
  logger: 'advanced-console',
  schema: 'public',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
}

export = ormConfig
