import { createConnection, getConnection } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import ormConfig from './ormconfig'

export const disconnect = async (): Promise<void> => {
  await getConnection().close()
}

export const connect = async () => {
  const connectionOptions: PostgresConnectionOptions = {
    ...ormConfig,
    logging: false,
    subscribers: [],
  }

  return {
    connection: await createConnection(connectionOptions),
  }
}
