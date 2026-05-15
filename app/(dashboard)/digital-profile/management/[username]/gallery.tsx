import PageTitle from "@/app/(dashboard)/components/PageTitle";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { deleteImage, getAllGalleries, uploadGalleryImages } from "../../api/gallery";
import DeleteImageModal from "./components/DeleteImageModal";
import Loading from "./components/Loading";
import PaginationExample from "./components/PaginationExample";
import ImageUploader from "./components/UploadImage";

const gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { username } = useLocalSearchParams();

  // DELETE POPUP
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

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

  // HANDLE DELETE IMAGE
  const handleDeleteImage = async () => {
    if (!selectedImage) return;

    try {
      setDeleting(true);

      if (typeof username !== "string") return;

      await deleteImage({
        username,
        imageId: selectedImage.id,
      });

      setImages((prev: any) =>
        prev.filter((image: any) => image.id !== selectedImage.id),
      );

      setDeleteSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteModalClose = () => {
    setDeleteModalVisible(false);
  };

  const handleDeleteSuccessClose = () => {
    setDeleteModalVisible(false);
    setDeleteSuccess(false);
    setSelectedImage(null);
  };

  // UPLOAD IMAGES
  const handleUploadImages = async (assets: any[]) => {
    try {
      if (typeof username !== "string") return;

      await uploadGalleryImages({ username, images: assets });

      const updatedGallery = await getAllGalleries({ username });

      setImages(updatedGallery);
    } catch (error) {
      console.log(error);
    }
  };

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
          <ImageUploader onUpload={handleUploadImages} />
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
            <PaginationExample
              images={images}
              setSelectedImage={setSelectedImage}
              setDeleteModalVisible={setDeleteModalVisible}
            />
          </>
        )}
      </View>
      <DeleteImageModal
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        selectedImage={selectedImage}
        handleDelete={handleDeleteImage}
        deleting={deleting}
        deleteSuccess={deleteSuccess}
        onClose={handleDeleteModalClose}
        onSuccessClose={handleDeleteSuccessClose}
      />
    </ScrollView>
  );
};

export default gallery;

const styles = StyleSheet.create({});
