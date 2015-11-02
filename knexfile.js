require('dotenv').load();

module.exports = {
  production: {
    client: 'pg',
    connection: process.env.PG_PROD,
    ssl: true,
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
