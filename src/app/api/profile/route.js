import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfo } from '@/models/UserInfo'
export async function PUT(req) {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGO_URL);
            console.log("Connected to MongoDB");
        }

        // Get the session
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // Parse request data
        const data = await req.json();
        const { _id, name, image, ...otherUserInfo } = data;

        let filter = {};
        if (_id) {
            filter = { _id };
        } else {
            const email = session.user.email;
            filter = { email };
        }

        const user = await User.findOne(filter);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        // Update user and additional user info
        await User.updateOne(filter, { name, image });
        await UserInfo.findOneAndUpdate(
            { email: user.email },
            otherUserInfo,
            { upsert: true }
        );

        return new Response(JSON.stringify(true), { status: 200 });
    } catch (error) {
        console.error("Error in PUT handler:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

export async function GET(req) {
    await mongoose.connect(process.env.MONGO_URL);

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    let filterUser = {};
    if (_id) {
        filterUser = {_id};
        
    }
    else {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        if (!email) {
            return Response.json({});
        }
        filterUser = {email};
        
    }

    const user = await User.findOne(filterUser).lean();
    const userInfo = await UserInfo.findOne({ email: user.email }).lean();
    return Response.json({ ...user, ...userInfo });

}
