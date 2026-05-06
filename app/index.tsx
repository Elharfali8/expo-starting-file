import "@/global.css";

import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { router } from "expo-router";

import { getToken } from "@/utils/storage";

export default function App() {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();

      if (token) {
        router.replace("/(dashboard)");
      } else {
        router.replace("/(auth)/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-slate-950">
      <ActivityIndicator color="white" />
    </View>
  );
}