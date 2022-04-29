import * as Joi from 'joi';

export default {
  COGNITO_USER_POOL_ID: Joi.string(),
  COGNITO_CLIENT_ID: Joi.string(),
  COGNITO_REGION: Joi.string(),
};
