import { getFromSWAP } from "@/src/utils/getFromSWAP";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type");
  const term = searchParams.get("term");

  if (!type || !term) {
    return Response.json({ message: "Missing type or term" }, { status: 500 });
  }

  try {
    const results = await getFromSWAP(type, term);

    return Response.json({ results });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
