import * as Clipboard from "expo-clipboard";
import { Check, Copy, Pen, Plus, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import PageTitle from "@/app/(dashboard)/components/PageTitle";
import FacebookIcon from "@/assets/links/facebook.png";
import GithubIcon from "@/assets/links/github.png";
import GmailIcon from "@/assets/links/gmail.png";
import InstagramIcon from "@/assets/links/instagram.png";
import TiktokIcon from "@/assets/links/tiktok.png";
import WhatsappIcon from "@/assets/links/whatsapp.png";
import XIcon from "@/assets/links/x.png";
import { useLocalSearchParams } from "expo-router";
import { getAllSocialLinks } from "../../api/store/links";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Loading from "./components/Loading";

type SocialLink = {
  id: number;
  title: string;
  icon: any;
};

const Links = () => {
  const { username } = useLocalSearchParams();
  const profileUrl = `https://www.digitalprofile.ma/${username}`;

  const [copied, setCopied] = useState(false);
  const [selectedLink, setSelectedLink] = useState<SocialLink | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllLinks = async () => {
      try {
        setLoading(true);
        if (typeof username !== "string") return;
        const res = await getAllSocialLinks({ username });
        setLinks(res);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllLinks();
  }, [username]);

  // render social media icon
  const getPlatformIcon = (platform: string) => {
    const name = platform.toLowerCase();

    switch (name) {
      case "instagram":
        return (
          <FontAwesome6 name="square-instagram" size={38} color="#E1306C" />
        );

      case "facebook":
        return (
          <FontAwesome6 name="square-facebook" size={38} color="#1877F2" />
        );

      case "whatsapp":
        return (
          <FontAwesome6 name="square-whatsapp" size={38} color="#25D366" />
        );

      case "linkedin":
        return <FontAwesome6 name="linkedin" size={38} color="#0A66C2" />;

      case "github":
        return <FontAwesome6 name="square-github" size={38} color="#111827" />;

      case "twitter":
        return <FontAwesome6 name="square-x-twitter" size={38} color="#000" />;

      case "x":
        return <FontAwesome6 name="square-x-twitter" size={38} color="#000" />;

      case "youtube":
        return <FontAwesome6 name="youtube" size={38} color="#FF0000" />;

      case "telegram":
        return <FontAwesome6 name="telegram" size={38} color="#229ED9" />;

      case "tiktok":
        return <FontAwesome6 name="tiktok" size={38} color="#000" />;

      case "discord":
        return <FontAwesome6 name="discord" size={38} color="#5865F2" />;

      case "snapchat":
        return <FontAwesome6 name="snapchat" size={38} color="#FACC15" />;

      case "pinterest":
        return <FontAwesome6 name="pinterest" size={38} color="#E60023" />;

      case "reddit":
        return <FontAwesome6 name="reddit" size={38} color="#FF4500" />;

      case "spotify":
        return <FontAwesome6 name="spotify" size={38} color="#1DB954" />;

      case "google":
        return <FontAwesome6 name="google" size={38} color="#4285F4" />;

      case "tripadvisor":
        return <FontAwesome6 name="tripadvisor" size={38} color="#34E0A1" />;

      default:
        return <FontAwesome6 name="globe" size={38} color="#64748B" />;
    }
  };

  const handleOpenModal = (item: any) => {
    setSelectedLink(item);
    setModalVisible(true);
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(profileUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-50 mb-26"
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pt-4 pb-8">
        <PageTitle title="Mes liens" subTitle="Gérez vos réseaux sociaux" />

        {/* PROFILE LINK */}
        <View className="w-full p-5 bg-sky-100 rounded-xl border border-sky-200 shadow-sm">
          <Text className="text-base font-semibold text-slate-800 mb-3">
            Votre profil est en ligne
          </Text>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-3"
              onPress={() => Linking.openURL(profileUrl)}
            >
              <Text
                numberOfLines={1}
                className="text-sky-700 underline text-sm"
              >
                {profileUrl}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              className={`w-12 h-12 rounded-2xl items-center justify-center ${
                copied ? "bg-green-500" : "bg-slate-900"
              }`}
            >
              {copied ? (
                <Check size={20} color="white" />
              ) : (
                <Copy size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>

          {copied && (
            <Text className="text-green-600 text-xs mt-3 font-medium">
              URL copiée
            </Text>
          )}
        </View>

        {/* SOCIAL MEDIA LINKS */}
        <View className="mt-6">
          <View className="mb-2">
            <Text className="font-semibold text-lg">Liens sociaux :</Text>
          </View>
          <View className="bg-white p-5 rounded-2xl shadow-sm">
            <View className="flex-row flex-wrap gap-4">
              {links.map((item) => {
                return (
                  <View
                    key={item.id}
                    className="w-[30%] bg-slate-50 border border-slate-200 rounded-2xl p-4 items-center justify-center relative"
                  >
                    <TouchableOpacity
                      onPress={() => handleOpenModal(item)}
                      className="absolute top-1 right-1 z-10 bg-slate-600 rounded-full p-2"
                    >
                      <View>
                        <Pen size={12} color="white" />
                      </View>
                    </TouchableOpacity>

                    <View className="w-14 h-14 rounded-2xl  items-center justify-center">
                      {getPlatformIcon(item.platform_name)}
                    </View>

                    <Text className="text-sm font-medium text-slate-800">
                      {item.platform_name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* BUTTON */}
        <View className="mt-6">
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="bg-slate-900 rounded-2xl py-4  flex-1 items-center flex-row justify-center gap-1"
          >
            <Plus color="white" size={20} />
            <Text className="text-white font-semibold capitalize ">
              Ajouter un lien
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          className="flex-1 bg-slate-500/70 items-center justify-center px-6"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-3xl p-6"
          >
            {/*  */}
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-semibold text-slate-900 mb-2">
                Modifier le lien
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalVisible(false)}
                className="bg-slate-100 p-1 rounded-xl shadow-md "
              >
                <X />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-slate-500 mb-1.5">
                {selectedLink?.title}
              </Text>
              <TextInput
                placeholder={`Lien ${selectedLink?.title.toLowerCase()}`}
                placeholderTextColor="#94a3b8"
                className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-4 text-slate-900 mb-4"
              />
            </View>

            <View className="flex-row items-center justify-between gap-3">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-slate-900 rounded-2xl py-4 items-center flex-1"
              >
                <Text className="text-white font-semibold capitalize">
                  sauvegarder
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="border border-slate-900 bg-slate-50 rounded-2xl py-4 items-center flex-1"
              >
                <Text className="text-slate-900 font-semibold capitalize">
                  supprimer
                </Text>
              </TouchableOpacity>
            </View>
            {/*  */}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default Links;

const styles = StyleSheet.create({});
