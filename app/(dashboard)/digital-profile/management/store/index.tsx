import { Filter, Plus, Search, Trash2, X } from "lucide-react-native";
import { useState } from "react";
import { Image, Modal, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";

const Store = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickedCategory, setPickedCategory] = useState<string>('toutes')
  
    const handleOpenModal = (item: any) => {
      setModalVisible(true);
    };
  
  const handlePickedCategory = (category: string) => {
    setPickedCategory(category)
  }

    const products = [
  {
    id: 1,
    title: "Minimal Chair",
    price: 1299,
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    active: true,
  },
  {
    id: 2,
    title: "Modern Headphones",
    price: 895,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?q=80&w=1200&auto=format&fit=crop",
    active: true,
  },
  {
    id: 3,
    title: "Running Sneakers",
    price: 749,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    active: false,
  },
  {
    id: 4,
    title: "Smart Watch",
    price: 1999,
    category: "Gadgets",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    active: true,
  },
  {
    id: 5,
    title: "Coffee Mug",
    price: 149,
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?q=80&w=1200&auto=format&fit=crop",
    active: true,
  },
  {
    id: 6,
    title: "Backpack Pro",
    price: 599,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    active: false,
  },
  {
    id: 7,
    title: "Desk Lamp",
    price: 399,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
    active: true,
  },
  {
    id: 8,
    title: "Wireless Keyboard ",
    price: 499,
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    active: true,
  },
  ];
  
  const categories = [
    {
      id: 11,
      category: 'Toutes'
  },
  {
    id: 1,
    category: "Furniture",
  },
  {
    id: 2,
    category: "Electronics",
  },
  {
    id: 3,
    category: "Fashion",
  },
  {
    id: 4,
    category: "Accessories",
  },
];

  // 
  const filteredProducts =
  pickedCategory.toLowerCase() === "toutes"
    ? products
    : products.filter(
        (product) =>
          product.category.toLowerCase() ===
          pickedCategory.toLowerCase()
      );

  // 
  const ITEMS_PER_PAGE = 6;

const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(
  filteredProducts.length / ITEMS_PER_PAGE
);

const paginatedProducts = filteredProducts.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);



  return (
    <>
      <View>
      {/* ADD BUTTON */}
      <View className="">
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-slate-900 rounded-2xl py-4 flex-row items-center justify-center gap-2"
        >
          <Plus color="white" size={20} />

          <Text className="text-white font-semibold">Ajouter un produit</Text>
        </TouchableOpacity>
      </View>
      {/* CONTENT */}
      <View className="bg-white shadow-md rounded-2xl p-4 mt-4">
        {/* Search + Filter */}
        <View className="flex-row items-center gap-3 ">
          {/* Search Input */}
          <View className="flex-1 relative">
            <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-2 h-12 shadow-sm">
              <Search size={20} color="#6B7280" style={{ marginRight: 10 }} />

              <TextInput
                placeholder="Recherche"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-[15px] text-black"
              />
            </View>
          </View>

          {/* Filter Button */}
          <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleOpenModal}
            className="h-12 px-3 bg-black rounded-2xl items-center justify-center flex-row gap-2 shadow-sm"
          >
            <Filter size={18} color="white" />

            <Text className="text-white font-semibold text-sm">Filters</Text>
          </TouchableOpacity>
        </View>
        {/* -- */}
        <View className="my-5 items-center flex-row flex-1 gap-3">
          <View className="w-full h-px bg-blue-600 flex-1" />
          <View className="bg-blue-50 px-4 py-2 rounded-full">
  <Text className="font-semibold text-blue-700 text-sm">
    {filteredProducts.length} produit
    {filteredProducts.length > 1 ? "s" : ""}

    {" • "}

    {pickedCategory}
  </Text>
