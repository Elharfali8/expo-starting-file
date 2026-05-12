import { useLocalSearchParams } from "expo-router";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { getAllCategories } from "../../../api/store/categories";

const Categories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const { username } = useLocalSearchParams();

  const mediaUrl = process.env.EXPO_PUBLIC_MEDIA_URL;

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        setLoading(true);
        if (typeof username !== "string") return;
        const res = await getAllCategories({ username });
        setCategories(res);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCategories();
  }, [username]);

  // ── Edit modal ──────────────────────────────────────────────────────────────
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [editValue, setEditValue] = useState("");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // ── Action modal (tap on item) ───────────────────────────────────────────────
  const [actionModalVisible, setActionModalVisible] = useState(false);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const openEditModal = (item: any) => {
    setSelectedCategory(item);
    setEditValue(item.category);
    setActionModalVisible(false);
    setEditModalVisible(true);
  };

  const openActionModal = (item: any) => {
    setSelectedCategory(item);
    setActionModalVisible(true);
  };

  const handleSave = () => {
    if (!selectedCategory || !editValue.trim()) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === selectedCategory.id ? { ...c, category: editValue.trim() } : c,
      ),
    );
    setEditModalVisible(false);
  };

  // Opens confirm modal (called from swipe button or action modal)
  const confirmDelete = (item: any) => {
    setSelectedCategory(item);
    setActionModalVisible(false); // close action sheet if open
    setDeleteModalVisible(true);
  };

  // Actually deletes (called from confirm modal)
  const handleDelete = () => {
    if (!selectedCategory) return;
    setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));
    setDeleteModalVisible(false);
  };

  //
  const ITEMS_PER_PAGE = 6;

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const paginatedCategories = categories.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <View>
      {/* ADD BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-slate-900 rounded-2xl py-4 flex-row items-center justify-center gap-2"
      >
        <Plus color="white" size={20} />
        <Text className="text-white font-semibold">Ajouter une catégorie</Text>
      </TouchableOpacity>

      {/* CONTENT */}
      <View className="bg-white shadow-md rounded-2xl mt-4 p-4">
        {/* Search */}
        <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-3 h-12 shadow-sm">
          <Search size={20} color="#6B7280" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Recherche"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-[15px] text-black"
          />
        </View>

        {/* Divider */}
        <View className="my-5 items-center flex-row gap-3">
          <View className="flex-1 h-px bg-gray-200" />
          <View className="bg-gray-100 px-4 py-2 rounded-full">
            <Text className="text-gray-700 font-semibold text-sm">
              {categories.length} catégories
            </Text>
          </View>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Categories List */}
        <SwipeListView
          data={paginatedCategories}
          keyExtractor={(item) => item.id.toString()}
          rightOpenValue={-140}
          disableRightSwipe
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderHiddenItem={({ item }) => (
            <View className="flex-row justify-end items-center rounded-2xl overflow-hidden h-24 mb-4">
              {/* Edit */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-20 h-full bg-blue-500 items-center justify-center"
                onPress={() => openEditModal(item)}
              >
                <Pencil size={22} color="white" />
              </TouchableOpacity>

              {/* Delete */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-20 h-full bg-red-500 items-center justify-center"
                onPress={() => confirmDelete(item)}
              >
                <Trash2 size={22} color="white" />
              </TouchableOpacity>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => openActionModal(item)}
            >
              <View className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-4">
                <View className="flex-row items-center justify-between">
                  {/* LEFT */}
                  <View className="flex-row items-center flex-1">
                    {/* IMAGE */}
                    <View className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100">
                      <Image
                        source={{
                          uri: mediaUrl + item.image_path,
                        }}
                        resizeMode="cover"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>

                    {/* CONTENT */}
                    <View className="ml-4 flex-1">
                      <Text
                        numberOfLines={1}
                        className="text-[16px] font-bold text-slate-900"
                      >
                        {item.name}
                      </Text>

                      {/* STATUS */}
                      <View
                        className={`self-start px-3 py-1 rounded-full mt-3 ${
                          item.visibility ? "bg-green-100" : "bg-slate-200"
                        }`}
                      >
                        <Text
                          className={`text-xs font-semibold capitalize ${
                            item.visibility
                              ? "text-green-700"
                              : "text-slate-600"
                          }`}
                        >
                          {item.visibility ? "visible" : "masqué"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* RIGHT */}
                  <View className="items-end justify-between h-16">
                    <Text className="text-[11px] text-slate-400 font-medium">
                      Swipe
                    </Text>

                    <View className="w-2 h-2 rounded-full bg-slate-300" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        {/* PAGINATION */}
        {/* PAGINATION */}
        {totalPages > 1 && (
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
        )}
      </View>

      {/* ── ACTION MODAL ─────────────────────────────────────────────────────── */}
      <Modal
        visible={actionModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setActionModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-gray-400/70 justify-end"
          onPress={() => setActionModalVisible(false)}
        >
          {/* Stop tap-through on the sheet itself */}
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10">
              {/* Handle */}
              <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-6" />

              {/* Title */}
              <Text className="text-lg font-bold text-gray-900 mb-1">
                {selectedCategory?.category}
              </Text>
              <Text className="text-sm text-gray-400 mb-6">
                Choisissez une action
              </Text>

              {/* Edit button */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-row items-center gap-4 bg-blue-50 rounded-2xl px-4 py-4 mb-3"
                onPress={() =>
                  selectedCategory && openEditModal(selectedCategory)
                }
              >
                <View className="w-10 h-10 bg-blue-500 rounded-xl items-center justify-center">
                  <Pencil size={18} color="white" />
                </View>
                <View>
                  <Text className="text-gray-900 font-semibold">Modifier</Text>
                  <Text className="text-gray-400 text-xs">
                    Changer le nom de la catégorie
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Delete button */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-row items-center gap-4 bg-red-50 rounded-2xl px-4 py-4"
                onPress={() =>
                  selectedCategory && confirmDelete(selectedCategory)
                }
              >
                <View className="w-10 h-10 bg-red-500 rounded-xl items-center justify-center">
                  <Trash2 size={18} color="white" />
                </View>
                <View>
                  <Text className="text-red-600 font-semibold">Supprimer</Text>
                  <Text className="text-gray-400 text-xs">
                    Retirer définitivement cette catégorie
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── EDIT MODAL ───────────────────────────────────────────────────────── */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-gray-400/70 justify-end"
          onPress={() => setEditModalVisible(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10">
              {/* Handle */}
              <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-6" />

              {/* Header */}
              <View className="flex-row items-center justify-between mb-6">
                <View>
                  <Text className="text-lg font-bold text-gray-900">
                    Modifier la catégorie
                  </Text>
                  <Text className="text-sm text-gray-400">
                    Renommez votre catégorie
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setEditModalVisible(false)}
                  className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center"
                >
                  <X size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Input */}
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Nom
              </Text>
              <View className="flex-row items-center border border-gray-200 rounded-2xl px-4 h-14 bg-gray-50 mb-6">
                <TextInput
                  value={editValue}
                  onChangeText={setEditValue}
                  placeholder="Nom de la catégorie"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 text-[15px] text-gray-900"
                  autoFocus
                />
              </View>

              {/* Actions */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 border border-gray-200 rounded-2xl py-4 items-center"
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text className="text-gray-600 font-semibold">Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 bg-slate-900 rounded-2xl py-4 items-center"
                  onPress={handleSave}
                >
                  <Text className="text-white font-semibold">Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── DELETE CONFIRM MODAL ─────────────────────────────────────────────── */}
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-gray-400/70 items-center justify-center px-6"
          onPress={() => setDeleteModalVisible(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="bg-white rounded-3xl p-6 w-full">
              {/* Icon */}
              <View className="w-14 h-14 bg-red-100 rounded-2xl items-center justify-center self-center mb-4">
                <Trash2 size={26} color="#EF4444" />
              </View>

              {/* Text */}
              <Text className="text-lg font-bold text-gray-900 text-center mb-2">
                Supprimer la catégorie ?
              </Text>
              <Text className="text-sm text-gray-400 text-center mb-6">
                Voulez-vous vraiment supprimer{" "}
                <Text className="font-semibold text-gray-600">
                  "{selectedCategory?.category}"
                </Text>{" "}
                ? Cette action est irréversible.
              </Text>

              {/* Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 border border-gray-200 rounded-2xl py-4 items-center"
                  onPress={() => setDeleteModalVisible(false)}
                >
                  <Text className="text-gray-600 font-semibold">Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 bg-red-500 rounded-2xl py-4 items-center"
                  onPress={handleDelete}
                >
                  <Text className="text-white font-semibold">Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
