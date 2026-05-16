import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import * as ImagePicker from "expo-image-picker";

import { ArrowLeft, ImagePlus } from "lucide-react-native";

import { getSingleProduct } from "@/app/(dashboard)/digital-profile/api/store/products";

const SingleProduct = () => {
  const { productId, username } = useLocalSearchParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const mediaUrl = process.env.EXPO_PUBLIC_MEDIA_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      try {
        if (typeof username !== "string") return;

        if (typeof productId !== "string") return;

        const numberId = Number(productId);

        if (isNaN(numberId)) return;

        const res = await getSingleProduct({
          username,
          productId: numberId,
        });

        setProduct(res);

        setTitle(res?.name || "");
        setPrice(String(res?.price || ""));
        setDescription(res?.description || "");

        const existingImage = res?.images?.[0]?.image_path || null;

        setImage(existingImage);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [username, productId]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const imageUri = image
    ? image.startsWith("file://")
      ? image
      : `${mediaUrl}${image}`
    : undefined;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* HEADER */}
      <View className="flex-row items-center gap-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-gray-900 w-11 h-11 rounded-2xl items-center justify-center shadow-md"
        >
          <ArrowLeft size={27} color="white" />
        </TouchableOpacity>

        <Text
          className="text-xl text-gray-800 font-bold flex-1"
          numberOfLines={1}
        >
          {product?.name}
        </Text>
      </View>

      {/* CONTENT */}
      <View className="mt-6 bg-white p-4 rounded-2xl shadow-md">
        {/* IMAGE PICKER */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-900 mb-3">
            Product Image
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={pickImage}
            className="border-2 border-dashed border-gray-300 rounded-3xl h-72 items-center justify-center overflow-hidden bg-gray-50"
          >
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center">
                <View className="w-16 h-16 rounded-full bg-black items-center justify-center mb-4">
                  <ImagePlus size={28} color="white" />
                </View>

                <Text className="text-base font-semibold text-gray-900">
                  Upload Product Image
                </Text>

                <Text className="text-sm text-gray-500 mt-1">
                  1:1 square recommended
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* PRODUCT INFO */}
        <View className="gap-y-5">
          {/* TITLE */}
          <View>
            <Text className="text-xs uppercase text-gray-400 mb-2">
              Product Name
            </Text>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Product title"
              placeholderTextColor="#9CA3AF"
              className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-gray-900"
            />
          </View>

          {/* PRICE */}
          <View>
            <Text className="text-xs uppercase text-gray-400 mb-2">Price</Text>

            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="Product price"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-gray-900"
            />
          </View>

          {/* DESCRIPTION */}
          <View>
            <Text className="text-xs uppercase text-gray-400 mb-2">
              Description
            </Text>

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Product description"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-gray-900 min-h-[140px]"
            />
          </View>
        </View>
      </View>

      
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({});
