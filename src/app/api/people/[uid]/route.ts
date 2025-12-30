import { getPersonFromSWAPI } from "../../../../utils/getPersonFromSWAPI";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;

  console.log("uid", uid);

  if (!uid) {
    return Response.json({ message: "Missing uid" }, { status: 500 });
  }

  try {
    const result = await getPersonFromSWAPI(uid);

    return Response.json({ result });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to fetch person" },
      { status: 500 }
    );
  }
}
