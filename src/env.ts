export function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env variable: ${name}`);
  return value;
}

export const env = {
  authGithubId: getEnv("AUTH_GITHUB_ID"),
  authGithubSecret: getEnv("AUTH_GITHUB_SECRET"),
  authGoogleId: getEnv("AUTH_GOOGLE_ID"),
  authGoogleSecret: getEnv("AUTH_GOOGLE_SECRET"),
  authSecret: getEnv("AUTH_SECRET"),
  dbUrl: getEnv("DB_URL"),
  googleRefreshToken: getEnv("GOOGLE_REFRESH_TOKEN"),
  googleUser: getEnv("GOOGLE_USER"),
  tokenSecretKey: getEnv("TOKEN_SECRET_KEY"),
  imageKitPublicKey: getEnv("IMAGE_KIT_PUB_KEY"),
  imageKitPrivateKey: getEnv("IMAGE_KIT_PRI_KEY"),
  imageKitUrlEndpoint: getEnv("IMAGE_KIT_URL_ENDPOINT"),
};
