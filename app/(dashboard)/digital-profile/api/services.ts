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

// CREATE A SERVICE
interface CreateServicePayload {
  title: string;
  description: string;
  price: number;
  show_price: boolean;
  is_negotiable: boolean;
  image: string | null;
}

interface CreateServiceResponse {
  message: string;
  service: Service;
}


export async function createService({
  username,
  serviceData,
}: {
  username: string;
  serviceData: CreateServicePayload;
}): Promise<Service> {
  const token = await getToken();

  // Build FormData instead of JSON
  const formData = new FormData();
  formData.append("title", serviceData.title);
  formData.append("description", serviceData.description);
  formData.append("price", String(serviceData.price));
  formData.append("show_price", String(serviceData.show_price));
  formData.append("is_negotiable", String(serviceData.is_negotiable));

  if (serviceData.image) {
    const filename = serviceData.image.split("/").pop() ?? "image.jpg";
    const ext = filename.split(".").pop()?.toLowerCase() ?? "jpg";
    const mimeType = ext === "png" ? "image/png" : "image/jpeg";

    // React Native's FormData accepts this object shape for files
    formData.append("image", {
      uri: serviceData.image,
      name: filename,
      type: mimeType,
    } as any);
  }

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/services/create/${username}`,
    {
      method: "POST",
      headers: {
        // ⚠️ Do NOT set Content-Type manually — fetch sets it
        // automatically with the correct boundary for multipart
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data: CreateServiceResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create service");
  }

  return data.service;
}

// UPDATE SERVICE
interface UpdateServicePayload {
  title: string;
  description: string;
  price: number;
  show_price: boolean;
  is_negotiable: boolean;
  image: string | null;
}

interface UpdateServiceResponse {
  message: string;
  service: Service;
}

export async function updateService({
  serviceId,
  username,
  serviceData,
}: {
  serviceId: number;
  username: string;
  serviceData: UpdateServicePayload;
}): Promise<Service> {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/services/update/${serviceId}/${username}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    }
  );

  const data: UpdateServiceResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update service");
  }

  return data.service;
}


// DELETE SERVICE
interface DeleteServiceResponse {
  message: string;
}

export async function deleteService({
  username,
  serviceId,
}: {
  username: string;
  serviceId: number;
}): Promise<string> {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/services/delete/${username}/${serviceId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: DeleteServiceResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete service");
  }

  return data.message;
}