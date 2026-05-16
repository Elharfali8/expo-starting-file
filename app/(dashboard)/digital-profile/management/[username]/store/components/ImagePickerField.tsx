import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { ImagePlus, X } from "lucide-react-native";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ImagePickerFieldProps = {
  /**
   * Array of image URIs (local file:// or remote paths).
   * The parent owns this state and passes it down.
   */
  images: string[];

  /**
   * Called when the user picks a new image. Receives the new URI to append.
   */
  onAdd: (uri: string) => void;

  /**
   * Called when the user removes an image. Receives the index to remove.
   */
  onRemove: (index: number) => void;

  /**
   * Optional function to resolve a stored path to a full URI.
   * Useful when images come from an API (e.g. prepend a media base URL).
   * Defaults to returning the path as-is.
   */
  resolveUri?: (path: string) => string;

  /**
   * Show a "MAIN" badge on the first image. Default: true.
   */
  showMainBadge?: boolean;

  /**
   * Thumbnail size in pixels. Default: 96.
   */
  size?: number;

  /**
   * Aspect ratio for the image picker crop. Default: [1, 1].
   */
  aspect?: [number, number];

  /**
   * Image quality (0–1). Default: 0.8.
   */
  quality?: number;

  /**
   * Helper text shown below the row. Pass null to hide.
   * Default: "Max 10 Mo · Format recommandé 1:1"
   */
  hint?: string | null;
};

// ─── Component ────────────────────────────────────────────────────────────────

const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  images,
  onAdd,
  onRemove,
  resolveUri = (p) => p,
  showMainBadge = true,
  size = 96,
  aspect = [1, 1],
  quality = 0.8,
  hint = "Max 10 Mo · Format recommandé 1:1",
}) => {
  const handlePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect,
      quality,
    });

    if (!result.canceled) {
      onAdd(result.assets[0].uri);
    }
  };

  const BADGE_SIZE = 22;
  const BADGE_OFFSET = 8;

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: BADGE_OFFSET + 2,
          paddingBottom: 4,
          paddingHorizontal: BADGE_OFFSET,
        }}
      >
        <View style={{ flexDirection: "row", gap: 14 }}>
          {/* Existing images */}
          {images.map((img, index) => (
            <View key={index} style={{ position: "relative" }}>
              <Image
                source={{ uri: resolveUri(img) }}
                style={{
                  width: size,
                  height: size,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
                resizeMode="cover"
              />

              {/* Remove button */}
              <TouchableOpacity
                onPress={() => onRemove(index)}
                style={{
                  position: "absolute",
                  top: -BADGE_OFFSET,
                  right: -BADGE_OFFSET,
                  backgroundColor: "#EF4444",
                  borderRadius: BADGE_SIZE / 2,
                  width: BADGE_SIZE,
                  height: BADGE_SIZE,
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  elevation: 5,
                }}
              >
                <X size={11} color="white" />
              </TouchableOpacity>

              {/* Main badge */}
              {showMainBadge && index === 0 && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: 4,
                    backgroundColor: "rgba(0,0,0,0.55)",
                    borderRadius: 6,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 9, fontWeight: "700" }}
                  >
                    MAIN
                  </Text>
                </View>
              )}
            </View>
          ))}

          {/* Add button */}
          <TouchableOpacity
            onPress={handlePick}
            activeOpacity={0.8}
            style={{
              width: size,
              height: size,
              borderRadius: 12,
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: "#D1D5DB",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F9FAFB",
            }}
          >
            <ImagePlus size={22} color="#6B7280" />
            <Text
              style={{
                fontSize: 10,
                color: "#6B7280",
                marginTop: 4,
                fontWeight: "600",
              }}
            >
              Ajouter
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {hint !== null && (
        <Text style={{ fontSize: 11, color: "#9CA3AF", marginTop: 10 }}>
          {hint}
        </Text>
      )}
    </View>
  );
};

export default ImagePickerField;