import { View, TouchableOpacity, Text } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import {
  Bell,
  ChevronDown,
  LayoutGrid,
  UserRound,
} from "lucide-react-native";

export default function TopNavBar() {
  return (
    <View className="bg-white border-b border-slate-200">
      <View className="h-18 px-4 flex-row items-center justify-between">
        
        {/* LEFT */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/(dashboard)/home")}
        >
          <Image
            source={require("@/assets/images/yascript.png")}
            style={{
              width: 80,
              height: 34,
            }}
            contentFit="contain"
          />
        </TouchableOpacity>

        {/* RIGHT */}
        <View className="flex-row items-center gap-3">
          
          {/* WORKSPACE */}
          <TouchableOpacity
            activeOpacity={0.85}
            className="
              h-11
              px-2
              flex-row
              items-center
              gap-2
              bg-slate-50
              border
              border-slate-200
              rounded-2xl
            "
          >
            <View className="w-8 h-8 rounded-xl bg-indigo-50 items-center justify-center">
              <LayoutGrid
                size={18}
                color="#4f46e5"
                strokeWidth={2.2}
              />
            </View>

            <Text className="text-slate-900 text-[14px] font-semibold">
              Workspace
            </Text>

            <ChevronDown
              size={18}
              color="#64748b"
              strokeWidth={2.2}
            />
          </TouchableOpacity>

          {/* NOTIFICATIONS */}
          <TouchableOpacity
            activeOpacity={0.85}
            className="
              w-11
              h-11
              rounded-2xl
              bg-slate-50
              border
              border-slate-200
              items-center
              justify-center
              relative
            "
          >
            <Bell
              size={20}
              color="#0f172a"
              strokeWidth={2.2}
            />

            {/* BADGE */}
            <View
              className="
                absolute
                -top-1
                -right-1
                min-w-[20px]
                h-5
                px-1
                rounded-full
                bg-indigo-600
                items-center
                justify-center
              "
            >
              <Text className="text-white text-[10px] font-bold">
                9+
              </Text>
            </View>
          </TouchableOpacity>

          {/* PROFILE */}
          <TouchableOpacity
            activeOpacity={0.85}
            className="
              w-11
              h-11
              rounded-2xl
              bg-slate-100
              items-center
              justify-center
            "
          >
            <UserRound
              size={20}
              color="#64748b"
              strokeWidth={2.2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}