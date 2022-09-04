const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const fs = require('fs');

generateApi({
  name: 'api.ts',
  output: path.resolve(process.cwd(), './src/api'),
  input: path.resolve(process.cwd(), './bin/api-docs.json'),
  axios: true,
  moduleNameIndex: 1,
  prettier: {
    printWidth: 120,
    tabWidth: 2,
    trailingComma: 'all',
    parser: 'typescript',
  },
}).catch((e) => console.error(e));
