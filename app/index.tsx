import "@/global.css";

import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function App() {
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = await getToken();

  //     if (token) {
  //       router.replace("/(dashboard)");
  //     } else {
  //       router.replace("/(auth)/login");
  //     }
  //   };

  //   checkAuth();
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(dashboard)");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-slate-950">
      <ActivityIndicator color="white" />
    </View>
  );
}


