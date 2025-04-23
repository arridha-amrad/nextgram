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
  pinataApiKey: getEnv("PINATA_API_KEY"),
  pinataApiSecret: getEnv("PINATA_API_SECRET"),
  pinataJwt: getEnv("PINATA_JWT"),
  pinataGateway: getEnv("PINATA_GATEWAY"),
};
