import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// GET ALL CUSTOMERS
export async function getAllCustomers({
  username,
  search = "",
  limit = 10,
  page = 1,
}: {
  username: string;
  search?: string;
  limit?: number;
  page?: number;
}) {
  const token = await getToken();

  const query = new URLSearchParams({
    search,
    limit: String(limit),
    page: String(page),
  });

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/customers/fetch/${username}?${query.toString()}`,
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
    throw new Error(data.message || "Failed to fetch customers");
  }

  return data;
}


// GET SINGLE CUSTOMER
type SingleCustomerProps = {
  username: string;
  customerId: number;
};

export async function getSingleCustomer({
  username,
  customerId,
}: SingleCustomerProps) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/customers/fetch/${customerId}/${username}`,
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
    throw new Error(data.message || "Failed to fetch customer");
  }

  return data;
}

// DELETE CUSTOMER
export async function deleteCustomer({
  username,
  customerId,
}: {
  username: string;
  customerId: number;
}) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/customers/delete/${customerId}/${username}`,
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
    throw new Error(data.message || "Failed to delete customer");
  }

  return data.message;
}