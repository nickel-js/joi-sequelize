# joi-sequelize

A lib to automaticaly create joi validation schemas from sequelize models.

[![Build Status](https://travis-ci.org/mibrito/joi-sequelize.svg?branch=master)](https://travis-ci.org/mibrito/joi-sequelize)

A lots of Hapi projects uses Sequelize to handle database conection, data modeling and manipulation, and Joi to validate its requests and responses. In this case is common to use quite the same schema for both libraries. Hence that it is a fertile scenario to create inconsistency between both schemas, that will be likely rearranged every time the database models change. So why not use the database to auto generate joi schemas, and remove the unnecessary validation in especifica routes. This is the main idea behind joi-sequelize.

# Usage

```javascript
'use strict';

const Hapi = require('hapi');
const JoiSequelize = require('joi-sequelize');
const model = require('./model');

const server = new Hapi.Server();
server.connection({ port: 3000 });

const JS = new JoiSequelize(model);
server.route({
  method:  'POST',
  path:    '/hello',
  handler: (request, reply) => reply(request.payload),
  config:  {
    validate: {
      payload: JS.joi()
    }
  }
});

server.start((err) => {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});
```

# Other functions

## Omit

Return a joi object with all items except the ones passed as arguments
```javascript
JS.omit('field1', 'field2', ...);
```

## Pick

Return a joi object with all fields passed as arguments
```javascript
JS.pick('field1', 'field2', ...);
```
