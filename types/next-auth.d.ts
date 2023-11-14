import { DefaultSession, DefaultUser, JWT } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
  }

  interface JWT extends DefaultJWT {
    username: string;
  }
}
