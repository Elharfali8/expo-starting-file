import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// GET ALL ORDERS

type OrdersType = {
  username: string;
  page?: number;
  status?: string; // ← add
  search?: string; // ← add
};
export async function getAllOrders({
  username,
  page = 1,
  status,
  search,
}: OrdersType) {
  const token = await getToken();

  // Build query params
  const params = new URLSearchParams();
  params.append("page", String(page));
  if (status) params.append("status", status);
  if (search) params.append("search", search);

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/orders/fetch/${username}?${params.toString()}`,
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
    throw new Error("Failed to fetch orders");
  }

  return data;
}

// FETCH SINGLE ORDER

type SingleOrderProps = {
  username: string;
  orderId: number;
};

export async function getSingleOrder({ username, orderId }: SingleOrderProps) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/orders/fetch-one/${orderId}/${username}`,
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
    throw new Error("Failed to fetch single order");
  }

  return data.order;
}

// UPDATE ORDER

interface OrderData {
  note?: string;
  order_status?: string;
  payment_status?: string;
  fulfillment_status?: string;
}

type UpdateSingleOrder = {
  username: string;
  orderId: number;
  orderData: OrderData;
};

export async function updateOrder({
  username,
  orderId,
  orderData,
}: UpdateSingleOrder) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/orders/update/${orderId}/${username}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    },
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update service");
  }

  return data.order;
}

// DELETE ORDER
export async function deleteOrder({
  username,
  orderId,
}: {
  username: string;
  orderId: number;
}): Promise<string> {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/orders/${orderId}/${username}`,
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
    throw new Error(data.message || "Failed to delete order");
  }

  return data.message;
}
