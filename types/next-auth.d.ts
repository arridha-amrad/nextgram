import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      name: string;
      image: string | null;
      email: string;
    };
  }

  interface User {
    id: string;
    username: string;
    name: string;
    image: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    name: string;
    image: string | null;
    email: string;
  }
}
