import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getAllSocialLinks({ username }: { username: string }) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/social-links/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data: any[] = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch social links");
  }

  return data;
}
