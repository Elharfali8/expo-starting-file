import { TouchableOpacity, Text, View } from "react-native";
import { ChevronDown, LayoutGrid } from "lucide-react-native";

export default function WorkspaceButton() {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="
        h-12
        px-4
        flex-row
        items-center
        gap-3
        bg-white
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

      <Text className="text-slate-900 text-[15px] font-semibold">
        Workspace
      </Text>

      <ChevronDown
        size={18}
        color="#64748b"
        strokeWidth={2.2}
      />
    </TouchableOpacity>
  );
}