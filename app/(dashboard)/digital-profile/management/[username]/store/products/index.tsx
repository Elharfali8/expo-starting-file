import { getAllCategories } from "@/app/(dashboard)/digital-profile/api/store/categories";
import { getAllProducts } from "@/app/(dashboard)/digital-profile/api/store/products";
import { useLocalSearchParams } from "expo-router";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Plus,
  Search,
  X,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "../components/ProductCard";

const Store = () => {
  const { username } = useLocalSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Filter states
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [tempCategory, setTempCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");

  // Modal scroll states
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

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

  // Categories
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        setLoading(true);
        if (typeof username !== "string") return;
        const res = await getAllCategories({ username });
        // Add "Tout" as the first category item
        const categoriesWithAll = [
          {
            id: "all",
            name: "all",
            label: "Tous les produits",
            image_path: null,
            isAll: true,
          },
          ...res.map((cat: any) => ({
            ...cat,
            label: cat.name,
            isAll: false,
          })),
        ];
        setCategories(categoriesWithAll);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCategories();
  }, [username]);

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Apply filters when they change
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        if (typeof username !== "string") return;
        const res = await getAllProducts({
          username,
          page: currentPage,
          limit: 6,
          search: search,
          category: selectedCategory ?? undefined,// ← replaces the "all" check
          minPrice: minPrice ? parseFloat(minPrice) : undefined,
          maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        });
        console.log("Products fetched:", res);
        setProducts(res.products);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [username, currentPage, search, selectedCategory, minPrice, maxPrice]);

  const getVisiblePages = () => {
    const delta = 1;
    const range: (number | string)[] = [];
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    if (start > 1) range.push(1);
    if (start > 2) range.push("...");
    for (let i = start; i <= end; i++) range.push(i);
    if (end < totalPages - 1) range.push("...");
    if (end < totalPages) range.push(totalPages);

    return range;
  };

  const [isScrollable, setIsScrollable] = useState(false);
  const scrollContentHeight = useRef(0);
  const scrollContainerHeight = useRef(0);

  const checkScrollable = () => {
    setIsScrollable(
      scrollContentHeight.current > scrollContainerHeight.current,
    );
  };

  const hasActiveFilters =
    selectedCategory !== null || minPrice !== "" || maxPrice !== "";

  // Helper function to get full image URL
  const getFullImageUrl = (imagePath: string | null): string | undefined => {
    if (!imagePath) return undefined;
    // Adjust this based on your API base URL
    const baseUrl = process.env.EXPO_PUBLIC_MEDIA_URL;
    return `${baseUrl}${imagePath}`;
  };

  return (
    <View>
      {/* ADD BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-slate-900 rounded-2xl py-4 flex-row items-center justify-center gap-2"
      >
        <Plus color="white" size={20} />
        <Text className="text-white font-semibold">Ajouter un produit</Text>
      </TouchableOpacity>

      {/* CONTENT */}
      <View className="bg-white shadow-md rounded-2xl p-4 mt-4">
        {/* Search */}
        <View className="flex-row items-center gap-3">
          <View className="flex-1 relative">
            <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-2 h-12 shadow-sm">
              <Search size={20} color="#6B7280" style={{ marginRight: 10 }} />
              <TextInput
                placeholder="Recherche"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-[15px] text-black"
                value={searchInput}
                onChangeText={setSearchInput}
              />
            </View>
          </View>
          {/* Filter Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setTempCategory(selectedCategory);
              setTempMinPrice(minPrice);
              setTempMaxPrice(maxPrice);
              setModalVisible(true);
              // Reset scroll state when opening modal
              setIsAtBottom(false);
            }}
            className="h-12 px-3 bg-black rounded-2xl items-center justify-center flex-row gap-2 shadow-sm"
          >
            <Filter size={18} color="white" />
            <Text className="text-white font-semibold text-sm">Filters</Text>
            {hasActiveFilters && (
              <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            )}
          </TouchableOpacity>
        </View>

        {/* Active filters display */}
        {hasActiveFilters && (
          <View className="flex-row flex-wrap gap-2 mt-3">
            {selectedCategory && (
              <View className="bg-blue-100 px-3 py-1 rounded-full flex-row items-center gap-2">
                <Text className="text-blue-700 text-xs">
                  Cat: {
  categories.find(c => c.id === selectedCategory)?.label
}
                </Text>
                <TouchableOpacity onPress={() => setSelectedCategory("")}>
                  <X size={14} color="#1D4ED8" />
                </TouchableOpacity>
              </View>
            )}
            {minPrice && (
              <View className="bg-green-100 px-3 py-1 rounded-full flex-row items-center gap-2">
                <Text className="text-green-700 text-xs">
                  Min: {minPrice} MAD
                </Text>
                <TouchableOpacity onPress={() => setMinPrice("")}>
                  <X size={14} color="#166534" />
                </TouchableOpacity>
              </View>
            )}
            {maxPrice && (
              <View className="bg-green-100 px-3 py-1 rounded-full flex-row items-center gap-2">
                <Text className="text-green-700 text-xs">
                  Max: {maxPrice} MAD
                </Text>
                <TouchableOpacity onPress={() => setMaxPrice("")}>
                  <X size={14} color="#166534" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Count divider */}
        <View className="my-5 items-center flex-row flex-1 gap-3">
          <View className="w-full h-px bg-blue-600 flex-1" />
          <View className="bg-blue-50 px-4 py-2 rounded-full">
            <Text className="font-semibold text-blue-700 text-sm">
              {products.length} produit{products.length > 1 ? "s" : ""}
            </Text>
          </View>
          <View className="w-full h-px bg-blue-600 flex-1" />
        </View>

        {/* Products list */}
        {loading ? (
          <View className="items-center justify-center py-20">
            <Text>Chargement...</Text>
          </View>
        ) : products.length < 1 ? (
          <View className="items-center justify-center py-20 px-6">
            <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-6">
              <Text className="text-5xl">🛍️</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900 text-center">
              Aucun produit
            </Text>
            <Text className="text-gray-500 text-center mt-3 leading-6">
              Ajoutez votre premier produit pour commencer à vendre.
            </Text>
          </View>
        ) : (
          <>
            <View className="flex-col gap-3">
              {products.map((item) => {
                const image = item?.images[0]?.image_path;
                const category = item?.category?.name;
                return (
                  <ProductCard
                    key={item.id}
                    {...item}
                    image={image}
                    category={category}
                  />
                );
              })}
            </View>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <View className="mt-6 gap-y-3">
                {/* Page numbers */}
                <View className="flex-row items-center justify-center gap-2 flex-wrap">
                  {getVisiblePages().map((page, index) => {
                    if (page === "...") {
                      return (
                        <View
                          key={`dots-${index}`}
                          className="w-9 h-9 items-center justify-center"
                        >
                          <Text className="text-gray-400 font-bold">···</Text>
                        </View>
                      );
                    }
                    return (
                      <TouchableOpacity
                        key={`page-${page}`}
                        onPress={() => setCurrentPage(Number(page))}
                        className={`w-9 h-9 rounded-xl items-center justify-center ${
                          currentPage === page ? "bg-black" : "bg-gray-100"
                        }`}
                      >
                        <Text
                          className={`font-semibold text-sm ${
                            currentPage === page ? "text-white" : "text-black"
                          }`}
                        >
                          {page}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Prev / Page info / Next */}
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    disabled={currentPage === 1}
                    onPress={() => setCurrentPage((prev) => prev - 1)}
                    className={`px-4 py-2.5 rounded-2xl ${
                      currentPage === 1 ? "bg-gray-100" : "bg-black"
                    }`}
                  >
                    <Text
                      className={`font-semibold text-sm ${
                        currentPage === 1 ? "text-gray-400" : "text-white"
                      }`}
                    >
                      ← Précédent
                    </Text>
                  </TouchableOpacity>

                  <Text className="text-gray-400 text-sm font-medium">
                    {currentPage} / {totalPages}
                  </Text>

                  <TouchableOpacity
                    disabled={currentPage === totalPages}
                    onPress={() => setCurrentPage((prev) => prev + 1)}
                    className={`px-4 py-2.5 rounded-2xl ${
                      currentPage === totalPages ? "bg-gray-100" : "bg-black"
                    }`}
                  >
                    <Text
                      className={`font-semibold text-sm ${
                        currentPage === totalPages
                          ? "text-gray-400"
                          : "text-white"
                      }`}
                    >
                      Suivant →
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        )}
      </View>

      {/* FILTER MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Overlay */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          className="absolute inset-0 bg-gray-300/70"
        />
        <View className="flex-1 items-center justify-center px-6">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          />
          <View className="bg-white w-full max-h-[500px] rounded-3xl p-6 relative">
            <View className="items-center flex-row justify-between mb-4">
              <Text className="text-xl font-bold text-black">
                Filtrer les produits
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setModalVisible(false)}
                className="p-1 rounded-lg bg-gray-100 shadow-md"
              >
                <X size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={(_, h) => {
                scrollContentHeight.current = h;
                checkScrollable();
              }}
              onLayout={(e) => {
                scrollContainerHeight.current = e.nativeEvent.layout.height;
                checkScrollable();
              }}
              className="max-h-[420px]"
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {/* Categories Section */}
              <Text className="text-gray-500 mb-2 font-semibold">
                Par catégories
              </Text>
              <View className="flex-col items-center gap-y-2 mb-6">
                {categories.map((item: any) => {
                  const activeCategory =
  tempCategory === (item.isAll ? null : item.id);

                  const imageUrl = getFullImageUrl(item.image_path);

                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.85}
                      onPress={() => {
                        const cat = item.isAll ? null : item.id;// "" means no category filter
                        setTempCategory(cat);
                        setSelectedCategory(cat); // ← keep this
                        setCurrentPage(1);
                        setModalVisible(false);
                      }}
                      className={`
                        w-full rounded-2xl border px-4 py-4
                        flex-row items-center justify-between
                        ${
                          activeCategory
                            ? "bg-black border-black"
                            : "bg-gray-50 border-gray-200"
                        }
                      `}
                    >
                      <View className="flex-row items-center gap-3">
                        <View
                          className={`
                            w-4 h-4 rounded-full border-2 items-center justify-center
                            ${activeCategory ? "border-white bg-white" : "border-gray-400"}
                          `}
                        >
                          {activeCategory && (
                            <View className="w-2 h-2 rounded-full bg-black" />
                          )}
                        </View>
                        {/* Category Image */}
                        {!item.isAll && imageUrl ? (
                          <Image
                            source={{ uri: imageUrl }}
                            className="w-8 h-8 rounded-lg"
                            resizeMode="cover"
                          />
                        ) : (
                          <View className="w-8 h-8 rounded-lg bg-gray-100 items-center justify-center">
                            <Text className="text-lg">
                              {item.isAll ? "🎯" : "📁"}
                            </Text>
                          </View>
                        )}
                        <Text
                          className={`
                            text-[15px] font-semibold
                            ${activeCategory ? "text-white" : "text-gray-900"}
                          `}
                        >
                          {item.label}
                        </Text>
                      </View>
                      {activeCategory && (
                        <View className="bg-white/20 px-3 py-1 rounded-full">
                          <Text className="text-white text-xs font-semibold">
                            Selected
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            {/* Scroll Arrow Button - Positioned absolutely within the modal */}
            {isScrollable && (
              <TouchableOpacity
                onPress={handleScrollArrow}
                activeOpacity={0.8}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white items-center justify-center shadow-lg"
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
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Store;
