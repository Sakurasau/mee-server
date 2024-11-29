const Joi = require('joi')

export const envSchema = Joi.object({
  PORT_BACKEND: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE_IN: Joi.string().optional(),
  CORS_ORIGIN: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_REDIRECT_URL: Joi.string().required(),
  GOOGLE_REDIRECT_URL_CLIENT: Joi.string().required(),
})
