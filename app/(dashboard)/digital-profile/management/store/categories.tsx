import { Pencil, Plus, Search, Trash2, X } from "lucide-react-native";
import React, { useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

type Category = {
  id: number;
  category: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, category: "Toutes" },
    { id: 2, category: "En attente" },
    { id: 3, category: "Confirmée" },
    { id: 4, category: "Livrée" },
    { id: 5, category: "Annulée" },
  ]);

  // ── Edit modal ──────────────────────────────────────────────────────────────
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [editValue, setEditValue] = useState("");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // ── Action modal (tap on item) ───────────────────────────────────────────────
  const [actionModalVisible, setActionModalVisible] = useState(false);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const openEditModal = (item: Category) => {
    setSelectedCategory(item);
    setEditValue(item.category);
    setActionModalVisible(false);
    setEditModalVisible(true);
  };

  const openActionModal = (item: Category) => {
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
  const confirmDelete = (item: Category) => {
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
      <View className="bg-white shadow-md rounded-2xl p-4 mt-4">
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
          data={categories}
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
              activeOpacity={0.8}
              onPress={() => openActionModal(item)}
            >
              <View className="bg-white border border-gray-200 rounded-2xl px-4 py-4 shadow-sm h-24 mb-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text
                      numberOfLines={1}
                      className="text-[16px] font-bold text-gray-900"
                    >
                      {item.category}
                    </Text>
                    <View className="bg-green-100 self-start px-3 py-1 rounded-full mt-2">
                      <Text className="text-green-700 text-xs font-semibold">
                        Actif
                      </Text>
                    </View>
                  </View>
                  <Text className="text-xs text-gray-400">Swipe</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
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
