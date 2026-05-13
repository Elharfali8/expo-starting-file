import { router } from "expo-router";
import { LogOut, Settings } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { removeToken } from "@/utils/storage";
import AppDropdown from "./header/ui/AppDropdown";

const profileItems = [
  {
    label: "Logout",
    value: "logout",
    icon: <LogOut size={18} color="#dc2626" />,
  },
];

const ProfileDropDown = () => {
  return (
    <AppDropdown
      data={profileItems}
      placeholder="Profile"
      trigger={
        <View
          className="
      w-11
      h-11
      rounded-2xl
      bg-slate-50
      border
      border-slate-200
      items-center
      justify-center
    "
        >
          <Settings size={20} color="#0f172a" strokeWidth={2.2} />
        </View>
      }
      renderItem={(item: any) => (
        <TouchableOpacity
          activeOpacity={0.8}
          className="px-4 py-4"
          onPress={async () => {
            if (item.value === "logout") {
              await removeToken();

              router.replace("/login");
            }
          }}
        >
          <View className="flex-row items-center gap-3">
            {item.icon}

            <Text className="text-[14px] font-medium text-red-600">
              {item.label}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ProfileDropDown;
