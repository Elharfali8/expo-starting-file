import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL


export async function getAllCategories({username}:{username:string}) {
    const token = getToken()
    const response = await fetch(
        `${BASE_URL}/shared/digital-profile/store/categories/${username}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    )
    const data: any[] = await response.json()

    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }

    return data;
}