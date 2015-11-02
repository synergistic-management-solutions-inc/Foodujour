require('dotenv').load();

module.exports = {
  production: {
    client: 'pg',
    connection: {
      host: process.env.PG_PROD_HOST,
      port: process.env.PG_PROD_PORT,
      user: process.env.PG_PROD_USER,
      password: process.env.PG_PROD_PASS,
      database: process.env.PG_PROD_DB,
      ssl: process.env.PG_PROD_SSL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  development: {
    client: 'pg',
    connection: process.env.PG_DEV,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'pg',
    connection: process.env.PG_TEST,
    pool: {
      min: 1,
      max: 1
    },
    /*debug: true,*/
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
