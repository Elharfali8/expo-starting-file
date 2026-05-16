// UpdateProductModal.tsx
import { CheckCircle, XCircle } from "lucide-react-native";
import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  success: boolean;
  message?: string;
};

const UpdateProductModal = ({ visible, onClose, success, message }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        className="flex-1 bg-gray-400/70 items-center justify-center px-6"
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full">
          <View className="bg-white rounded-3xl px-8 py-12 items-center">
            <View
              className={`w-20 h-20 rounded-full items-center justify-center mb-5 ${
                success ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {success ? (
                <CheckCircle size={44} color="#16A34A" />
              ) : (
                <XCircle size={44} color="#EF4444" />
              )}
            </View>

            <Text
              className={`text-2xl font-bold mb-2 ${
                success ? "text-gray-900" : "text-red-600"
              }`}
            >
              {success ? "Produit mis à jour !" : "Échec de la mise à jour"}
            </Text>

            <Text className="text-sm text-gray-500 text-center mb-8">
              {message ||
                (success
                  ? "Le produit a été mis à jour avec succès."
                  : "Une erreur est survenue lors de la mise à jour du produit.")}
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onClose}
              className={`rounded-2xl py-4 px-10 w-full items-center ${
                success ? "bg-black" : "bg-red-500"
              }`}
            >
              <Text className="text-white font-bold text-base">OK</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default UpdateProductModal;