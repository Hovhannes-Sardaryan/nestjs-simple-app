import * as Joi from 'joi';

export default {
  NODE_ENV: Joi.string()
    .valid('dev', 'production', 'test', 'provision')
    .default('dev'),
  PORT: Joi.number().default(3000),
};
