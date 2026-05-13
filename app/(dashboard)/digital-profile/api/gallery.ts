import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// FETCH ALL IMAGES
export async function getAllGalleries({ username }: { username: string }) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/gallery/fetch-all/${username}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
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

// DELETE IMAGE
export async function deleteImage({
  username,
  imageId,
}: {
  username: string;
  imageId: number;
}) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/gallery/delete-image/${imageId}/${username}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete image");
  }

  return data;
}
