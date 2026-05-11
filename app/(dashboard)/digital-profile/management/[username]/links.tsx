import * as Clipboard from "expo-clipboard";
import { Check, Copy, Pen, Plus, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
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

type SocialLink = {
  id: number;
  title: string;
  icon: any;
};

const Links = () => {
  const profileUrl = "https://www.digitalprofile.ma/yascript";

  const [copied, setCopied] = useState(false);
  const [selectedLink, setSelectedLink] = useState<SocialLink | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  // links
  const socialLinks: SocialLink[] = [
    {
      id: 1,
      title: "Instagram",
      icon: InstagramIcon,
    },
    {
      id: 2,
      title: "Facebook",
      icon: FacebookIcon,
    },
    {
      id: 3,
      title: "WhatsApp",
      icon: WhatsappIcon,
    },
    {
      id: 4,
      title: "X",
      icon: XIcon,
    },
    {
      id: 5,
      title: "GitHub",
      icon: GithubIcon,
    },
    {
      id: 6,
      title: "Gmail",
      icon: GmailIcon,
    },
    {
      id: 7,
      title: "TikTok",
      icon: TiktokIcon,
    },
  ];

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
              {socialLinks.map((item) => {
                const { id, title, icon } = item;

                return (
                  <View
                    key={id}
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

                    <Image
                      source={icon}
                      className="w-12 h-12 mb-3"
                      resizeMode="contain"
                    />

                    <Text className="text-sm font-medium text-slate-800">
                      {title}
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
