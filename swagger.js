const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'WatchRadar Api',
    description: 'WatchRadar Api',
  },
  host: 'localhost:3005',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);