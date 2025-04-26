import  'dotenv/config';
import * as joi from 'joi';

interface EnvVars  {
    PORT: number;

    // Other environment variables can be added here as needed
};

const envVarSchema = joi.object<EnvVars>({
    PORT: joi.number().default(8000), // Default port for the API Gateway

    // Other environment variables can be added here as needed
})
.unknown(true); // Allow unknown variables to be present in the environment

const { error, value } = envVarSchema.validate(process.env); // Validate the environment variables against the schema

if (error) {
    throw new Error(`Config validation error: ${error.message}`); // Throw an error if validation fails
}

const envVars = value as EnvVars; // Cast the validated value to the EnvVars type

export const envs = {
    port: envVars.PORT,

    // Other environment variables can be added here as needed
}


