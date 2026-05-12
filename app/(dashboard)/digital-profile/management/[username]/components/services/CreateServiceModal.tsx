import { createService } from "@/app/(dashboard)/digital-profile/api/services";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import {
    CheckCircle,
    ChevronDown,
    ChevronUp,
    ImagePlus,
    X,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
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
};

const pricingOptions = ["Fixed Price", "Starting From", "Hourly Rate"];

const CreateServiceModal = ({
  editModalVisible,
  setEditModalVisible,
}: Props) => {
  const [serviceTitle, setServiceTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [pricingType, setPricingType] = useState("Fixed Price");
  const [showPricingOptions, setShowPricingOptions] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const { username } = useLocalSearchParams();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleScroll = (e: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const atBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    setIsAtBottom(atBottom);
  };

  const handleScrollArrow = () => {
    if (isAtBottom) {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!image) newErrors.image = "Please upload a service image.";
    if (!serviceTitle.trim())
      newErrors.serviceTitle = "Service title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!price.trim()) newErrors.price = "Price is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await createService({
        username: String(username),
        serviceData: {
          title: serviceTitle,
          description,
          price: Number(price),
          show_price: false,
          is_negotiable: false,
          image: image || null,
        },
      });

      setIsSuccess(true);
    } catch (error) {
      console.log("CREATE SERVICE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    setEditModalVisible(false);
    setServiceTitle("");
    setDescription("");
    setPrice("");
    setPricingType("Fixed Price");
    setImage(null);
    setErrors({});
  };

  // POST THE DATA

  return (
    <Modal
      visible={editModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setEditModalVisible(false)}
    >
      <Pressable
        className="flex-1 bg-gray-300/70 items-center justify-center px-4"
        onPress={() => setEditModalVisible(false)}
      >
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full">
          {/* ── SUCCESS STATE ── */}
          {isSuccess ? (
            <View className="bg-white w-full max-h-[500px] rounded-3xl overflow-hidden px-8 py-12 items-center">
              <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-5">
                <CheckCircle size={44} color="#16a34a" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                Service Added!
              </Text>
              <Text className="text-sm text-gray-500 text-center leading-5 mb-8">
                Your service has been successfully added to your profile.
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSuccessClose}
                className="bg-black rounded-2xl py-4 px-10 w-full items-center"
              >
                <Text className="text-white font-bold text-base">OK</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* ── FORM STATE ── */
            <View className="bg-white w-full max-h-[500px] rounded-3xl overflow-hidden">
              {/* Header */}
              <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                <Text className="text-xl font-bold text-gray-900">
                  Ajouter un Service
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setEditModalVisible(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                >
                  <X size={20} color="#111827" />
                </TouchableOpacity>
              </View>

              {/* Scrollable Content */}
              <ScrollView
                ref={scrollRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
                className="max-h-[75vh]"
              >
                {/* Upload */}
                <View className="mb-6">
                  <Text className="text-sm font-semibold text-gray-900 mb-3">
                    Image de service
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={pickImage}
                    style={errors.image ? { borderColor: "#ef4444" } : {}}
                    className="border-2 border-dashed border-gray-300 rounded-3xl h-52 items-center justify-center overflow-hidden bg-gray-50"
                  >
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="items-center">
                        <View className="w-16 h-16 rounded-full bg-black items-center justify-center mb-4">
                          <ImagePlus size={28} color="white" />
                        </View>
                        <Text className="text-base font-semibold text-gray-900">
                          Télécharger une image
                        </Text>
                        <Text className="text-sm text-gray-500 mt-1">
                          1:1 carré recommandé
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  {errors.image && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.image}
                    </Text>
                  )}
                </View>

                {/* Service Title */}
                <View className="mb-5">
                  <Text className="text-sm font-semibold text-gray-900 mb-2">
                    Titre du service
                  </Text>
                  <TextInput
                    value={serviceTitle}
                    onChangeText={(v) => {
                      setServiceTitle(v);
                      setErrors((p) => ({ ...p, serviceTitle: "" }));
                    }}
                    placeholder="e.g. Logo Design"
                    placeholderTextColor="#9CA3AF"
                    style={
                      errors.serviceTitle ? { borderColor: "#ef4444" } : {}
                    }
                    className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-gray-900"
                  />
                  {errors.serviceTitle && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.serviceTitle}
                    </Text>
                  )}
                </View>

                {/* Description */}
                <View className="mb-5">
                  <Text className="text-sm font-semibold text-gray-900 mb-2">
                    Description
                  </Text>
                  <TextInput
                    value={description}
                    onChangeText={(v) => {
                      setDescription(v);
                      setErrors((p) => ({ ...p, description: "" }));
                    }}
                    placeholder="Describe your service..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    textAlignVertical="top"
                    style={errors.description ? { borderColor: "#ef4444" } : {}}
                    className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-gray-900 min-h-[130px]"
                  />
                  {errors.description && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.description}
                    </Text>
                  )}
                </View>

                {/* Pricing */}
                <View className="mb-5">
                  <Text className="text-sm font-semibold text-gray-900 mb-2">
                    Pricing Option
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setShowPricingOptions(!showPricingOptions)}
                    className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 flex-row items-center justify-between"
                  >
                    <Text className="text-gray-900">{pricingType}</Text>
                    <ChevronDown size={18} color="#6B7280" />
                  </TouchableOpacity>
                  {showPricingOptions && (
                    <View className="bg-white border border-gray-200 rounded-2xl mt-2 overflow-hidden">
                      {pricingOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          activeOpacity={0.8}
                          onPress={() => {
                            setPricingType(option);
                            setShowPricingOptions(false);
                          }}
                          className="px-4 py-4 border-b border-gray-100"
                        >
                          <Text className="text-gray-900">{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Price */}
                <View className="mb-7">
                  <Text className="text-sm font-semibold text-gray-900 mb-2">
                    Prix (MAD)
                  </Text>
                  <TextInput
                    value={price}
                    onChangeText={(v) => {
                      setPrice(v);
                      setErrors((p) => ({ ...p, price: "" }));
                    }}
                    placeholder="Saisissez votre prix"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    style={errors.price ? { borderColor: "#ef4444" } : {}}
                    className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-gray-900"
                  />
                  {errors.price && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.price}
                    </Text>
                  )}
                </View>

                {/* WhatsApp */}
                <View className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8">
                  <Text className="text-green-700 font-semibold">
                    WhatsApp connecté
                  </Text>
                  <Text className="text-green-600 text-sm mt-1">
                    Les clients vous contacteront directement.
                  </Text>
                </View>

                {/* Submit */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={loading}
                  onPress={handleSubmit}
                  className="bg-black rounded-2xl py-5 items-center"
                >
                  <Text className="text-white font-bold text-base">
                    {loading ? "Loading..." : "Ajouter un Service"}
                  </Text>
                </TouchableOpacity>
              </ScrollView>

              {/* Scroll Arrow */}
              <TouchableOpacity
                onPress={handleScrollArrow}
                activeOpacity={0.8}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/80 items-center justify-center"
              >
                {isAtBottom ? (
                  <ChevronUp size={20} color="white" />
                ) : (
                  <ChevronDown size={20} color="white" />
                )}
              </TouchableOpacity>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CreateServiceModal;
