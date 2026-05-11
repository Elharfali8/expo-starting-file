import { navLinks } from "@/utils/constants/NavLinks";
import { Feather } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

type Props = {
  isOpen: boolean;
  handleIsOpen: () => void;
};

export default function LinksDropDown({ isOpen, handleIsOpen }: Props) {
  const pathname = usePathname();
  const slideAnim = useRef(new Animated.Value(-200)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 15,
          stiffness: 150,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: -200,
          useNativeDriver: true,
          damping: 15,
          stiffness: 150,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const handleNavPress = (path: string) => {
  handleIsOpen();
  router.push(path as any);
};

  return (
    <Animated.View
  pointerEvents={isOpen ? "box-none" : "none"}
  style={{
    transform: [{ translateY: slideAnim }],
    opacity: opacityAnim,
    position: "absolute",
    top: 72,
    left: 8,
    right: 8,
    zIndex: 9999,
    elevation: 9999,
  }}
  className="bg-white rounded-2xl shadow-lg border border-slate-200 p-3"
>
      <View className="flex-col gap-y-1">
        {navLinks.map((link) => {
          const isActive =
            link.path === "/"
              ? pathname === "/"
              : pathname.startsWith(link.path);

          return (
            <TouchableOpacity
              key={link.id}
              onPress={() => handleNavPress(link.path)}
              activeOpacity={0.8}
              style={{ width: "100%" }}              // ← full width fix
              className={`flex-row items-center gap-3 px-3 py-2.5 rounded-xl ${
                isActive ? "bg-indigo-50" : ""
              }`}
            >
              <View
                className={`w-8 h-8 rounded-lg items-center justify-center ${
                  isActive ? "bg-blue-600" : "bg-slate-100"
                }`}
              >
                <Feather
                  name={link.icon as any}
                  size={16}
                  color={isActive ? "#ffffff" : "#64748b"}
                />
              </View>

              <View className="flex-1">
                <Text
                  className={`text-sm font-medium ${
                    isActive ? "text-blue-700" : "text-slate-900"
                  }`}
                >
                  {link.title}
                </Text>
                <Text className="text-xs text-slate-400">
                  {link.description}
                </Text>
              </View>

              {isActive && (
                <View className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
}