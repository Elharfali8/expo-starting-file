import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

type Props = {
  username: string;
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export async function getAllProducts({
  username,
  page = 1,
  limit = 10,
  search = "",
  category = "",
  minPrice,
  maxPrice,
}: Props) {
  const token = await getToken();

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  if (search) queryParams.append("search", search);
  if (category) queryParams.append("category", category);
  if (minPrice !== undefined)
    queryParams.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined)
    queryParams.append("maxPrice", maxPrice.toString());

  const url = `${BASE_URL}/users/digital-profile/store/fetch-products/${username}?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `failed to fetch products`);
  }

  return data;
}

export async function getSingleProduct({
  username,
  productId,
}: {
  username: string;
  productId: number;
}) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/fetch-product/${productId}/${username}`,
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
    throw new Error(data?.message || `failed to fetch product`);
  }

  return data;
}

// DELETE PRODUCT

export async function deleteProduct({
  username,
  productId,
}: {
  username: string;
  productId: number;
}) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/products/${productId}/${username}`,
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
    throw new Error(data?.message || "Failed to delete product");
  }

  return data;
}


// UPDATE PRODUCT

export async function updateProduct({
  username,
  productId,
  name,
  visibility,
  in_stock,
  category,
  price,
  original_price,
  rich_description,
  description,
  imagesToDelete,
  options,
  images,
}: {
  username: string;
  productId: number;
  name: string;
  visibility: boolean;
  in_stock: boolean;
  category: number;
  price: number;
  original_price?: number;
  rich_description?: string;
  description?: string;
  imagesToDelete?: number[];
  options?: Array<{ id?: number; label: string }>;
  images?: any[]; // Array of image objects with uri, name, type
}) {
  const token = await getToken();

  // Create FormData for multipart/form-data request
  const formData = new FormData();

  // Append basic fields
  formData.append("name", name);
  formData.append("visibility", String(visibility));
  formData.append("in_stock", String(in_stock));
  formData.append("category", String(category));
  formData.append("price", String(price));
  
  if (original_price !== undefined && original_price !== 0) {
    formData.append("original_price", String(original_price));
  }
  
  if (rich_description) {
    formData.append("rich_description", rich_description);
  }
  
  if (description) {
    formData.append("description", description);
  }

  // Append imagesToDelete as JSON string
  if (imagesToDelete && imagesToDelete.length > 0) {
    formData.append("imagesToDelete", JSON.stringify(imagesToDelete));
  }

  // Append options as JSON string
  if (options && options.length > 0) {
    formData.append("options", JSON.stringify(options));
  }

  // Append new images to upload
  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image as any);
    });
  }

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/update-product/${productId}/${username}`,
    {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        // Don't set Content-Type header, let browser set it with boundary
      },
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update product");
  }

  return data;
}