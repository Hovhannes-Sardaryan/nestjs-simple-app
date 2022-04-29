import * as Joi from 'joi';
import app from './app';
import database from './database';

export default Joi.types().object.keys({
  ...app,
  ...database,
});
