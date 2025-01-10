import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
  try {
    // Connect to MongoDB
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    // Get session
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userEmail = session.user.email;
    const admin = ["admin@example.com"].includes(userEmail); // Replace with your admin logic

    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (_id) {
      const order = await Order.findById(_id);
      if (!order) {
        return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
      }
      return new Response(JSON.stringify(order), { status: 200 });
    }

    if (admin) {
      const orders = await Order.find();
      return new Response(JSON.stringify(orders), { status: 200 });
    }

    if (userEmail) {
      const userOrders = await Order.find({ userEmail });
      return new Response(JSON.stringify(userOrders), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
