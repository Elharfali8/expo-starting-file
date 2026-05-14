import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// GET ALL ORDERS

type OrdersType = {
  username: string;
  page?: number;
};
export async function getAllOrders({ username, page = 1 }: OrdersType) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/orders/fetch/${username}?page=${page}`,
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
    username: string
    orderId: number
}

export async function getSingleOrder({ username, orderId }: SingleOrderProps) {
    const token = await getToken()

    const response = await fetch(
        `${BASE_URL}/users/digital-profile/store/orders/fetch-one/${orderId}/${username}`,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error("Failed to fetch single order")
    }

    return data.order
}