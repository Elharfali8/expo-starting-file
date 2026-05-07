import { environment } from "@/environments/environment";
import { Link } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PageTitle from "../components/PageTitle";

export default function SelectProfile() {
  const profiles: any[] = [
    {
      id: 1,
      title: "yascript",
      image: `${process.env.EXPO_PUBLIC_MEDIA_URL}/public/52/digital_profile/profile_image/c7fe3d8757.webp`,
    },
    {
      id: 2,
      title: "kasbah grill",
      image: `${process.env.EXPO_PUBLIC_MEDIA_URL}/public/52/digital_profile/profile_image/ca5dd9dc37.webp`,
    },
    {
      id: 3,
      title: "6eme",
      image: `${process.env.EXPO_PUBLIC_MEDIA_URL}/public/138/digital_profile/profile_image/89363bf51a.webp`,
    },
  ];

  const imageSrc = profiles[0].image;

  console.log(imageSrc);

  return (
    <ScrollView className="flex-1 bg-slate-100 px-4 py-8">
      {/* Header */}
      <PageTitle
        title="Gérer les profils"
        subTitle="Choisissez un profil pour vous connecter ou créez-en un nouveau !"
      />
      {/* Content */}
      <View className="mt-6 flex-row flex-wrap justify-between">

  {/* Add card */}
  <Link href="/" asChild>
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-[48%] bg-white border border-slate-200 rounded-2xl p-4 items-center mb-4"
      style={{ gap: 8 }}
    >
      <View
        className="rounded-full border border-dashed border-green-500 bg-green-50 items-center justify-center"
        style={{ width: 72, height: 72 }}
      >
        <Plus size={24} color="#16a34a" />
      </View>
      <View className="items-center">
        <Text className="text-sm font-medium text-slate-900">Ajouter</Text>
        <Text className="text-xs text-slate-400">Nouveau profil</Text>
      </View>
    </TouchableOpacity>
  </Link>

  {/* Profile cards */}
  {profiles.map((item) => (
    <Link key={item.id} href="/" asChild>
      <TouchableOpacity
        activeOpacity={0.8}
        className="w-[48%] bg-white border border-slate-200 rounded-2xl p-4 items-center mb-4"
        style={{ gap: 8, position: 'relative' }}
      >
        {/* Active dot */}
        <View
          className="absolute bg-green-400 rounded-full"
          style={{ width: 8, height: 8, top: 12, right: 12 }}
        />

        <View className="shadow-md"
          style={{ width: 72, height: 72, borderRadius: 36, overflow: 'hidden', backgroundColor: '#e2e8f0' }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        <View className="items-center">
          <Text className="text-sm font-medium text-slate-900">{item.title}</Text>
          <Text className="text-xs text-slate-400">Digital profile</Text>
        </View>
      </TouchableOpacity>
    </Link>
  ))}

</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
