var path = require("path");

var env = process.env.NODE_ENV || 'development';

var base = {
  root: path.join(__dirname),
  env: env,
  jwt: {
    secret: "1ts4s3cr37!"
  },
};

var specific = {
  development: {
    app: {
      apiPort: 8180,
      port: 8080,
      name: "TempusFugit - Dev",
      keys: [ "super-secret-hurr-durr" ],
      host: "http://localhost:8080",
      cookies: {
        opts: {
          secure: false,
          maxAge: 3600000,
          signed: true,
          overwrite: true
        }
      },
    },
    mongo: {
      url: "mongodb://localhost/tempus_dev",
    },
  },
  test: {
    app: {
      port: 3001,
      name: "TempusFugit - Test",
      keys: [ "super-secret-hurr-durr" ],
      host: "http://localhost",
      cookies: {
        opts: {
          secure: false,
          maxAge: 3600000,
          signed: true,
          overwrite: true
        }
      },
    },
    mongo: {
      url: "mongodb://localhost/tempus_test",
    },
  },
  production: {
    app: {
      port: process.env.PORT,
      apiPort: process.env.APIPORT,
      name: "TempusFugit",
      host: 'https://peaceful-reef-80351.herokuapp.com',
      cookies: {
        opts: {
          secure: true,
          maxAge: 3600000,
          signed: true,
          overwrite: true
        }
      }
    },
    mongo: {
      url: process.env.PROD_MONGODB,
    },
  }
};

module.exports = Object.assign({},base, specific[env]);
