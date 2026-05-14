import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

type GetAllReviewsProps = {
  username: string;
  page?: number;
  limit?: number;
  search?: string;
  rating?: string;
};

// GET ALL REVIEWS
export async function getAllReviews({
  username,
  page = 1,
  limit = 10,
  search,
  rating,
}: GetAllReviewsProps) {
  const token = await getToken();

  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));

  if (search) {
    params.append("search", search);
  }

  if (rating) {
    params.append("rating", rating);
  }

  const response = await fetch(
    `${BASE_URL}/users/digital-profile/store/reviews/fetch-all/${username}?${params.toString()}`,
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
    throw new Error(data.message || "Failed to fetch reviews");
  }

  return data;
}