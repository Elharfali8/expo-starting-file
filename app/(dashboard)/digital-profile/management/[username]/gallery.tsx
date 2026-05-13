import PageTitle from "@/app/(dashboard)/components/PageTitle";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getAllGalleries } from "../../api/gallery";
import Loading from "./components/Loading";
import PaginationExample from "./components/PaginationExample";
import ImageUploader from "./components/UploadImage";

const gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { username } = useLocalSearchParams();

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      try {
        if (typeof username !== "string") return;
        const res = await getAllGalleries({ username });
        setImages(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, [username]);

  return (
    <ScrollView
      className="flex-1 bg-slate-50 mb-26"
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pt-4 pb-8">
        <PageTitle
          title="Ma galerie"
          subTitle="Téléchargez, gérez et organisez vos images. Vous pouvez ajouter jusqu'à 10 images par téléchargement, chacune d'un maximum de 10 Mo."
        />

        {/*  */}
        <View>
          <ImageUploader onUpload={() => console.log("done")} />
        </View>

        {/*  */}
        {loading ? (
          <Loading />
        ) : (
          <>
            <View className="mt-6">
              <View className="flex-row items-center gap-4 mb-4">
                <View className="flex-1 h-px bg-slate-200" />

                <Text className="text-slate-800 font-semibold text-lg">
                  Images
                </Text>

                <View className="flex-1 h-px bg-slate-200" />
              </View>

              <Text className="text-center text-slate-500 leading-6 text-sm px-2">
                Parcourez toutes les images que vous avez téléchargées. Cliquez
                sur une image pour l’afficher en grand ou la supprimer de votre
                galerie.
              </Text>
            </View>

            {/* pagination */}
            <PaginationExample images={images} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default gallery;

const styles = StyleSheet.create({});
