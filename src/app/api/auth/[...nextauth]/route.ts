import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/accounts/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          placeholder: "username",
        },
        password: {
          label: "Password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        console.log({ credentials });
        const user = {
          id: "1",
          name: "J Smith",
          username: credentials?.username,
          password: credentials?.password,
          email: "jsmith@example.com",
        };

        if (credentials?.password !== "123") {
          throw new Error("Invalid credentials");
        }

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
