import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    pages: {
        signIn: "/accounts/login",
    },
    callbacks: {
        session({ session, token }) {
            if (token) {
                session.user.username = token.username as string;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
        jwt({ token, user, account, profile }) {
            if (user) {
                token.email = user.email;
                token.sub = user.id;
                token.username = user.username;
            }
            return token;
        },
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
                    username: credentials?.username ?? "",
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
