import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from "react-native";

import PageTitle from "../../components/PageTitle";
import { X } from "lucide-react-native";

const Settings = () => {
  const [orderMode, setOrderMode] = useState("online");
  const [showReadyButton, setShowReadyButton] = useState(true);
  const [openModal, setOpenModal] = useState(false)

  return (
    <ScrollView
      className="flex-1 bg-slate-50 mb-26"
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pt-4 pb-8">
        <PageTitle title="Paramètres" />

        {/* Configuration de la boutique */}
        <View className=" bg-white rounded-2xl p-4 shadow-sm">
          <Text className="font-semibold">Configuration de la boutique</Text>

          <View className="w-full h-px bg-gray-300 my-4" />

          {/* Header */}
          <View>
            <View className="items-center flex-row gap-x-2">
              <Text className="font-medium text-gray-600">
                Mode de commande
              </Text>

              <Text className="bg-sky-100 px-2 py-0.5 rounded-lg text-sky-600 text-xs">
                important
              </Text>
            </View>

            <Text className="text-sm text-gray-500 mt-1 leading-5">
              Choisissez comment vos clients passent leurs commandes. Vous
              pouvez activer la commande en ligne classique ou permettre
              uniquement l’ajout au panier sans paiement.
            </Text>
          </View>

          {/* Radio options */}
          <View className=" gap-y-4">
            {/* Option 1 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOrderMode("online")}
              className="flex-row items-start gap-x-3"
            >
              {/* Radio */}
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center mt-0.5 ${
                  orderMode === "online" ? "border-sky-500" : "border-gray-300"
                }`}
              >
                {orderMode === "online" && (
                  <View className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                )}
              </View>

              {/* Content */}
              <View className="flex-1">
                <Text className="font-medium text-gray-800">
                  Commande en ligne
                </Text>

                <Text className="text-sm text-gray-500 mt-1 leading-5">
                  Les clients peuvent ajouter au panier et finaliser leur
                  commande directement en ligne.
                </Text>
              </View>
            </TouchableOpacity>

            {/* Option 2 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOrderMode("cart_only")}
              className="flex-row items-start gap-x-3"
            >
              {/* Radio */}
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center mt-0.5 ${
                  orderMode === "cart_only"
                    ? "border-sky-500"
                    : "border-gray-300"
                }`}
              >
                {orderMode === "cart_only" && (
                  <View className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                )}
              </View>

              {/* Content */}
              <View className="flex-1">
                <Text className="font-medium text-gray-800">
                  Panier uniquement
                </Text>

                <Text className="text-sm text-gray-500 mt-1 leading-5">
                  Les clients peuvent ajouter des articles au panier sans passer
                  de commande en ligne. Ils doivent confirmer leur sélection
                  avec vous.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Checkbox */}
          <View className="mt-6">
            <Text className="text-sm font-medium text-gray-700 mb-3">
              Bouton d’action
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowReadyButton(!showReadyButton)}
              className="flex-row items-start gap-x-3"
            >
              <Checkbox
                value={showReadyButton}
                onValueChange={setShowReadyButton}
                color={showReadyButton ? "#0ea5e9" : undefined}
                style={{
                  width: 19,
                  height: 19,
                  borderRadius: 6,
                }}
              />

              {/* Content */}
              <View className="flex-1">
                <Text className="font-medium text-gray-800">
                  Afficher "Je suis prêt à commander"
                </Text>

                <Text className="text-sm text-gray-500 mt-1 leading-5">
                  Ajoute un bouton visible permettant aux clients d’indiquer
                  qu’ils sont prêts à passer commande.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="w-full h-px bg-gray-300 my-4" />

          {/* Header */}
          <View>
            <View className="items-center flex-row gap-x-2">
              <Text className="font-medium text-gray-600">
                Méthode de réception des commandes
              </Text>

              <Text className="bg-emerald-100 px-2 py-0.5 rounded-lg text-emerald-600 text-xs">
                recommandé
              </Text>
            </View>

            <Text className="text-sm text-gray-500 mt-1 leading-5">
              Choisissez comment vous souhaitez recevoir les commandes de vos
              clients : via un formulaire intégré à la boutique ou directement
              sur WhatsApp.
            </Text>
          </View>

          {/* Options */}
          <View className="mt-5 gap-y-5">
            {/* Formulaire */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-start gap-x-3"
            >
              <Checkbox
                value={true}
                onValueChange={() => {}}
                color={"#10b981"}
                style={{
                  width: 19,
                  height: 19,
                  borderRadius: 6,
                  marginTop: 2,
                }}
              />

              <View className="flex-1">
                <Text className="font-medium text-gray-800">
                  Formulaire de commande
                </Text>

                <Text className="text-sm text-gray-500 mt-1 leading-5">
                  Le client remplit un formulaire, la commande est enregistrée
                  et redirigée vers une page de succès.
                </Text>
              </View>
            </TouchableOpacity>

            {/* WhatsApp */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-start gap-x-3"
            >
              <Checkbox
                value={false}
                onValueChange={() => {}}
                color={"#10b981"}
                style={{
                  width: 19,
                  height: 19,
                  borderRadius: 6,
                  marginTop: 2,
                }}
              />

              <View className="flex-1">
                <Text className="font-medium text-gray-800">
                  Commande par WhatsApp
                </Text>

                <Text className="text-sm text-gray-500 mt-1 leading-5">
                  Le client est redirigé vers WhatsApp avec un message
                  pré-rempli contenant le produit.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* SAVE BUTTON */}
          <View className="mt-6">
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-blue-500 py-3 rounded-2xl items-center justify-center shadow-md"
            >
              <Text className="text-white font-medium">
                Enregistrer les modifications
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* ------------ */}

        {/* Analyse et suivi */}
        <View className=" bg-white rounded-2xl p-4 shadow-sm my-6">
          <Text className="font-semibold">Analyse et suivi</Text>

          <View className="w-full h-px bg-gray-300 my-4" />

          {/* Header */}
          <View>
            <View className="items-center flex-row gap-x-2">
              <Text className="font-medium text-gray-600">
                Meta (Facebook) Pixel
              </Text>

              <Text className="bg-sky-100 px-2 py-0.5 rounded-lg text-sky-600 text-xs">
                optionnel
              </Text>
            </View>

            <Text className="text-sm text-gray-500 mt-1 leading-5">
              Connectez votre Pixel Meta pour suivre les visites de profil et
              les actions en boutique, telles que les consultations de pages,
              l’ajout au panier et les achats.
            </Text>
          </View>
          {/* Content */}
          <View className="mt-4">
              <Text className="mb-2 text-gray-600">Pixel ID :</Text>
              <TextInput id="pixel-id" className="w-full border border-gray-400 rounded-xl shadow focus:ring-1 bg-gray-50 focus:ring-blue-400" placeholder="e.g. 123456123456" style={
                {
                  height: 42,
                  paddingLeft: 10,
                  paddingRight: 4,
                }
              } />
              <Text className="text-xs text-gray-400">Saisissez votre ID de Pixel depuis le Gestionnaire d’événements Meta (chiffres uniquement).</Text>

              <View className="mt-6">
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-blue-500 py-3 rounded-2xl items-center justify-center shadow-md"
            >
              <Text className="text-white font-medium">
                Enregistrer les modifications
              </Text>
            </TouchableOpacity>
          </View>

            </View>
        </View>
        {/* ---------- */}

        {/* Ownership & Access */}
        <View className=" bg-white rounded-2xl p-4 shadow-sm mb-6">
          <Text className="font-semibold">Ownership & Access</Text>
            <Text className="text-sm text-gray-500 mt-1 leading-5">
             Gérez le propriétaire actuel de ce profil digital et contrôlez les transferts de propriété.
            </Text>

          <View className="p-4 bg-red-200/80 mt-4 rounded-2xl">
              <View className="flex-1">
                <View className="items-center flex-row flex-wrap gap-x-2">
              <Text className="font-medium text-red-600">
               Transfert de propriété 
              </Text>

              <Text className="bg-red-100 px-2 py-0.5 rounded-lg text-red-600 text-xs">
                Zone dangereuse
              </Text>
            </View>

                <Text className="text-sm text-red-400 mt-1 leading-5">
                  Transférez ce profil digital à une autre personne. Après transfert, vous perdrez le contrôle complet de ce profil.
                </Text>
            </View>
            
            {/* SAVE BUTTON */}
          <View className="mt-6">
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-red-500 py-3 rounded-2xl items-center justify-center shadow-md"
            >
              <Text className="text-white font-medium">
                Enregistrer les modifications
              </Text>
            </TouchableOpacity>
          </View>
              </View>
              
            </View>

        {/* ------------ */}
        {/* Supprimer définitivement */}
        <View className=" bg-white rounded-2xl p-4 shadow-sm mt-6">
          <Text className="font-semibold">Supprimer définitivement</Text>

          <View className="w-full h-px bg-gray-300 my-4" />
          <Text className="font-medium text-gray-600">
            Supprimez définitivement votre profil {' '}
            <Text className="text-blue-500">@undefined</Text>
          </Text>
          
          {/* DELETE PROFILE BUTTON */}
          <View className="mt-6">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOpenModal((prev) => !prev)}
              className="bg-red-700 py-3 rounded-2xl items-center justify-center shadow-md"
            >
              <Text className="text-white font-medium">
                Supprimer le profil
              </Text>
            </TouchableOpacity>
          </View>
          </View>
      </View>

      {/* Modal */}
<Modal
  visible={openModal}
  transparent
  animationType="fade"
  onRequestClose={() => setOpenModal(false)}
>
  <TouchableOpacity
    activeOpacity={1}
    onPress={() => setOpenModal(false)}
    className="flex-1 bg-gray-500/50 justify-center items-center px-4"
  >
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {}}
      className="bg-white w-full rounded-2xl p-5"
    >
            <View className="items-center justify-between flex-row">
              <Text className="text-lg font-semibold ">
        Confirmer la suppression
              </Text>
              <TouchableOpacity
                onPress={() => setOpenModal(false)}
                className="bg-gray-100 rounded-lg p-1 shadow "
              >
                <X />
              </TouchableOpacity>
      </View>

      <Text className="text-gray-500 mb-6">
        Cette action est irréversible.
      </Text>

            <TouchableOpacity
              activeOpacity={0.75}
        onPress={() => setOpenModal(false)}
        className="bg-gray-200 py-3 rounded-xl items-center mb-3"
      >
        <Text>Annuler</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.75} className="bg-red-600 py-3 rounded-xl items-center">
        <Text className="text-white font-medium">
          Supprimer définitivement
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  </TouchableOpacity>
</Modal>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
