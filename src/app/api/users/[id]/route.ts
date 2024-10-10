import { prisma } from "@/app/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("params", params);
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return Response.json({ error: "User not found!" }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "Error fetching user" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { name, email } = await request.json();

  const user = await prisma.user.update({
    data: { name, email },
    where: { id: Number(params.id) },
  });

  return Response.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const user = await prisma.user.delete({
    where: { id: Number(id) },
  });

  return Response.json(user);
}
