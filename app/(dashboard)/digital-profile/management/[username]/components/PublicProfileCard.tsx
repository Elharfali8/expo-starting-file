import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard'

interface Props {
  username: string;
  avatarSource?: any;
  onShare?: () => void;
}

export default function PublicProfileCard({
  username,
  avatarSource,
  onShare,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(`digitalprofile.ma/${username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["#2c67f2", "#62cff4"] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
              style={styles.gradient}
              className="shadow-md"
      >
        {/* Glow orb */}
        <View style={styles.glowOrb} />

        <View style={styles.row}>
          {/* ── Left column ── */}
          <View style={styles.left}>
            {/* Badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>PROFIL PUBLIC</Text>
            </View>

            {/* URL box */}
            <View style={styles.urlBox}>
              <View style={styles.urlRow}>
                <Text numberOfLines={1} style={styles.urlText}>
                  digitalprofile.ma/{username}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleCopy}
                  style={[
                    styles.copyBtn,
                    copied && styles.copyBtnCopied,
                  ]}
                >
                  <Ionicons
                    name={copied ? "checkmark-outline" : "copy-outline"}
                    size={18}
                    color={copied ? "#fff" : "#2563eb"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>
              Partagez votre lien public et développez votre présence en ligne.
            </Text>
          </View>

          {/* ── Right column ── */}
          <View style={styles.right}>
            {avatarSource ? (
              <Image
                source={avatarSource}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onShare}
              style={styles.shareBtn}
            >
              <Ionicons name="share-outline" size={17} color="#2b7fff" />
              <Text style={styles.shareBtnText}>Partager le profil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
    borderRadius: 28,
    overflow: "hidden",
  },
  gradient: {
    padding: 16,
      position: "relative",

  },
  glowOrb: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  // ── Left ──
  left: {
    flex: 1,
    paddingRight: 12,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.8,
    color: "#fff",
  },
  urlBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  urlRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  urlText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  copyBtn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  copyBtnCopied: {
    backgroundColor: "#22c55e",
  },
  description: {
    marginTop: 14,
    fontSize: 13,
    lineHeight: 19,
    color: "rgba(220,235,255,0.9)",
  },

  // ── Right ──
  right: {
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 140,
    height: 140,
  },
  avatarPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  shareBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563eb",
  },
});