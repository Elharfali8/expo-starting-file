import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useMemo, useState } from "react";

import { useLocalSearchParams } from "expo-router";
import { Pencil, Plus, Trash } from "lucide-react-native";
import PageTitle from "../../../components/PageTitle";
import { getServices, Service } from "../../api/services";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const { username } = useLocalSearchParams();

  const mediaUrl = process.env.EXPO_PUBLIC_MEDIA_URL;

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);

      try {
        if (typeof username !== "string") return;
        const res = await getServices({ username });
        setServices(res);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchServices();
    }
  }, [username]);

  const ITEMS_PER_PAGE = 4;

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);

const paginatedServices = useMemo(() => {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  return services.slice(start, end);
}, [page, services]);

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

if (!loading && services.length === 0) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 px-6">
      <View className="bg-white border border-slate-200 rounded-3xl px-8 py-10 items-center w-full">
        <View className="w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-4">
          <Plus size={28} color="#0f172a" />
        </View>

        <Text className="text-xl font-semibold text-slate-900">
          Aucun service
        </Text>

        <Text className="text-sm text-slate-500 text-center mt-2 leading-5">
          Vous n’avez encore ajouté aucun service à votre profil.
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          className="mt-6 bg-slate-900 px-6 py-4 rounded-2xl"
        >
          <Text className="text-white font-semibold">
            Ajouter un service
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

  return (
    <ScrollView
      className="flex-1 bg-slate-50 mb-26"
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pt-4 pb-8">
        <PageTitle
          title="Mes services"
          subTitle="Gérez vos services ici. Ce que vous ajoutez sera affiché sur votre profil public."
        />

        {/* ADD BUTTON */}
        <View className="mt-6">
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-slate-900 rounded-2xl py-4 flex-row items-center justify-center gap-2"
          >
            <Plus color="white" size={20} />

            <Text className="text-white font-semibold">Ajouter un service</Text>
          </TouchableOpacity>
        </View>

        {/* SERVICES */}
        <View className="mt-6 gap-4">
          {paginatedServices.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <Image
                source={{ uri: mediaUrl + item.image_path }}
                className="w-full h-48"
                resizeMode="cover"
              />

              <View className="p-5">
                <Text className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </Text>

                <Text className="text-slate-500 leading-6">
                  {item.description}
                </Text>

                <View className="flex-row items-center gap-x-2 mt-2">
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="flex-1 flex-row items-center justify-center gap-2 bg-green-300 text-white h-12 rounded-xl"
                  >
                    <Pencil size={18} color="green" />
                    <Text className="font-medium capitalize text-lg text-green-800">
                      modifier
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-red-400 h-12 w-12 items-center justify-center rounded-xl"
                  >
                    <Trash size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* PAGINATION */}
        <View className="flex-row items-center justify-center gap-3 mt-6">
          <TouchableOpacity
            disabled={page === 1}
            onPress={() => setPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded-xl ${
              page === 1 ? "bg-slate-200" : "bg-slate-900"
            }`}
          >
            <Text
              className={`font-medium ${
                page === 1 ? "text-slate-400" : "text-white"
              }`}
            >
              Prev
            </Text>
          </TouchableOpacity>

          <View className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
            <Text className="font-semibold text-slate-800">
              {page} / {totalPages}
            </Text>
          </View>

          <TouchableOpacity
            disabled={page === totalPages}
            onPress={() => setPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded-xl ${
              page === totalPages ? "bg-slate-200" : "bg-slate-900"
            }`}
          >
            <Text
              className={`font-medium ${
                page === totalPages ? "text-slate-400" : "text-white"
              }`}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Services;

const styles = StyleSheet.create({});
