// TopNavBar.tsx

import { Image } from "expo-image";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { UserRound } from "lucide-react-native";

import WorkspaceButton from "./WorkspaceButton";
import NotificationDropdown from "../NotificationDropdown";
import ProfileDropDown from "../ProfileDropDown";

type Props = {
  isOpen: boolean;
  handleIsOpen: () => void;
};

export default function TopNavBar({
  isOpen,
  handleIsOpen,
}: Props) {
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
          <WorkspaceButton
            isOpen={isOpen}
            handleIsOpen={handleIsOpen}
          />

          {/* GLOBAL DROPDOWN */}
          <NotificationDropdown />

          {/* PROFILE */}
          <ProfileDropDown />
        </View>
      </View>
    </View>
  );
}