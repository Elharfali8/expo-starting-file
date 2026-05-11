import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

// ── moved outside component ──────────────────────────────────────────────────
const TABS = ["Tous", "En attente", "Approuvé", "Rejeté"];

const REVIEWS_DATA = [
  {
    id: "1",
    product: "Carte support Instagram (NFC et QRCODE) + Cadeau",
    productId: "#208",
    name: "Mohamed zerouali",
    rating: 5,
    review:
      "Très bon Quality❤️, ou hta flkhedma sahla, et merci pour le cadeau🙏❤️",
    status: "Approuvé",
    date: "02/05/2026",
  },
  {
    id: "2",
    product: "Carte support Instagram (NFC et QRCODE) + Cadeau",
    productId: "#208",
    name: "Abderahman",
    rating: 5,
    review:
      "Nef3tni bzaf flma7al dyali 🙏. lclient dima kaykhali lia follow ou deghya kaydirha 👌",
    status: "Approuvé",
    date: "02/05/2026",
  },
  {
    id: "3",
    product: "Carte support Instagram (NFC et QRCODE) + Cadeau",
    productId: "#208",
    name: "Youssef",
    rating: 5,
    review:
      "Produit de très bonne qualité, conforme à mes attentes. Livraison rapide et excellente expérience globale.",
    status: "Approuvé",
    date: "30/04/2026",
  },
  {
    id: "4",
    product: "Carte NFC Pro",
    productId: "#312",
    name: "Sara M.",
    rating: 3,
    review: "Produit correct mais livraison un peu lente.",
    status: "En attente",
    date: "01/05/2026",
  },
  {
    id: "5",
    product: "Carte NFC Pro",
    productId: "#312",
    name: "Khalid B.",
    rating: 2,
    review: "Ne correspond pas à la description.",
    status: "Rejeté",
    date: "29/04/2026",
  },
];

// ── badge style per status ───────────────────────────────────────────────────
const badgeStyle = (status: string) => {
  switch (status) {
    case "Approuvé":
      return { bg: "#DCFCE7", text: "#16A34A" };
    case "En attente":
      return { bg: "#FEF9C3", text: "#CA8A04" };
    case "Rejeté":
      return { bg: "#FEE2E2", text: "#DC2626" };
    default:
      return { bg: "#F3F4F6", text: "#6B7280" };
  }
};

type Review = (typeof REVIEWS_DATA)[number];

const Reviews = () => {
  const [activeTab, setActiveTab] = useState("Tous");
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);

  const filteredReviews =
    activeTab === "Tous"
      ? reviews
      : reviews.filter((item) => item.status === activeTab);

  // logic pagination
  const ITEMS_PER_PAGE = 8;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const renderStars = (count: number) => {
    const safe = Math.min(Math.max(count, 0), 5); // clamp 0-5
    return (
      <View style={styles.starsContainer}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Ionicons
            key={i}
            name={i < safe ? "star" : "star-outline"}
            size={16}
            color="#F5B301"
          />
        ))}
      </View>
    );
  };

  const renderItem = (item: Review) => {
    const badge = badgeStyle(item.status);

    return (
      <View key={item.id} style={styles.card}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.productTitle} numberOfLines={2}>
              {item.product}
            </Text>
            <Text style={styles.productId}>ID: {item.productId}</Text>
          </View>

          <View style={styles.rightSide}>
            <View style={[styles.badge, { backgroundColor: badge.bg }]}>
              <Text style={[styles.badgeText, { color: badge.text }]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>

        {/* Reviewer */}
        <Text style={styles.name}>{item.name}</Text>

        {/* Stars */}
        {renderStars(item.rating)}

        {/* Review text */}
        <Text style={styles.reviewText}>{item.review}</Text>

        {/* Delete */}
        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.8}
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed header */}
      <Text style={styles.header}>Gestion des avis</Text>

      {/* Scrollable tabs */}
      <View style={{ marginBottom: 14 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                style={[styles.tabButton, active && styles.activeTabButton]}
              >
                <Text style={[styles.tabText, active && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Fade overlay on the right edge */}
        <LinearGradient
          colors={["transparent", "#F5F6F8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          pointerEvents="none"
          style={styles.tabsFade}
        />
      </View>

      {/* Count */}
      <Text style={styles.count}>{filteredReviews.length} avis</Text>

      {/* List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        {filteredReviews.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="chatbubble-outline" size={40} color="#D1D5DB" />
            <Text style={styles.emptyText}>
              Aucun avis dans cette catégorie
            </Text>
          </View>
        ) : (
          paginatedReviews.map((item) => renderItem(item))
        )}
          </ScrollView>
          {/* PAGINATION */}
{totalPages > 1 && (
  <View style={styles.paginationContainer}>
    
    {/* Previous */}
    <TouchableOpacity
      disabled={currentPage === 1}
      onPress={() =>
        setCurrentPage((prev) => prev - 1)
      }
      style={[
        styles.paginationButton,
        currentPage === 1 && styles.disabledButton,
      ]}
    >
      <Text
        style={[
          styles.paginationButtonText,
          currentPage === 1 && styles.disabledButtonText,
        ]}
      >
        Précédent
      </Text>
    </TouchableOpacity>

    {/* Pages */}
    <View style={styles.pagesContainer}>
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1

        return (
          <TouchableOpacity
            key={page}
            onPress={() => setCurrentPage(page)}
            style={[
              styles.pageButton,
              currentPage === page &&
                styles.activePageButton,
            ]}
          >
            <Text
              style={[
                styles.pageText,
                currentPage === page &&
                  styles.activePageText,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>

    {/* Next */}
    <TouchableOpacity
      disabled={currentPage === totalPages}
      onPress={() =>
        setCurrentPage((prev) => prev + 1)
      }
      style={[
        styles.paginationButton,
        currentPage === totalPages &&
          styles.disabledButton,
      ]}
    >
      <Text
        style={[
          styles.paginationButtonText,
          currentPage === totalPages &&
            styles.disabledButtonText,
        ]}
      >
        Suivant
      </Text>
    </TouchableOpacity>
  </View>
)}
    </SafeAreaView>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  tabsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 4,
    marginBottom: 14,
  },

  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },

  activeTabButton: {
    backgroundColor: "#0F172A",
  },

  tabText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  count: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rightSide: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginLeft: 8,
  },

  productTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
    paddingRight: 8,
  },

  productId: {
    fontSize: 13,
    color: "#6B7280",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  date: {
    marginTop: 10,
    fontSize: 13,
    color: "#9CA3AF",
  },

  name: {
    marginTop: 14,
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
  },

  starsContainer: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 8,
    gap: 2,
  },

  reviewText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },

  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },

  emptyText: {
    fontSize: 15,
    color: "#9CA3AF",
  },
  tabsFade: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 48,
    // manual gradient simulation using nested Views
    backgroundColor: "transparent",
    },
  paginationContainer: {
  flexDirection: 'row',
  alignItems: 'center',
      justifyContent: 'space-between',
  marginBottom: 12,
},

paginationButton: {
  backgroundColor: '#000',
  paddingHorizontal: 18,
  paddingVertical: 12,
  borderRadius: 14,
},

disabledButton: {
  backgroundColor: '#E5E7EB',
},

paginationButtonText: {
  color: '#FFF',
  fontWeight: '600',
},

disabledButtonText: {
  color: '#9CA3AF',
},

pagesContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

pageButton: {
  width: 40,
  height: 40,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F3F4F6',
},

activePageButton: {
  backgroundColor: '#000',
},

pageText: {
  color: '#111827',
  fontWeight: '600',
},

activePageText: {
  color: '#FFF',
},
});
