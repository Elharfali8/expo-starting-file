// components/ImageUploader.jsx
import * as ImagePicker from "expo-image-picker";
import { Image, X } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MAX_FILES = 5;
const MAX_SIZE_MB = 10;

const ImageUploader = ({ onUpload }: {onUpload:any}) => {
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const pickImages = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission refusée", "Accès à la galerie requis.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selected = result.assets.filter(
        (a) => (a.fileSize || 0) <= MAX_SIZE_MB * 1024 * 1024
      );
      setImages((prev:any) => [...prev, ...selected].slice(0, MAX_FILES));
      setSuccess(false);
    }
  };

  const removeImage = (index: any) => {
    setImages((prev:any) => prev.filter((_:any, i:any) => i !== index));
    setSuccess(false);
  };

  const handleUpload = async () => {
    if (images.length === 0) return;
    setLoading(true);

    // ── swap this block with your real API call ──
    await new Promise((r) => setTimeout(r, 1200));
    // ─────────────────────────────────────────────

    setLoading(false);
    setSuccess(true);
    setImages([]);
    if (onUpload) onUpload();
    setTimeout(() => setSuccess(false), 4000);
  };

  const canUpload = images.length > 0 && !loading;

  return (
    <View className="border border-[#e5e7eb] rounded-2xl shadow-md bg-white">

      {/* Preview strip */}
      {images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.previewStrip}
          contentContainerStyle={styles.previewContent}
        >
          {images.map((img:any, i:any) => (
            <View key={i} style={styles.previewWrap}>
              <RNImage
                source={{ uri: img?.uri }}
                style={styles.previewImg}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeImage(i)}
                activeOpacity={0.8}
              >
                <X size={10} color="#fff" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Drop zone */}
      <TouchableOpacity
        style={styles.dropZone}
        onPress={pickImages}
        activeOpacity={0.7}
      >
        <View style={styles.dropIcon}>
          <Image size={20} color="#6b7280" strokeWidth={1.5} />
        </View>
        <View style={styles.dropText}>
          <Text style={styles.dropTitle}>
            Appuyez pour sélectionner{" "}
            <Text style={styles.dropLink}>une image</Text>
          </Text>
          <Text style={styles.dropSub}>
            Max {MAX_SIZE_MB} Mo · Format recommandé 1:1 · {MAX_FILES} fichiers max
          </Text>
        </View>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.fileCount}>
          {images.length === 0
            ? "Aucun fichier sélectionné"
            : `${images.length} fichier${images.length > 1 ? "s" : ""} sélectionné${images.length > 1 ? "s" : ""}`}
        </Text>

        <TouchableOpacity
          style={[styles.uploadBtn, !canUpload && styles.uploadBtnDisabled]}
          onPress={handleUpload}
          disabled={!canUpload}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.uploadBtnText}>Upload</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Success toast */}
      {success && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>
            ✓ Images prêtes — branchez votre API pour envoyer.
          </Text>
        </View>
      )}
    </View>
  );
};

export default ImageUploader;

// fix the import name collision with lucide
import { Image as RNImage } from "react-native";

const styles = StyleSheet.create({

  previewStrip: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
  },
  previewContent: {
    padding: 12,
    gap: 8,
    flexDirection: "row",
  },
  previewWrap: {
    width: 56,
    height: 56,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    marginRight: 8,
  },
  previewImg: {
    width: "100%",
    height: "100%",
  },
  removeBtn: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  dropZone: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 20,
  },
  dropIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  dropText: {
    flex: 1,
  },
  dropTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 3,
  },
  dropLink: {
    color: "#2563eb",
    textDecorationLine: "underline",
  },
  dropSub: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#e5e7eb",
  },
  fileCount: {
    fontSize: 13,
    color: "#6b7280",
  },
  uploadBtn: {
    backgroundColor: "#111827",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 90,
    alignItems: "center",
  },
  uploadBtnDisabled: {
    opacity: 0.4,
  },
  uploadBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  toast: {
    margin: 12,
    padding: 10,
    backgroundColor: "#f0fdf4",
    borderWidth: 0.5,
    borderColor: "#bbf7d0",
    borderRadius: 8,
  },
  toastText: {
    fontSize: 13,
    color: "#15803d",
  },
});