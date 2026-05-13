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

// UPDATE CATEGORY
type UpdateCategoryPayload = {
  image: string;
  name: string;
  visibility: boolean;
  description: string;
};

// UPDATE CATEGORY
export async function updateCategory({
  categoryId,
  username,
  categoryData,
}: {
  categoryId: number;
  username: string;
  categoryData: UpdateCategoryPayload;
}) {
  const token = await getToken();

  const formData = new FormData();

  // image can be local picked image OR existing image path
  if (categoryData.image.startsWith("file")) {
    formData.append("image", {
      uri: categoryData.image,
      name: "category.jpg",
      type: "image/jpeg",
    } as any);
  }

  formData.append("name", categoryData.name);

  formData.append("visibility", String(categoryData.visibility));

  formData.append("description", categoryData.description);

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/update-category/${categoryId}/${username}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update category");
  }

  return data;
}

// DELETE CATEGORY

type CategoryProps = {
  username: string;
  categoryId: number;
};

export async function deleteCategory({ username, categoryId }: CategoryProps) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/categories/${categoryId}/${username}`,
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
