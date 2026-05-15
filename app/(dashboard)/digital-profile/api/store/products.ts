import { getToken } from "@/utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

type Props = {
    username: string
    page?: number
    limit?: number
    search?: string
    category?: string
    minPrice?: number
    maxPrice?: number
}

export async function getAllProducts({ 
    username, 
    page = 1, 
    limit = 10, 
    search = '', 
    category = '', 
    minPrice, 
    maxPrice 
}: Props) {
    const token = await getToken()

    // Build query parameters
    const queryParams = new URLSearchParams()
    queryParams.append('page', page.toString())
    queryParams.append('limit', limit.toString())
    
    if (search) queryParams.append('search', search)
    if (category) queryParams.append('category', category)
    if (minPrice !== undefined) queryParams.append('minPrice', minPrice.toString())
    if (maxPrice !== undefined) queryParams.append('maxPrice', maxPrice.toString())

    const url = `${BASE_URL}/users/digital-profile/store/fetch-products/${username}?${queryParams.toString()}`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data?.message || `failed to fetch products`)
    }

    return data
}