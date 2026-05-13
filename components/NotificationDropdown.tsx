// components/NotificationDropdown.tsx


import {
  Bell,
  CheckCheck,
  FileText,
  MessageCircle,
} from "lucide-react-native";

import { Text, View } from "react-native";
import AppDropdown from "./header/ui/AppDropdown";

const notifications = [
  {
    label: "New comment on your post",
    value: "1",
    icon: <MessageCircle size={18} color="#2563eb" />,
    time: "2m ago",
  },
  {
    label: "Workspace updated",
    value: "2",
    icon: <FileText size={18} color="#7c3aed" />,
    time: "10m ago",
  },
  {
    label: "All tasks completed",
    value: "3",
    icon: <CheckCheck size={18} color="#16a34a" />,
    time: "1h ago",
  },
];

export default function NotificationDropdown() {
  return (
    <AppDropdown
      data={notifications}
      placeholder="Notifications"
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
            relative
          "
        >
          <Bell size={20} color="#0f172a" strokeWidth={2.2} />

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
              3
            </Text>
          </View>
        </View>
      }
      renderItem={(item: any) => (
        <View className="px-4 py-4 border-b border-slate-100">
          <View className="flex-row items-start gap-3">
            <View className="mt-1">{item.icon}</View>

            <View className="flex-1">
              <Text className="text-slate-900 font-medium text-[14px]">
                {item.label}
              </Text>

              <Text className="text-slate-400 text-xs mt-1">
                {item.time}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}