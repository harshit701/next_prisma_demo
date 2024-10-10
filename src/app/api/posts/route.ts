export async function GET() {
  return Response.json({ title: "This is title", message: "Route called!" });
}

export async function POST(request: Request) {
  const req = await request.json();

  console.log("req", req);

  return Response.json({ data: req });
}
