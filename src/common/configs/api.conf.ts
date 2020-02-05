export const port: number = +process.env.PORT;
export const apiJWTKey = process.env.JWT_SECRET_KEY;
export const jwtExpirationTime = `${process.env.JWT_EXPIRATION_TIME}m`;
export const nodeEnvironment = process.env.NODE_ENV;
export const apiBaseUrl = process.env.API_BASE_URL;