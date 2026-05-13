// components/ui/AppDropdown.tsx

import React, { ReactNode, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DropdownItem = {
  label: string;
  value: string;
  icon?: ReactNode;
};

type Props = {
  data: DropdownItem[];

  value?: string;
  onChange?: (item: DropdownItem) => void;

  placeholder?: string;

  trigger: ReactNode;

  className?: string;
  dropdownClassName?: string;
  itemClassName?: string;

  closeOnSelect?: boolean;

  renderItem?: (item: DropdownItem) => ReactNode;
};

export default function AppDropdown({
  data,
  value,
  onChange,
  trigger,
  placeholder = "Select",
  className = "",
  dropdownClassName = "",
  itemClassName = "",
  closeOnSelect = true,
  renderItem,
}: Props) {
  const [open, setOpen] = useState(false);

  const selectedItem = useMemo(() => {
    return data.find((item) => item.value === value);
  }, [data, value]);

  const handleSelect = (item: DropdownItem) => {
    onChange?.(item);

    if (closeOnSelect) {
      setOpen(false);
    }
  };

  return (
    <View className={`relative ${className}`}>
      {/* TRIGGER */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => setOpen(true)}>
        {trigger}
      </TouchableOpacity>

      {/* BACKDROP */}
      <Modal transparent visible={open} animationType="fade">
        <Pressable
          className="flex-1 bg-black/10"
          onPress={() => setOpen(false)}
        >
          <View className="absolute top-22 right-4">
            {/* DROPDOWN */}
            <Pressable
              className={`
                w-[320px]
                bg-white
                rounded-3xl
                border
                border-slate-200
                overflow-hidden
                shadow-sm
                ${dropdownClassName}
              `}
            >
              {/* HEADER */}
              <View className="px-4 py-3 border-b border-slate-100">
                <Text className="text-slate-900 font-semibold text-base">
                  {selectedItem?.label || placeholder}
                </Text>
              </View>

              {/* ITEMS */}
              <FlatList
                data={data}
                keyExtractor={(item) => item.value}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  if (renderItem) {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => handleSelect(item)}
                      >
                        {renderItem(item)}
                      </TouchableOpacity>
                    );
                  }

                  return (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => handleSelect(item)}
                      className={`
                        px-4
                        py-4
                        flex-row
                        items-center
                        gap-3
                        border-b
                        border-slate-100
                        ${itemClassName}
                      `}
                    >
                      {item.icon}

                      <Text className="text-slate-700 text-[15px]">
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
