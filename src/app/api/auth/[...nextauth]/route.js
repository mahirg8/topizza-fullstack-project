import mongoose from "mongoose";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/libs/mongoConnect"

export const authOptions = {
    secret: process.env.SECRET, // Ensure this is set in your .env file
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                // Ensure mongoose is connected
                if (!mongoose.connection.readyState) {
                    await mongoose.connect(process.env.MONGO_URL, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    });
                }

                // Find the user by email
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("No user found with this email");
                }

                // Verify the password
                const passwordOk = await bcrypt.compare(password, user.password);
                if (!passwordOk) {
                    throw new Error("Invalid password");
                }

                // Return the user object
                return {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error", // Optional: custom error page
    }
}

export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
        return false;
    }
    const userInfo = await UserInfo.findOne({ email: userEmail });
    if (!userInfo) {
        return false;
    }
    return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
