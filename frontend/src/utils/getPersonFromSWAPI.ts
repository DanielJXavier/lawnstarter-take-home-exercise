import { BASE_SWAPI_URL } from "../app/api/constants";
import { PersonResult } from "../app/api/types";

export const getPersonFromSWAPI = async (uid: string) => {
  const response = await fetch(`${BASE_SWAPI_URL}/people/${uid}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch people (uid: ${uid})`);
  }

  const { message, result } = await response.json();

  if (message !== "ok") {
    return Response.json({ message: `Failed to fetch people (uid: ${uid})` });
  }

  return result as PersonResult;
};
