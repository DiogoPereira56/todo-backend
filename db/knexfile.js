// Update with your config settings.
const { knexSnakeCaseMappers } = require('objection');

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'user',
            password: null,
            database: 'todo.sql',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
        ...knexSnakeCaseMappers,
    },
};
