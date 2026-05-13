import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getAllGalleries({ username }: { username: string }) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/gallery/fetch-all/${username}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return data.gallery;
}
