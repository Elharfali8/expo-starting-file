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


// UPDATE LINK
export async function updateSocialLink({
  username,
  platform_name,
  value,
}: {
  username: string;
  platform_name?: string;
  value: string;
}) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/social-links/${username}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        platform_name,
        value,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update social link");
  }

  return data;
}

// CREATE A LINK
export async function createSocialLink({
  username,
  platform_name,
  value,
}: {
  username: string;
  platform_name?: string;
  value: string;
}) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/social-links/${username}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        platform_name,
        value,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update social link");
  }

  return data;
}