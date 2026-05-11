import { Stack } from "expo-router";
import { View } from "react-native";

import TopNavBar from "@/components/header/TopNavBar";
import { useState } from "react";
import LinksDropDown from "@/components/header/LinksDropDown";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <View className="flex-1 bg-white">
      <TopNavBar isOpen={isOpen} handleIsOpen={handleIsOpen} />

      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Floats above Stack — this is the key */}
      <LinksDropDown isOpen={isOpen} handleIsOpen={handleIsOpen} />
    </View>
  );
}