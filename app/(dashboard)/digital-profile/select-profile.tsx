import { router, useLocalSearchParams } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PageTitle from "../components/PageTitle";
import { getAllProfiles } from "./api/profiles";

export default function SelectProfile() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { username } = useLocalSearchParams();

  const mediaUrl = `${process.env.EXPO_PUBLIC_MEDIA_URL}`;

  useEffect(() => {
    const fetchAllProfiles = async () => {
      setLoading(true);
      try {
        const res = await getAllProfiles();
        setProfiles(res);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProfiles();
  }, [username]);

  if (loading) {
      return (
        <View className="flex-1 items-center justify-center bg-slate-50 px-6">
          <View className="bg-white border border-slate-200 rounded-3xl px-8 py-10 items-center w-full">
            <View className="w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-4">
              <View className="w-8 h-8 rounded-full bg-slate-900 animate-pulse" />
            </View>
  
            <Text className="text-lg font-semibold text-slate-900">
              Chargement des services
            </Text>
  
            <Text className="text-sm text-slate-500 text-center mt-2 leading-5">
              Veuillez patienter pendant la récupération de vos services.
            </Text>
          </View>
        </View>
      );
    }

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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(dashboard)/digital-profile" as any)}
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

        {/* Profile cards */}
        {profiles.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() =>
              router.push(`/digital-profile/management/${item.username}` as any)
            }
            className="w-[48%] bg-white border border-slate-200 rounded-2xl p-4 items-center mb-4"
            style={{ gap: 8, position: "relative" }}
          >
            {/* Active dot */}
            <View
              className="absolute bg-green-400 rounded-full"
              style={{ width: 8, height: 8, top: 12, right: 12 }}
            />

            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                overflow: "hidden",
                backgroundColor: "#e2e8f0",
              }}
            >
              <Image
                source={{ uri: mediaUrl + item.profile_image }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>

            <View className="items-center">
              <Text className="text-sm font-medium text-slate-900">
                {item.title}
              </Text>
              <Text className="text-xs text-slate-400">Digital profile</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
