import * as dotenv from 'dotenv';
export async function setEnvironment () {
  if ( process.env.NODE_ENV != 'production' ) {
    dotenv.config();
  }
}
