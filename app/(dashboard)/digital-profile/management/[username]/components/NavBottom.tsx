import { router, useLocalSearchParams, usePathname } from "expo-router";
import {
  Blocks,
  CircleUser,
  Images,
  LayoutDashboard,
  Link2,
  Plus,
  Settings,
  Store,
} from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NavBottom = () => {
  const pathname = usePathname();
  const { username } = useLocalSearchParams();

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const navBottomLinks = [
    {
      id: 1,
      title: "tables board",
      icon: LayoutDashboard,
      path: `/digital-profile/management/${username}/home`,
    },
    {
      id: 2,
      title: "liens",
      icon: Link2,
      path: `/digital-profile/management/${username}/links`,
    },
    {
      id: 3,
      title: "gallerie",
      icon: Images,
      path: `/digital-profile/management/${username}/gallery`,
    },
    {
      id: 4,
      title: "services",
      icon: Blocks,
      path: `/digital-profile/management/${username}/services`,
    },
    {
      id: 5,
      title: "boutique",
      icon: Store,
      path: `/digital-profile/management/${username}/store`,
    },
    {
      id: 7,
      title: "plus",
      icon: Plus,
      child: [
        {
          id: 1,
          title: "paramètres",
          icon: Settings,
          path: `/digital-profile/management/${username}/setting`,
        },
        {
          id: 2,
          title: "mon profile",
          icon: CircleUser,
          path: `/digital-profile/management/${username}/profile`,
        },
      ],
    },
  ];

  return (
    <View
      className="
        absolute
        bottom-2
        right-3
        left-3
        bg-white
        py-2
        rounded-3xl
        border
        border-slate-200
      "
      style={{
        elevation: 10,
      }}
    >
      <View className="flex-row items-center px-2">
        {navBottomLinks.map((item) => {
          const Icon = item.icon;

          const hasChildren = !!item.child?.length;

          const isActive = item.path ? pathname.startsWith(item.path) : false;

          const isMenuOpen = openMenuId === item.id;

          return (
            <View key={item.id} className="relative flex-1 items-center">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (hasChildren) {
                    setOpenMenuId((prev) =>
                      prev === item.id ? null : item.id,
                    );
                    return;
                  }

                  if (item.path) {
                    router.push(item.path as any);
                  }
                }}
                className="
                  items-center
                  justify-center
                  py-2
                "
              >
                <View
                  className={`
                    w-11
                    h-11
                    items-center
                    justify-center
                    rounded-2xl
                    ${isActive || isMenuOpen ? "bg-blue-500" : "bg-slate-100"}
                  `}
                >
                  <Icon
                    size={20}
                    color={isActive || isMenuOpen ? "#ffffff" : "#0f172a"}
                    strokeWidth={2.2}
                  />
                </View>

                <Text
                  className={`
                    text-[10px]
                    mt-1
                    font-medium
                    ${
                      isActive || isMenuOpen
                        ? "text-blue-500"
                        : "text-slate-500"
                    }
                  `}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>

              {/* Dropdown */}
              {isMenuOpen && hasChildren && (
                <View
                  className="
                    absolute
                    bottom-24
                    right-0
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-2
                    z-50
                    min-w-[180px]
                  "
                  style={{
                    elevation: 12,
                  }}
                >
                  {item.child?.map((child) => {
                    const ChildIcon = child.icon;

                    return (
                      <TouchableOpacity
                        key={child.id}
                        activeOpacity={0.8}
                        onPress={() => {
                          setOpenMenuId(null);

                          router.push(child.path as any);
                        }}
                        className="
                          flex-row
                          items-center
                          gap-3
                          px-3
                          py-3
                          rounded-xl
                          bg-white
                        "
                      >
                        <View
                          className="
                            w-9
                            h-9
                            rounded-xl
                            bg-slate-100
                            items-center
                            justify-center
                          "
                        >
                          <ChildIcon
                            size={18}
                            color="#0f172a"
                            strokeWidth={2.2}
                          />
                        </View>

                        <Text className="text-sm font-medium text-slate-900">
                          {child.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default NavBottom;
