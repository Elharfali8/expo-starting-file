import { ChevronDown, ChevronUp, LayoutGrid } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  isOpen: boolean;
  handleIsOpen: () => void;
};

export default function WorkspaceButton({ isOpen, handleIsOpen }: Props) {

  return (
    <TouchableOpacity
      onPress={handleIsOpen}
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
        <LayoutGrid size={18} color="#4f46e5" strokeWidth={2.2} />
      </View>

      <Text className="text-slate-900 text-[14px] font-semibold">
        Workspace
      </Text>

      {isOpen ? (
        <ChevronUp size={18} color="#64748b" strokeWidth={2.2} />
      ): (
        <ChevronDown size={18} color="#64748b" strokeWidth={2.2} />
      )}
    </TouchableOpacity>
  );
}
