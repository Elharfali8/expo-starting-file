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
        "Content-Type": "application/json",
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

// UPLOAD IMAGES
export async function uploadGalleryImages({ username, images }: { username: string; images: any[] }) {
  const token = await getToken();

  const formData = new FormData();

  images.forEach((image, index) => {
    formData.append("images", {
      uri: image.uri,
      name: image.fileName || `image-${index}.jpg`,
      type: image.mimeType || image.type || "image/jpeg",
    } as any);
  });

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/gallery/upload/${username}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  );

  // ADD THIS - handle non-JSON responses
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.log("Server raw response:", text); // 👈 this will show the actual error
    throw new Error(`Server error: ${response.status}`);
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload images");
  }

  return data;
}