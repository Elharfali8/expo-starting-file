import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Service {
  id: number;
  profile_id: number;
  user_id: number;
  title: string;
  description: string;
  price: number | null;
  is_negotiable: boolean;
  show_price: boolean;
  image_path: string;
  contact_method: string;
  whatsapp_number: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ServicesResponse {
  message: string;
  services: Service[];
}

export async function getServices({
  username,
}: {
  username: string;
}): Promise<Service[]> {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/services/all/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: ServicesResponse = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return data.services;
}