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
  Info,
  Italic,
  Link,
  List,
  ListOrdered,
  Plus,
  Table,
  Trash2,
} from "lucide-react-native";

import { getAllCategories } from "@/app/(dashboard)/digital-profile/api/store/categories";
import { getSingleProduct, updateProduct } from "@/app/(dashboard)/digital-profile/api/store/products";
import ImagePickerField from "../components/ImagePickerField";
import UpdateProductModal from "../components/UpdateProductModal";

interface Option {
  id?: number;
  tempId?: string;
  label: string;
}

interface Category {
  id: number;
  name: string;
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

  // Original states to track changes
  const [originalData, setOriginalData] = useState<any>(null);

  // Dropdown states
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const [newImages, setNewImages] = useState<any[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // Modal states
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [shouldGoBack, setShouldGoBack] = useState(false);

  const mediaUrl = process.env.EXPO_PUBLIC_MEDIA_URL;
  const visibilityOptions = ["Caché", "Publié"];

  const resolveImageUri = (path: string) => {
    if (path.startsWith("file://")) return path;
    return `${mediaUrl}${path}`;
  };

  // Function to check if there are any changes
  const hasChanges = () => {
    if (!originalData) return false;

    if (title !== originalData.title) return true;
    if (visible !== originalData.visible) return true;
    if (selectedCategory?.id !== originalData.categoryId) return true;
    if (inStock !== originalData.inStock) return true;
    if (price !== originalData.price) return true;
    if (originPrice !== originalData.originPrice) return true;
    if (description !== originalData.description) return true;
    if (richDescription !== originalData.richDescription) return true;
    if (JSON.stringify(options) !== JSON.stringify(originalData.options)) return true;
    if (images.length !== originalData.imagesCount) return true;
    if (imagesToDelete.length > 0) return true;
    if (newImages.length > 0) return true;
    
    return false;
  };

  const handleAddImage = async (uri: string) => {
    const imageObject = {
      uri: uri,
      name: `product_image_${Date.now()}.jpg`,
      type: "image/jpeg",
    };
    
    setNewImages(prev => [...prev, imageObject]);
    setImages(prev => [...prev, uri]);
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = images[index];
    
    const isExistingImage = imageToRemove.startsWith('/') || imageToRemove.startsWith('http');
    
    if (isExistingImage) {
      const existingImage = product?.images?.find((img: any) => 
        img.image_path === imageToRemove
      );
      
      if (existingImage) {
        setImagesToDelete(prev => [...prev, existingImage.id]);
      }
    } else {
      setNewImages(prev => prev.filter((_, i) => {
        const newImageUri = images.find((img, idx) => idx === index && img.startsWith('file://'));
        return newImageUri !== imageToRemove;
      }));
    }
    
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSaveProduct = async () => {
    if (!hasChanges()) {
      setUpdateSuccess(false);
      setUpdateMessage("Aucune modification détectée. Le produit n'a pas été modifié.");
      setShowUpdateModal(true);
      return;
    }
    
    try {
      setIsSaving(true);
      
      if (!title.trim()) {
        alert("Le titre du produit est requis");
        return;
      }
      
      if (!price || parseFloat(price) <= 0) {
        alert("Le prix du produit est requis et doit être supérieur à 0");
        return;
      }
      
      if (!selectedCategory) {
        alert("Veuillez sélectionner une catégorie");
        return;
      }
      
      const validOptions = options
        .filter(opt => opt.label.trim() !== "")
        .map(opt => ({
          ...(opt.id !== undefined && { id: opt.id }),
          label: opt.label
        }));
      
      const updateData = {
        username: username as string,
        productId: Number(productId),
        name: title,
        visibility: visible === "Publié",
        in_stock: inStock,
        category: selectedCategory.id,
        price: parseFloat(price),
        original_price: originPrice ? parseFloat(originPrice) : undefined,
        description: description,
        rich_description: richDescription,
        options: validOptions,
        imagesToDelete: imagesToDelete,
        images: newImages,
      };
      
      const result = await updateProduct(updateData);
      
      if (result) {
        setUpdateSuccess(true);
        setUpdateMessage("Le produit a été mis à jour avec succès.");
        setShouldGoBack(true);
        setShowUpdateModal(true);
        await fetchProductData();
      }
    } catch (error: any) {
      console.error("Error updating product:", error);
      setUpdateSuccess(false);
      setUpdateMessage(error.message || "Échec de la mise à jour du produit");
      setShouldGoBack(false);
      setShowUpdateModal(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    if (shouldGoBack && updateSuccess) {
      router.back();
    }
  };

  const fetchProductData = async () => {
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
      
      let existingOptions: Option[] = [];
      if (res?.options && Array.isArray(res.options)) {
        existingOptions = res.options.map((opt: any) => ({
          id: opt.id,
          tempId: Date.now().toString() + opt.id,
          label: opt.label
        }));
        setOptions(existingOptions);
      } else {
        setOptions([]);
      }
      
      if (res?.category_id && categories.length > 0) {
        const foundCategory = categories.find(cat => cat.id === res.category_id);
        if (foundCategory) {
          setSelectedCategory(foundCategory);
        }
      }
      
      const existingImages = res?.images?.map((img: any) => img.image_path) || [];
      setImages(existingImages);
      setNewImages([]);
      setImagesToDelete([]);
      
      setOriginalData({
        title: res?.name || "",
        visible: res?.visibility ? "Publié" : "Caché",
        categoryId: res?.category_id,
        inStock: res?.in_stock ?? true,
        price: String(res?.price || ""),
        originPrice: String(res?.original_price || ""),
        description: res?.description || "",
        richDescription: res?.rich_description || "",
        options: existingOptions,
        imagesCount: res?.images?.length || 0,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOption = () =>
    setOptions((prev) => [...prev, { 
      tempId: Date.now().toString(), 
      label: "" 
    }]);

  const handleRemoveOption = (tempId: string) =>
    setOptions((prev) => prev.filter((o) => o.tempId !== tempId));

  const handleOptionChange = (tempId: string, value: string) =>
    setOptions((prev) =>
      prev.map((o) => (o.tempId === tempId ? { ...o, label: value } : o))
    );

  // Fetch categories
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

  // Fetch product
  useEffect(() => {
    if (categories.length > 0) {
      fetchProductData();
    }
  }, [username, productId, categories]);

  if (loading && !product) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const hasNoChanges = !hasChanges();

  return (
    <>
      <ScrollView className="flex-1 bg-gray-50" keyboardShouldPersistTaps="handled">
        {/* HEADER */}
        <View className="flex-row items-center justify-between px-4 pt-4 bg-white pb-4">
          <View className="flex-row items-center gap-4 flex-1">
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
              {product?.name || "Modifier le produit"}
            </Text>
          </View>
          
          {/* Warning icon when no changes */}
          {hasNoChanges && (
            <View className="flex-row items-center gap-1 bg-amber-50 px-3 py-2 rounded-full">
              <Info size={16} color="#D97706" />
              <Text className="text-amber-600 text-xs font-medium">
                Aucune modification
              </Text>
            </View>
          )}
        </View>

        <View className="px-4 pb-10">
          {/* SECTION 1: Titre / Visibilité / Catégorie / En stock */}
          <View className="mt-4 bg-white p-4 rounded-2xl shadow-sm">
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

            <View className="flex-row gap-2.5 mt-4">
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

            <View className="flex-row items-center gap-2 mt-4">
              <Switch
                value={inStock}
                onValueChange={setInStock}
                trackColor={{ false: "#D1D5DB", true: "#111827" }}
                thumbColor="#fff"
              />
              <Text className="text-sm text-gray-700">En stock</Text>
            </View>
          </View>

          {/* SECTION 2: Tarification */}
          <View className="mt-4 bg-white p-4 rounded-2xl shadow-sm">
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

          {/* SECTION 3: Description courte */}
          <View className="mt-4 bg-white p-4 rounded-2xl shadow-sm">
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

          {/* SECTION 4: Description détaillée */}
          <View className="mt-4 bg-white p-4 rounded-2xl shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 mb-2.5">
              Description détaillée
            </Text>

            <View className="border border-gray-200 rounded-lg overflow-hidden">
              <View className="flex-row bg-gray-50 border-b border-gray-200 px-1">
                {["File", "Edit", "View", "Insert", "Format", "Tools", "Table"].map((item) => (
                  <TouchableOpacity key={item} className="px-2 py-1.5">
                    <Text className="text-xs text-gray-700">{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>

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

          {/* SECTION 5: Images */}
          <View className="mt-4 bg-white p-4 rounded-2xl shadow-sm">
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

          {/* SECTION 6: Options */}
          <View className="mt-4 bg-white p-4 rounded-2xl shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 mb-2.5">
              Options
            </Text>

            {options.map((opt) => (
              <View key={opt.tempId} className="flex-row items-center gap-2 mb-2">
                <TextInput
                  value={opt.label}
                  onChangeText={(v) => handleOptionChange(opt.tempId || String(opt.id), v)}
                  placeholder="Nom de l'option"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900"
                />
                <TouchableOpacity
                  onPress={() => handleRemoveOption(opt.tempId || String(opt.id))}
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

          {/* SAVE BUTTON */}
          <TouchableOpacity 
            onPress={handleSaveProduct}
            disabled={isSaving}
            className={`mt-6 mb-10 rounded-2xl py-4 items-center ${
              hasNoChanges 
                ? 'bg-gray-300' 
                : isSaving 
                  ? 'bg-gray-400' 
                  : 'bg-gray-900'
            }`}
          >
            <Text className="text-white text-base font-semibold">
              {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Update Product Modal */}
      <UpdateProductModal
        visible={showUpdateModal}
        onClose={handleUpdateModalClose}
        success={updateSuccess}
        message={updateMessage}
      />
    </>
  );
};

export default SingleProduct;