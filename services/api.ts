const BASE_URL = process.env.EXPO_PUBLIC_API_URL 

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/public/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; 
};