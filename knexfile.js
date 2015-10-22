module.exports = {

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
      min: 2,
      max: 10
    },
    debug: true,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
