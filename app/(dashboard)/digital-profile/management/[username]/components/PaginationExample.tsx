import React, { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Trash, X } from "lucide-react-native";

const MOCK_IMAGES = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
  },
];

const ITEMS_PER_PAGE = 4;

const PaginationExample = () => {
  const [page, setPage] = useState(1);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const totalPages = Math.ceil(MOCK_IMAGES.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return MOCK_IMAGES.slice(start, end);
  }, [page]);

  return (
    <View className="mt-6">
      <FlatList
        scrollEnabled={false}
        data={paginatedData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <View className="w-[48%] mb-4 relative">
            {/* IMAGE */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedImage(item.image)}
            >
              <View className="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            {/* DELETE BUTTON */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => console.log("delete")}
              className="absolute top-2 right-2 bg-white border border-red-100 p-2 rounded-xl shadow-sm"
            >
              <Trash size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* PAGINATION */}
      <View className="flex-row items-center justify-center gap-3 mt-2">
        <TouchableOpacity
          disabled={page === 1}
          onPress={() => setPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded-xl ${
            page === 1 ? "bg-slate-200" : "bg-slate-900"
          }`}
        >
          <Text
            className={`font-medium ${
              page === 1 ? "text-slate-400" : "text-white"
            }`}
          >
            Prev
          </Text>
        </TouchableOpacity>

        <View className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
          <Text className="font-semibold text-slate-800">
            {page} / {totalPages}
          </Text>
        </View>

        <TouchableOpacity
          disabled={page === totalPages}
          onPress={() => setPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded-xl ${
            page === totalPages ? "bg-slate-200" : "bg-slate-900"
          }`}
        >
          <Text
            className={`font-medium ${
              page === totalPages ? "text-slate-400" : "text-white"
            }`}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>

      {/* IMAGE MODAL */}
      <Modal
        visible={!!selectedImage}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View className="flex-1 items-center justify-center">
          {/* OVERLAY */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setSelectedImage(null)}
            className="absolute inset-0 bg-gray-700/90"
          />

          {/* CLOSE BUTTON */}
          <TouchableOpacity
            onPress={() => setSelectedImage(null)}
            className="absolute top-14 right-6 z-20 bg-white/20 p-3 rounded-full"
          >
            <X size={24} color="white" />
          </TouchableOpacity>

          {/* IMAGE */}
          <View className="w-full px-4 items-center justify-center z-10">
            <Image
              source={{ uri: selectedImage || "" }}
              className="w-full h-[500px]"
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaginationExample;
