import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import {UserInfo} from '@/models/UserInfo'

export async function PUT(req) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    }

    const data = await req.json();
    const {name, image, ...otherUserInfo} = data;
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;


    const result = await User.updateOne({ email }, {name, image});
    console.log("Update Result:", result);

    await UserInfo.findOneAndUpdate({email}, otherUserInfo, {upsert: true})

    return Response.json(true);
}

export async function GET(){
    await mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if(!email ){
        return Response.json({});
    }

    const user = await User.findOne({email}).lean();
    const userInfo = await UserInfo.findOne({email}).lean();
    return Response.json({...user, ...userInfo});
}
