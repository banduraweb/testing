import { ConnectionOptions } from 'typeorm';
require('dotenv').config();
const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: 'testing',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
