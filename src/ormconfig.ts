import { ConnectionOptions } from 'typeorm';
require('dotenv').config();
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DBHOST,
  port: 32372,
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;

// import { ConnectionOptions } from 'typeorm';
// require('dotenv').config();
// const config: ConnectionOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: '123456',
//   database: 'support',
//   // schema: process.env.SCHEMA,
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: false,
//   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
//   cli: {
//     migrationsDir: 'src/migrations',
//   },
// };

// export default config;
