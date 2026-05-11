import { Stack } from "expo-router";
import { Text, View } from "react-native";
import NavBottom from "./components/NavBottom";

export default function ManagementLayout() {
  return (
    <View className="flex-1 relative">

      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        
          </View>
          <NavBottom />
    </View>
  );
}