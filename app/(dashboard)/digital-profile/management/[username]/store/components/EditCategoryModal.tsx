import { updateCategory } from "@/app/(dashboard)/digital-profile/api/store/categories";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import {
    CheckCircle,
    ChevronDown,
    ChevronUp,
    ImagePlus,
    X,
} from "lucide-react-native";

import React, { useEffect, useRef, useState } from "react";

import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  editModalVisible: boolean;
  setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  category: any;
};

const visibilityOptions = [
  {
    label: "Visible",
    value: true,
  },
  {
    label: "Masqué",
    value: false,
  },
];

const EditCategoryModal = ({
  editModalVisible,
  setEditModalVisible,
  category,
}: Props) => {
  const mediaUrl = process.env.EXPO_PUBLIC_MEDIA_URL;

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [visibility, setVisibility] = useState(true);

  const [image, setImage] = useState("");

  useEffect(() => {
    if (!category) return;

    setTitle(category.name || "");

    setDescription(category.description || "");

    setVisibility(category.visibility);

    setImage(category.image_path || "");
  }, [category]);

  const [showVisibilityOptions, setShowVisibilityOptions] = useState(false);

  const [loading, setLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const { username } = useLocalSearchParams();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Le titre est requis.";
    }

    if (!description.trim()) {
      newErrors.description = "La description est requise.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleScroll = (e: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;

    const atBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    setIsAtBottom(atBottom);
  };

  const handleScrollArrow = () => {
    if (isAtBottom) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else {
      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    }
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await updateCategory({
        categoryId: category.id,
        username: String(username),
        categoryData: {
          image,
          name: title,
          visibility,
          description,
        },
      });

      setIsSuccess(true);
    } catch (error) {
      console.log("UPDATE CATEGORY ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEditModalVisible(false);
  };

  return (
    <Modal
      visible={editModalVisible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <Pressable
        className="flex-1 bg-gray-300/70 items-center justify-center px-4"
        onPress={handleClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full">
          {isSuccess ? (
            <View className="bg-white w-full max-h-[500px] rounded-3xl overflow-hidden px-8 py-12 items-center">
              <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-5">
                <CheckCircle size={44} color="#16a34a" />
              </View>

              <Text className="text-2xl font-bold text-gray-900 mb-2">
                Catégorie modifiée
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleClose}
                className="bg-black rounded-2xl py-4 px-10 w-full items-center"
              >
                <Text className="text-white font-bold">OK</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="bg-white w-full max-h-[500px] rounded-3xl overflow-hidden">
              <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                <Text className="text-xl font-bold text-gray-900">
                  Modifier la catégorie
                </Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleClose}
                  className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                >
                  <X size={20} color="#111827" />
                </TouchableOpacity>
              </View>

              <ScrollView
                ref={scrollRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  padding: 24,
                  paddingBottom: 40,
                }}
                className="max-h-[75vh]"
              >
                {/* IMAGE */}
                <View className="mb-6">
                  <Text className="text-sm font-semibold text-gray-900 mb-3">
                    Image
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={pickImage}
                    className="border-2 border-dashed border-gray-300 rounded-3xl h-52 items-center justify-center overflow-hidden bg-gray-50"
                  >
                    {image ? (
                      <Image
                        source={{
                          uri: image.startsWith("file")
                            ? image
                            : mediaUrl + image,
                        }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="items-center">
                        <View className="w-16 h-16 rounded-full bg-black items-center justify-center mb-4">
                          <ImagePlus size={28} color="white" />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>

                {/* TITLE */}
                <View className="mb-5">
                  <Text className="text-sm font-semibold text-gray-900 mb-2">
                    Nom
                  </Text>

                  <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Nom"
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-gray-900"
                  />
                </View>

                {/* VISIBILITY */}
                <View className="mb-5">
                  <Text className="text-sm font-semibold text-gray-900 mb-2">
                    Visibilité
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      setShowVisibilityOptions(!showVisibilityOptions)
                    }
                    className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 flex-row items-center justify-between"
                  >
                    <Text className="text-gray-900">
                      {visibility ? "Visible" : "Masqué"}
                    </Text>

                    <ChevronDown size={18} color="#6B7280" />
                  </TouchableOpacity>

                  {showVisibilityOptions && (
                    <View className="bg-white border border-gray-200 rounded-2xl mt-2 overflow-hidden">
                      {visibilityOptions.map((option) => (
                        <TouchableOpacity
                          key={option.label}
                          activeOpacity={0.8}
                          onPress={() => {
                            setVisibility(option.value);
                            setShowVisibilityOptions(false);
                          }}
                          className="px-4 py-4 border-b border-gray-100"
                        >
                          <Text className="text-gray-900">{option.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* DESCRIPTION */}
                <View className="mb-7">
                  <Text className="text-sm font-semibold text-gray-900 mb-2">
                    Description
                  </Text>

                  <TextInput
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                    placeholder="Description..."
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-gray-900 min-h-[130px]"
                  />
                </View>

                {/* SUBMIT */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={loading}
                  onPress={handleUpdate}
                  className="bg-black rounded-2xl py-5 items-center"
                >
                  <Text className="text-white font-bold text-base">
                    {loading ? "Chargement..." : "Modifier la catégorie"}
                  </Text>
                </TouchableOpacity>
              </ScrollView>

              <TouchableOpacity
                onPress={handleScrollArrow}
                activeOpacity={0.8}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/80 items-center justify-center"
              >
                {isAtBottom ? (
                  <View className="bg-black p-2 rounded-full border border-white">
                    <ChevronUp size={20} color="white" />
                  </View>
                ) : (
                  <View className="bg-black p-2 rounded-full border border-white">
                    <ChevronDown size={20} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditCategoryModal;
