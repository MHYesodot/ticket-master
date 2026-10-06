import * as env from 'env-var';
import './dotenv';

export const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    postgres: {
        uri: env.get('DATABASE_URL').required().asString(),
        usersTable: env.get('POSTGRES_USERS_TABLE').required().asString(),
    }
}
