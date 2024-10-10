import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

export async function POST(request: Request) {
  const { name, email, file } = await request.json();

  console.log("file", file);

  if (file) {
    console.log(file);
  }

  const user = await prisma.user.create({
    data: { name, email },
  });

  return Response.json(user);
}
