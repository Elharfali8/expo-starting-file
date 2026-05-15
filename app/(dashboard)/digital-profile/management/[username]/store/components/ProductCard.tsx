import { Edit, Trash2 } from "lucide-react-native";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Product {
  id: number;
  price: number;
  name: string;
  image: string;
  visibility: boolean;
}

const ProductCard = ({ id, price, name, image, visibility }: Product) => {
  const mediaUrl = process.env.EXPO_PUBLIC_MEDIA_URL;

  return (
    <View style={styles.card}>
      {/* Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: mediaUrl + image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        <Text style={styles.price}>{price} MAD</Text>

        <View style={styles.badgeRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>Category</Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              visibility ? styles.statusActive : styles.statusHidden,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                visibility ? styles.dotActive : styles.dotHidden,
              ]}
            />
            <Text
              style={[
                styles.statusText,
                visibility ? styles.statusTextActive : styles.statusTextHidden,
              ]}
            >
              {visibility ?  "Actif" : "Caché"}
            </Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity activeOpacity={0.7} style={styles.deleteBtn}>
          <Trash2 size={16} color="#ef4444" strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.editBtn}>
          <Edit size={16} color="#6366f1" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f1f4",
  },

  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f5f5f7",
  },
  image: {
    width: 88,
    height: 88,
  },

  content: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#494cf7",
    letterSpacing: -0.3,
    marginTop: 2,
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
    flexWrap: "wrap",
  },
  categoryBadge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#6b7280",
    letterSpacing: 0.1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusActive: {
    backgroundColor: "#f0fdf4",
  },
  statusHidden: {
    backgroundColor: "#f9fafb",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: "#22c55e",
  },
  dotHidden: {
    backgroundColor: "#9ca3af",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  statusTextActive: {
    color: "#16a34a",
  },
  statusTextHidden: {
    color: "#6b7280",
  },

  actions: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#fef2f2",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fee2e2",
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e7ff",
  },
});