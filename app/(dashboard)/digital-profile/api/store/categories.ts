import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getAllCategories({ username }: { username: string }) {
  const token = getToken();
  const response = await fetch(
    `${BASE_URL}/shared/digital-profile/store/categories/${username}`,
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
    throw new Error("Failed to fetch services");
  }

  return data;
}

type CreateCategoryPayload = {
  image: string;
  name: string;
  visibility: boolean;
  description: string;
};

// CREATE CATEGORY
export async function createCategory({
  username,
  categoryData,
}: {
  username: string;
  categoryData: CreateCategoryPayload;
}) {
  const token = await getToken();

  const formData = new FormData();

  formData.append("image", {
    uri: categoryData.image,
    name: "category.jpg",
    type: "image/jpeg",
  } as any);

  formData.append("name", categoryData.name);

  formData.append("visibility", String(categoryData.visibility));

  formData.append("description", categoryData.description);

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/create-category/${username}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to create category");
  }

  return data;
}
