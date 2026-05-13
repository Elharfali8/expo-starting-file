import { CheckCircle, Trash2 } from "lucide-react-native";
import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = {
  deleteModalVisible: boolean;
  setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  selectedImage: any;

  handleDelete: () => Promise<void>;

  deleting: boolean;
  deleteSuccess: boolean;

  onClose: () => void;
  onSuccessClose: () => void;
};

const DeleteImageModal = ({
  deleteModalVisible,
  setDeleteModalVisible,
  selectedImage,
  handleDelete,
  deleting,
  deleteSuccess,
  onClose,
  onSuccessClose,
}: Props) => {
  return (
    <Modal
      visible={deleteModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setDeleteModalVisible(false)}
    >
      <Pressable
        className="
          flex-1
          bg-gray-400/70
          items-center
          justify-center
          px-6
        "
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full">
          {deleteSuccess ? (
            <View
              className="
                bg-white
                rounded-3xl
                px-8
                py-12
                items-center
              "
            >
              <View
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-green-100
                  items-center
                  justify-center
                  mb-5
                "
              >
                <CheckCircle size={44} color="#16a34a" />
              </View>

              <Text
                className="
                  text-2xl
                  font-bold
                  text-gray-900
                  mb-2
                "
              >
                Image supprimée !
              </Text>

              <Text
                className="
                  text-sm
                  text-gray-500
                  text-center
                  leading-5
                  mb-8
                "
              >
                L’image a été supprimée avec succès.
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onSuccessClose}
                className="
                  bg-black
                  rounded-2xl
                  py-4
                  px-10
                  w-full
                  items-center
                "
              >
                <Text
                  className="
                    text-white
                    font-bold
                    text-base
                  "
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              className="
                bg-white
                rounded-3xl
                p-6
                w-full
              "
            >
              <View
                className="
                  w-14
                  h-14
                  bg-red-100
                  rounded-2xl
                  items-center
                  justify-center
                  self-center
                  mb-4
                "
              >
                <Trash2 size={26} color="#EF4444" />
              </View>

              <Text
                className="
                  text-lg
                  font-bold
                  text-gray-900
                  text-center
                  mb-2
                "
              >
                Supprimer l’image ?
              </Text>

              <Text
                className="
                  text-sm
                  text-gray-400
                  text-center
                  mb-6
                "
              >
                Cette action est irréversible.
              </Text>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="
                    flex-1
                    border
                    border-gray-200
                    rounded-2xl
                    py-4
                    items-center
                  "
                  onPress={onClose}
                >
                  <Text
                    className="
                      text-gray-600
                      font-semibold
                    "
                  >
                    Annuler
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  className="
                    flex-1
                    bg-red-500
                    rounded-2xl
                    py-4
                    items-center
                  "
                  onPress={handleDelete}
                >
                  <Text
                    className="
                      text-white
                      font-semibold
                    "
                  >
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

export default DeleteImageModal;
