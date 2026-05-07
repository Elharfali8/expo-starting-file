import { Stack } from "expo-router";
import { View } from "react-native";

import TopNavBar from "@/components/header/TopNavBar";

export default function DashboardLayout() {
  return (
    <View className="flex-1 bg-white">
      <TopNavBar />

      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </View>
  );
}