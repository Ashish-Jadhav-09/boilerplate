import { config } from 'dotenv';

import Joi from 'joi';

config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  PORT: Joi.number().default(9001),
})
  .unknown()
  .required();

const { value: envVars } = envVarsSchema.validate(process.env);

const configurations = Object.freeze({
  env: envVars.NODE_ENV,
  port: process.env.PORT || envVars.PORT,
  serviceURl: process.env.SERVICE_URL,
  apolloKey: process.env.APOLLO_KEY,
  apolloGraphRef: process.env.APOLLO_GRAPH_REF,
});

export default configurations;
