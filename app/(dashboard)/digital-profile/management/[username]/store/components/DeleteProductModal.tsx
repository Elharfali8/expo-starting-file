import { CheckCircle, Trash2 } from "lucide-react-native";
import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
type Props = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  onSuccessClose: () => void;
  deleting: boolean;
  deleteSuccess: boolean;
  customerName?: string;
};

const DeleteProductModal = ({
  visible,
  onClose,
  onDelete,
  onSuccessClose,
  deleting,
  deleteSuccess,
  customerName,
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-gray-400/70 items-center justify-center px-6"
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full">
          {deleteSuccess ? (
            <View className="bg-white rounded-3xl px-8 py-12 items-center">
              <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-5">
                <CheckCircle size={44} color="#16A34A" />
              </View>

              <Text className="text-2xl font-bold text-gray-900 mb-2">
                Produit supprimée !
              </Text>

              <Text className="text-sm text-gray-500 text-center mb-8">
                Le produit a été supprimée avec succès.
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onSuccessClose}
                className="bg-black rounded-2xl py-4 px-10 w-full items-center"
              >
                <Text className="text-white font-bold text-base">OK</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="bg-white rounded-3xl p-6 w-full">
              <View className="w-14 h-14 bg-red-100 rounded-2xl items-center justify-center self-center mb-4">
                <Trash2 size={26} color="#EF4444" />
              </View>

              <Text className="text-lg font-bold text-gray-900 text-center mb-2">
                Supprimer le produit ?
              </Text>

              <Text className="text-sm text-gray-400 text-center mb-6">
                Voulez-vous vraiment supprimer le produit ?
              </Text>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 border border-gray-200 rounded-2xl py-4 items-center"
                  onPress={onClose}
                >
                  <Text className="text-gray-600 font-semibold">Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 bg-red-500 rounded-2xl py-4 items-center"
                  onPress={onDelete}
                >
                  <Text className="text-white font-semibold">
                    {deleting ? "Suppression..." : "Supprimer"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default DeleteProductModal;
