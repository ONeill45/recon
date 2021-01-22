import { createConnection } from 'typeorm';
import ormConfig from '../src/database/ormconfig';

export const testConn = (drop: boolean = false) => {
  return createConnection({
    ...ormConfig,
    logging: false,
    synchronize: drop,
    dropSchema: drop,
  });
};
