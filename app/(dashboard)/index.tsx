// import { Image } from "expo-image";
import { User, Users, X } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import PageTitle from "./components/PageTitle";

const Dashboard = () => {
  const imgSource = `${process.env.EXPO_PUBLIC_MEDIA_URL}/public/52/digital_profile/profile_image/c7fe3d8757.webp`;


  return (
    <View className="flex-1 bg-slate-100 px-4 py-8">
      {/* HEADER */}
      <PageTitle title='Accueil' subTitle='Tout est prêt pour vous. Faites un tour et créons de grandes choses ensemble !' />
      {/* CONTENT */}
      <View>
        <View className="p-4 bg-white shadow-lg rounded-2xl">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-900">
              Digital profile
            </Text>
            <TouchableOpacity
              className="
                w-10
                h-10
                rounded-2xl
                bg-slate-100
                items-center
                justify-center
              "
            >
              <X size={20} color="#0f172a" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          {/* profile info */}
          <View>
            <View className="py-5 flex-col items-center justify-center">
              <View className="w-24 h-24 rounded-full overflow-hidden shadow-md">
                <Image
                  source={{ uri: imgSource }}
                  style={{ width: "100%", height: "100%" }}
                  className="object-cover"
                />
              </View>
              <View className="flex-col items-center justify-center">
                <Text className=" mt-3 text-md font-semibold">Yascript</Text>
                <Text className="text-gray-600 text-sm mb-2">
                  Récemment créé •
                </Text>
                <View className="flex-row items-center justify-center bg-green-200 px-3 py-1 rounded-2xl">
                  <View className="w-1.75 h-1.75 rounded-full bg-green-500 mr-2" />
                  <Text className="text-green-800 text-sm">En ligne</Text>
                </View>
              </View>
            </View>
          </View>
          {/* BUTTONS */}
          <View className="items-center justify-center gap-y-1">
            <View className="items-center justify-center mt-1">
              <TouchableOpacity
                activeOpacity={0.85}
                className="
                  w-64
                  flex-row
                  items-center
                  justify-center
                  bg-neutral-900
                  rounded-full
                  py-2.5
                "
              >
                <User size={14} color="#fff" strokeWidth={2.4} />

                <Text
                  className="text-white text-sm font-semibold ml-1.5"
                  style={{
                    letterSpacing: -0.15,
                  }}
                >
                  Ouvrir le profil
                </Text>
              </TouchableOpacity>
            </View>
            <View className="items-center justify-center mt-1">
              <TouchableOpacity
                activeOpacity={0.85}
                className="
                  w-64
                  flex-row
                  items-center
                  justify-center
                  bg-transparent
                  rounded-full
                  py-2.5
                  border
                  border-neutral-300
                "
              >
                <Users size={14} color="#000" strokeWidth={2.4} />

                <Text
                  className="text-black text-sm font-semibold ml-1.5"
                  style={{
                    letterSpacing: -0.15,
                  }}
                >
                  Voir tous les profils
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
