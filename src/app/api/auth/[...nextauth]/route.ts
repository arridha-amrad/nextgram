import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {},
        password: {},
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
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
