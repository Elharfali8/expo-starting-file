import PageTitle from "@/app/(dashboard)/components/PageTitle";
import { router, Slot, usePathname } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const StoreLayout = () => {
  const pathname = usePathname();

  const storeLinks = [
    {
      id: 1,
      title: "produits",
      path: "/digital-profile/management/store",
    },
    {
      id: 2,
      title: "commandes",
      path: "/digital-profile/management/store/orders",
    },
    {
      id: 3,
      title: "catégories",
      path: "/digital-profile/management/store/categories",
    },
    {
      id: 4,
      title: "clients",
      path: "/digital-profile/management/store/customers",
    },
    {
      id: 5,
      title: "avis",
      path: "/digital-profile/management/store/reviews",
    },
  ];

  return (
    <ScrollView
      className="flex-1 bg-slate-50 mb-24"
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pt-4 pb-8">
        <PageTitle title="Boutique" />

        <View className="bg-white shadow-md rounded-2xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800">
            Navigation
          </Text>

          <View className="items-center flex-row flex-wrap gap-4 mt-4">
            {storeLinks.map((item:any) => {
              const isActive = pathname === item.path;

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.85}
                  onPress={() => router.push(item.path)}
                  className={`
                    px-5 py-2 rounded-2xl border shadow-sm
                    ${
                      isActive
                        ? "bg-black border-black"
                        : "bg-white border-gray-200"
                    }
                  `}
                >
                  <Text
                    className={`
                      capitalize font-medium
                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-700"
                      }
                    `}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Slot />
      </View>
    </ScrollView>
  );
};

export default StoreLayout;