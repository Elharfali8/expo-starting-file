import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export interface DigitalProfile {
  id: number | null;
  user_id: number | null;
  username: string;

  is_setup_completed: number;

  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;

  qr_code_id: string;

  profile_id: number | null;

  title: string | null;
  bio: string | null;

  profile_image: string | null;

  address: string | null;

  phone_number: string | null;

  email_address: string | null;

  website_url: string | null;
}

export async function getAllProfiles(): Promise<DigitalProfile[]> {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: DigitalProfile[] = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch profiles");
  }

  return data;
}