import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies, headers } from "next/headers";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { name, text } = await req.json();

    if (!name || !text) {
      return NextResponse.json(
        { message: "Please fill in both your name and your wish ✨" },
        { status: 400 }
      );
    }

    // ambil ip address
    const h = await headers();
    const ipAddress =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      h.get("cf-connecting-ip") ??
      "unknown";

    // ambil cookie
    const cookieStore = await cookies();
    let anonId = cookieStore.get("anon_id")?.value;

    // cek cookie
    if (!anonId) {
      anonId = randomUUID();
      cookieStore.set("anon_id", anonId, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }

    // cek ip
    const exist = await prisma.wish.findFirst({
      where: { ipAddress: ipAddress },
    });

    if (exist) {
      return NextResponse.json(
        { message: "We’ve already saved your wish 💖" },
        { status: 400 }
      );
    }

    const data = await prisma.wish.create({
      data: {
        name,
        text,
        ipAddress,
        anonId,
      },
    });

    revalidatePath("/");

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const wishes = await prisma.$queryRaw<
      {
        id: string;
        name: string;
        text: string;
      }[]
    >`SELECT id, name, text FROM "Wish" ORDER BY RANDOM() LIMIT 10`;

    return NextResponse.json(wishes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch news." },
      { status: 500 }
    );
  }
}
