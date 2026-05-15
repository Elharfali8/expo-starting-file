import { getAllProducts } from "@/app/(dashboard)/digital-profile/api/store/products";
import { useLocalSearchParams } from "expo-router";
import { Plus, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import ProductCard from "../components/ProductCard";

const Store = () => {
  const { username } = useLocalSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        if (typeof username !== "string") return;
        const res = await getAllProducts({
          username,
          page: currentPage,
          limit: 6,
        });
        console.log("tttttttttttttttttt", res); // 👈 check this
        setProducts(res.products);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [username, currentPage, search]);

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
        {products.length < 1 ? (
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
                return <ProductCard key={item.id} {...item} image={image} />;
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
    </View>
  );
};

export default Store;