</View>
          <View className="w-full h-px bg-blue-600 flex-1" />
        </View>
        {/* products list */}
        <View className="flex-col gap-3">
          {paginatedProducts.map((item) => {
            return (
              <View
  key={item.id}
  className="bg-white rounded-3xl p-3 mb-4 border border-gray-100 shadow-sm"
>
  <TouchableOpacity
    activeOpacity={0.85}
    className="flex-row items-center"
  >
    {/* Product Image */}
    <Image
      source={{ uri: item.image }}
      className="w-24 h-24 rounded-2xl"
      resizeMode="cover"
    />

    {/* Product Info */}
    <View className="flex-1 ml-4 justify-between">
      <View>
        <Text
  numberOfLines={1}
  ellipsizeMode="tail"
  className="text-base font-semibold text-black max-w-[180px]"
>
  {item.title}
</Text>

        <Text className="text-sm text-gray-500 mt-1">
          {item.category}
                      </Text>

                      <View
          className={`px-3 py-1 rounded-full self-start my-1 ${
            item.active
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              item.active
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {item.active ? "Active" : "Inactive"}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-black">
          {item.price} MAD
        </Text>

        
      </View>
    </View>

    {/* Remove Button */}
    <TouchableOpacity
      className="w-10 h-10 items-center justify-center rounded-full bg-red-50 ml-3"
      activeOpacity={0.8}
    >
      <Trash2 size={18} color="#DC2626" />
    </TouchableOpacity>
  </TouchableOpacity>
</View>
            )
          })}
            {/* PAGINATION */}
{totalPages > 1 && (
  <View className="flex-row items-center justify-between mt-6">
    
    {/* Previous */}
    <TouchableOpacity
      disabled={currentPage === 1}
      onPress={() =>
        setCurrentPage((prev) => prev - 1)
      }
      className={`px-5 py-3 rounded-2xl ${
        currentPage === 1
          ? "bg-gray-200"
          : "bg-black"
      }`}
    >
      <Text
        className={`font-semibold ${
          currentPage === 1
            ? "text-gray-400"
            : "text-white"
        }`}
      >
        Précédent
      </Text>
    </TouchableOpacity>

    {/* Pages */}
    <View className="flex-row items-center gap-2">
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;

        return (
          <TouchableOpacity
            key={page}
            onPress={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-xl items-center justify-center ${
              currentPage === page
                ? "bg-black"
                : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-semibold ${
                currentPage === page
                  ? "text-white"
                  : "text-black"
              }`}
            >
              {page}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>

    {/* Next */}
    <TouchableOpacity
      disabled={currentPage === totalPages}
      onPress={() =>
        setCurrentPage((prev) => prev + 1)
      }
      className={`px-5 py-3 rounded-2xl ${
        currentPage === totalPages
          ? "bg-gray-200"
          : "bg-black"
      }`}
    >
      <Text
        className={`font-semibold ${
          currentPage === totalPages
            ? "text-gray-400"
            : "text-white"
        }`}
      >
        Suivant
      </Text>
    </TouchableOpacity>
  </View>
)}
        </View>
      </View>
    </View>
      {/* MODAL */}
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
  <View className="flex-1 bg-black/40 items-center justify-center px-6">
    
    <View className="bg-white w-full max-h-[500px] rounded-3xl p-6">
      
            <View className="items-center flex-row justify-between">
              <Text className="text-xl font-bold text-black ">
        Filtrer les produits
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setModalVisible(false)}
                className="p-1 rounded-lg bg-gray-100 shadow-md">
                <X size={24} />
              </TouchableOpacity>
      </View>

      <Text className="text-gray-500 mb-4">
        par catégories
            </Text>
            
            <ScrollView
  showsVerticalScrollIndicator={false}
  className="max-h-[320px]"
  contentContainerStyle={{
    paddingBottom: 10,
  }}
>
            <View className="flex-col items-center gap-y-2">
              {categories.map((item) => {
  const activeCategory =
    pickedCategory.toLowerCase() ===
    item.category.toLowerCase();

  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.85}
      onPress={() => {
        setPickedCategory(item.category);
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
      {/* Left Content */}
      <View className="flex-row items-center gap-3">
        
        {/* Circle Indicator */}
        <View
          className={`
            w-4 h-4 rounded-full border-2 items-center justify-center
            ${
              activeCategory
                ? "border-white bg-white"
                : "border-gray-400"
            }
          `}
        >
          {activeCategory && <View className="w-2 h-2 rounded-full bg-black" />}
        </View>

        {/* Category Name */}
        <Text
          className={`
            text-[15px] font-semibold
            ${
              activeCategory
                ? "text-white"
                : "text-gray-900"
            }
          `}
        >
          {item.category}
        </Text>
      </View>

      {/* Active Badge */}
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

    </View>

  </View>
</Modal>
    </>
    
  );
};

export default Store;
