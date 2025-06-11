const path = require('path');

module.exports = ({ env }) => {
  // Check if we're in production (Heroku)
  if (env('NODE_ENV') === 'production') {
    // Parse the DATABASE_URL from Heroku
    const { parse } = require('pg-connection-string');
    const config = parse(env('DATABASE_URL'));
    
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: {
            rejectUnauthorized: false
          },
        },
        debug: false,
      },
    };
  }
  
  // Local development (SQLite)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};