import {
  Link2,
  PackageSearch,
  UserPlus,
  UserRoundPen,
} from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PageTitle from "../../components/PageTitle";

const HomeManagement = () => {
  const fasterActions = [
    {
      id: 1,
      title: "Ajouter un produit",
      description: "Créer rapidement un nouveau produit",
      icon: UserPlus,
      iconBg: "bg-blue-100",
      iconColor: "#2563eb",
    },
    {
      id: 2,
      title: "Voir les commandes",
      description: "Vérifier les commandes clients",
      icon: PackageSearch,
      iconBg: "bg-orange-100",
      iconColor: "#ea580c",
    },
    {
      id: 3,
      title: "Ajouter un lien",
      description: "Ajouter vos réseaux sociaux",
      icon: Link2,
      iconBg: "bg-green-100",
      iconColor: "#16a34a",
    },
    {
      id: 4,
      title: "Modifier le profil",
      description: "Modifier les informations",
      icon: UserRoundPen,
      iconBg: "bg-purple-100",
      iconColor: "#9333ea",
    },
  ];

  const mediUrl = process.env.EXPO_PUBLIC_MEDIA_URL;

  return (
    <ScrollView
      className="flex-1 bg-slate-50 mb-26"
      showsVerticalScrollIndicator={true}
    >
      <View className="px-4 pt-4 pb-8">
        <PageTitle
          title="Bon retour, Yascript"
          subTitle="Gérez rapidement votre profil"
        />

        {/* Actions rapides */}
        <View className="bg-white rounded-3xl p-5 shadow-sm w-full mb-6">
          <Text className="font-semibold text-gray-900 text-lg mb-5">
            Actions rapides :
          </Text>

          <View className="flex-row flex-wrap justify-between gap-4">
            {fasterActions.map((item) => {
              const {
                id,
                title,
                description,
                icon: Icon,
                iconBg,
                iconColor,
              } = item;

              return (
                <TouchableOpacity
                  key={id}
                  activeOpacity={0.7}
                  className="w-[47%]"
                >
                  <View className="bg-slate-50 border border-slate-200 rounded-2xl p-4 min-h-[180px] items-center justify-center">
                    <View className="items-center justify-center gap-3">
                      <View
                        className={`w-16 h-16 rounded-2xl items-center justify-center ${iconBg}`}
                      >
                        <Icon size={28} color={iconColor} />
                      </View>

                      <View className="items-center justify-center w-full">
                        <Text className="text-gray-900 font-semibold text-base text-center mb-1">
                          {title}
                        </Text>

                        <Text
                          numberOfLines={2}
                          className="text-gray-500 text-xs text-center leading-5 px-1"
                        >
                          {description}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Contrôle rapide des stocks */}
        <View className="p-5 bg-white shadow-sm rounded-2xl mb-6">
          {/* header */}
          <View className="w-full flex-row items-center justify-between mb-4">
            <View>
              <Text className="font-semibold text-gray-900 text-lg">
                Contrôle rapide des stocks :
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-blue-600 font-medium">voir tout</Text>
            </TouchableOpacity>
          </View>

          {/* content */}
          <View className="gap-3">
            <TouchableOpacity activeOpacity={0.7}>
              <View className="flex-row items-center gap-3 border-b pb-2 border-b-gray-300">
                <View
                  className="items-center justify-center"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    overflow: "hidden",
                    backgroundColor: "#ddd",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://linksolutions.ma/wp-content/uploads/2025/11/ordinateur-portable-hp-laptop-15-fd0315nk-i3-1315u-8gb-256gb-w11-sku-b63kxea-linksolutions.webp",
                    }}
                    style={{ width: 60, height: 60 }}
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">NFC Card</Text>
                  <Text className="text-gray-500 text-sm">
                    Stock: 45 unités
                  </Text>
                </View>
                <View className="bg-red-100 px-3 py-1 rounded-full">
                  <Text className="text-red-600 text-xs font-semibold">
                    Stock faible
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Add more stock items for example */}
            <TouchableOpacity activeOpacity={0.7}>
              <View className="flex-row items-center gap-3 border-b pb-2 border-b-gray-300">
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    overflow: "hidden",
                    backgroundColor: "#ddd",
                  }}
                >
                  <View className="w-full h-full bg-gray-200 items-center justify-center">
                    <Text className="text-gray-500">📦</Text>
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">
                    Smart Watch
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    Stock: 120 unités
                  </Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-600 text-xs font-semibold">
                    En stock
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Commandes récentes */}
        <View className="p-5 bg-white shadow-sm rounded-2xl mb-6">
          <Text className="font-semibold text-gray-900 text-lg mb-5">
            Commandes récentes :
          </Text>
          <View className="w-full">
  {/* Livrée */}
  <View className="flex-row justify-between items-center py-3 border-b border-slate-200">
    <View>
      <Text className="text-gray-900 font-medium">#1234</Text>
      <Text className="text-gray-500 text-xs">John Doe</Text>
    </View>

    <View className="w-24 items-center bg-green-100 px-3 py-1 rounded-full">
      <Text className="text-green-700 text-xs font-semibold">
        Livrée
      </Text>
    </View>
  </View>

  {/* En attente */}
  <View className="flex-row justify-between items-center py-3 border-b border-slate-200">
    <View>
      <Text className="text-gray-900 font-medium">#1235</Text>
      <Text className="text-gray-500 text-xs">Jane Smith</Text>
    </View>

    <View className="w-24 items-center bg-yellow-100 px-3 py-1 rounded-full">
      <Text className="text-yellow-700 text-xs font-semibold">
        En attente
      </Text>
    </View>
  </View>

  {/* Non payée */}
  <View className="flex-row justify-between items-center py-3">
    <View>
      <Text className="text-gray-900 font-medium">#1236</Text>
      <Text className="text-gray-500 text-xs">Bob Wilson</Text>
    </View>

    <View className="w-24 items-center bg-red-100 px-3 py-1 rounded-full">
      <Text className="text-red-700 text-xs font-semibold">
        Non payée
      </Text>
    </View>
  </View>
</View>
        </View>

        {/* Statistiques */}
        <View className="p-5 bg-white shadow-sm rounded-2xl">
          <Text className="font-semibold text-gray-900 text-lg mb-5">
            Statistiques :
          </Text>
          <View className="flex-row justify-between w-full gap-4">
            <View className="flex-1 items-center bg-blue-50 p-3 rounded-xl">
              <Text className="text-2xl font-bold text-blue-600">24</Text>
              <Text className="text-gray-600 text-sm">Produits</Text>
            </View>
            <View className="flex-1 items-center bg-green-50 p-3 rounded-xl">
              <Text className="text-2xl font-bold text-green-600">156</Text>
              <Text className="text-gray-600 text-sm">Ventes</Text>
            </View>
            <View className="flex-1 items-center bg-orange-50 p-3 rounded-xl">
              <Text className="text-2xl font-bold text-orange-600">8</Text>
              <Text className="text-gray-600 text-sm">Commandes</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeManagement;

const styles = StyleSheet.create({});
