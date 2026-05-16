import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Bold,
  ChevronDown,
  Code,
  Italic,
  Link,
  List,
  ListOrdered,
  Plus,
  Table,
  Trash2,
} from "lucide-react-native";

import { getAllCategories } from "@/app/(dashboard)/digital-profile/api/store/categories";
import { getSingleProduct } from "@/app/(dashboard)/digital-profile/api/store/products";
import ImagePickerField from "../components/ImagePickerField";

interface Option {
  id: string;
  label: string;
}

interface Category {
  id: number;
  name: string;
  // add other category fields as needed
}

const SingleProduct = () => {
  const { productId, username } = useLocalSearchParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [visible, setVisible] = useState("Caché");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [inStock, setInStock] = useState(true);
  const [price, setPrice] = useState("");
  const [originPrice, setOriginPrice] = useState("");
  const [description, setDescription] = useState("");
  const [richDescription, setRichDescription] = useState("");
  const [options, setOptions] = useState<Option[]>([]);

  // Dropdown states
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const mediaUrl = process.env.EXPO_PUBLIC_MEDIA_URL;

  // Options for select inputs
  const visibilityOptions = ["Caché", "Publié"];

  const resolveImageUri = (path: string) => {
    if (path.startsWith("file://")) return path;
    return `${mediaUrl}${path}`;
  };

  const handleAddImage = (uri: string) => setImages((prev) => [...prev, uri]);

  const handleRemoveImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const handleAddOption = () =>
    setOptions((prev) => [...prev, { id: Date.now().toString(), label: "" }]);

  const handleRemoveOption = (id: string) =>
    setOptions((prev) => prev.filter((o) => o.id !== id));

  const handleOptionChange = (id: string, value: string) =>
    setOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, label: value } : o)),
    );

  // First, fetch categories
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        if (typeof username !== "string") return;
        const res = await getAllCategories({ username });
        setCategories(res);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchAllCategories();
  }, [username]);

  // Then fetch product and set the category
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (typeof username !== "string") return;
        if (typeof productId !== "string") return;
        const numberId = Number(productId);
        if (isNaN(numberId)) return;

        const res = await getSingleProduct({ username, productId: numberId });
        setProduct(res);
        setTitle(res?.name || "");
        setPrice(String(res?.price || ""));
        setOriginPrice(String(res?.original_price || ""));
        setDescription(res?.description || "");
        setRichDescription(res?.rich_description || "");
        setInStock(res?.in_stock ?? true);
        setVisible(res?.visibility ? "Publié" : "Caché");
        
        // Set the category based on category_id from API response
        if (res?.category_id && categories.length > 0) {
          const foundCategory = categories.find(cat => cat.id === res.category_id);
          if (foundCategory) {
            setSelectedCategory(foundCategory);
          }
        }
        
        const existingImages =
          res?.images?.map((img: any) => img.image_path) || [];
        setImages(existingImages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchProduct();
    }
  }, [username, productId, categories]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
      {/* HEADER */}
      <View className="flex-row items-center gap-4 px-4 pt-4">
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

      <View className="px-4">
        {/* ── SECTION 1: Titre / Visibilité / Catégorie / En stock ── */}
        <View className="mt-6 bg-white p-4 rounded-2xl shadow-md">
          {/* Titre */}
          <Text className="text-base font-medium text-gray-700 mb-1">
            Titre <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Titre du produit"
            placeholderTextColor="#9CA3AF"
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900"
          />

          {/* Visibilité + Catégorie */}
          <View className="flex-row gap-2.5 mt-3">
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-700 mb-1">
                Visibilité <Text className="text-red-500">*</Text>
              </Text>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setShowVisibilityDropdown(!showVisibilityDropdown);
                    setShowCategoryDropdown(false);
                  }}
                  className="border border-gray-200 rounded-lg px-3 py-2.5 flex-row justify-between items-center"
                >
                  <Text className="text-sm text-gray-900">{visible}</Text>
                  <ChevronDown size={16} color="#6B7280" />
                </TouchableOpacity>

                {showVisibilityDropdown && (
                  <View className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {visibilityOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => {
                          setVisible(option);
                          setShowVisibilityDropdown(false);
                        }}
                        className="px-3 py-2.5 border-b border-gray-100"
                      >
                        <Text className="text-sm text-gray-900">{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View className="flex-[1.3]">
              <Text className="text-base font-medium text-gray-700 mb-1">
                Catégorie
              </Text>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowVisibilityDropdown(false);
                  }}
                  className="border border-gray-200 rounded-lg px-3 py-2.5 flex-row justify-between items-center"
                >
                  <Text className="text-sm text-gray-900">
                    {selectedCategory ? selectedCategory.name : "Sélectionner une catégorie"}
                  </Text>
                  <ChevronDown size={16} color="#6B7280" />
                </TouchableOpacity>

                {showCategoryDropdown && (
                  <View className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64">
                    <ScrollView nestedScrollEnabled={true}>
                      {categories.length === 0 ? (
                        <TouchableOpacity className="px-3 py-2.5">
                          <Text className="text-sm text-gray-500">
                            Chargement des catégories...
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        categories.map((cat) => (
                          <TouchableOpacity
                            key={cat.id}
                            onPress={() => {
                              setSelectedCategory(cat);
                              setShowCategoryDropdown(false);
                            }}
                            className={`px-3 py-2.5 border-b border-gray-100 ${
                              selectedCategory?.id === cat.id ? "bg-gray-50" : ""
                            }`}
                          >
                            <Text 
                              className={`text-sm ${
                                selectedCategory?.id === cat.id 
                                  ? "text-gray-900 font-semibold" 
                                  : "text-gray-900"
                              }`}
                            >
                              {cat.name}
                            </Text>
                          </TouchableOpacity>
                        ))
                      )}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* En stock */}
          <View className="flex-row items-center gap-2 mt-3">
            <Switch
              value={inStock}
              onValueChange={setInStock}
              trackColor={{ false: "#D1D5DB", true: "#111827" }}
              thumbColor="#fff"
            />
            <Text className="text-sm text-gray-700">En stock</Text>
          </View>
        </View>

        {/* ── SECTION 2: Tarification ── */}
        <View className="mt-3 bg-white p-4 rounded-2xl shadow-md">
          <Text className="text-lg font-semibold text-gray-900 mb-2.5">
            Tarification
          </Text>
          <View className="flex-row gap-2.5">
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-700 mb-1">
                Prix (MAD) <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="0"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900"
              />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-700 mb-1">
                Prix d'origine (MAD)
              </Text>
              <TextInput
                value={originPrice}
                onChangeText={setOriginPrice}
                placeholder="0"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900"
              />
            </View>
          </View>
        </View>

        {/* ── SECTION 3: Description courte ── */}
        <View className="mt-3 bg-white p-4 rounded-2xl shadow-md">
          <Text className="text-lg font-semibold text-gray-900 mb-2.5">
            Description courte
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Courte description du produit…"
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 h-20"
          />
        </View>

        {/* ── SECTION 4: Description détaillée ── */}
        <View className="mt-3 bg-white p-4 rounded-2xl shadow-md">
          <Text className="text-lg font-semibold text-gray-900 mb-2.5">
            Description détaillée
          </Text>

          <View className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Menu bar */}
            <View className="flex-row bg-gray-50 border-b border-gray-200 px-1">
              {[
                "File",
                "Edit",
                "View",
                "Insert",
                "Format",
                "Tools",
                "Table",
              ].map((item) => (
                <TouchableOpacity key={item} className="px-2 py-1.5">
                  <Text className="text-lg text-gray-700">{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Toolbar */}
            <View className="flex-row items-center bg-gray-50 border-b border-gray-200 px-1.5 py-1 gap-0.5">
              <TouchableOpacity className="w-7 h-7 items-center justify-center rounded">
                <Text className="text-sm text-gray-700">↩</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-7 h-7 items-center justify-center rounded">
                <Text className="text-sm text-gray-700">↪</Text>
              </TouchableOpacity>
              <View className="w-px h-4 bg-gray-300 mx-1" />
              <TouchableOpacity className="w-7 h-7 items-center justify-center rounded">
                <Bold size={14} color="#374151" />
              </TouchableOpacity>
              <TouchableOpacity className="w-7 h-7 items-center justify-center rounded">
                <Italic size={14} color="#374151" />
              </TouchableOpacity>
              <View className="w-px h-4 bg-gray-300 mx-1" />
              <TouchableOpacity className="w-7 h-7 items-center justify-center rounded">
                <List size={14} color="#374151" />
              </TouchableOpacity>
              <TouchableOpacity className="w-7 h-7 items-center justify-center rounded">
                <ListOrdered size={14} color="#374151" />
              </TouchableOpacity>
              <View className="w-px h-4 bg-gray-300 mx-1" />
              <TouchableOpacity className="w-7 h-7 items-center justify-center rounded">
                <Link size={14} color="#374151" />
              </TouchableOpacity>
              <TouchableOpacity className="w-7 h-7 items-center justify-center rounded">
                <Code size={14} color="#374151" />
              </TouchableOpacity>
              <TouchableOpacity className="w-7 h-7 items-center justify-center rounded">
                <Table size={14} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Text area */}
            <TextInput
              value={richDescription}
              onChangeText={setRichDescription}
              placeholder="Rédigez une description détaillée…"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              className="min-h-44 p-3 text-sm text-gray-900 bg-white"
            />
          </View>
        </View>

        {/* ── SECTION 5: Images ── */}
        <View className="mt-3 bg-white p-4 rounded-2xl shadow-md">
          <Text className="text-lg font-semibold text-gray-900 mb-2.5">
            Images
          </Text>
          <ImagePickerField
            images={images}
            onAdd={handleAddImage}
            onRemove={handleRemoveImage}
            resolveUri={resolveImageUri}
            showMainBadge={true}
            size={96}
            aspect={[1, 1]}
            quality={0.8}
            hint="Faites glisser un fichier ici ou cliquez pour en sélectionner un\nLe fichier ne doit pas dépasser 10 Mo. Le format recommandé est 1:1"
          />
        </View>

        {/* ── SECTION 6: Options ── */}
        <View className="mt-3 bg-white p-4 rounded-2xl shadow-md">
          <Text className="text-lg font-semibold text-gray-900 mb-2.5">
            Options
          </Text>

          {options.map((opt) => (
            <View key={opt.id} className="flex-row items-center gap-2 mb-2">
              <TextInput
                value={opt.label}
                onChangeText={(v) => handleOptionChange(opt.id, v)}
                placeholder="Nom de l'option"
                placeholderTextColor="#9CA3AF"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900"
              />
              <TouchableOpacity
                onPress={() => handleRemoveOption(opt.id)}
                className="w-9 h-9 items-center justify-center"
              >
                <Trash2 size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            onPress={handleAddOption}
            className="flex-row items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2.5 mt-1"
          >
            <Plus size={16} color="#374151" />
            <Text className="text-sm text-gray-700">Ajouter une option</Text>
          </TouchableOpacity>
        </View>

        {/* ── SAVE BUTTON ── */}
        <TouchableOpacity className="mt-4 mb-10 bg-gray-900 rounded-2xl py-4 items-center">
          <Text className="text-white text-sm font-semibold">
            Enregistrer les modifications
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SingleProduct;