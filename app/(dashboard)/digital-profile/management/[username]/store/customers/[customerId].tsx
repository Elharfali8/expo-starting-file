import { getSingleCustomer, deleteCustomer } from "@/app/(dashboard)/digital-profile/api/store/customers";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, CheckCircle, Copy, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import DeleteOrderModal from "../components/DeleteOrderModal";

const SingleCustomerPage = () => {
    const { customerId, username } = useLocalSearchParams();
    const [customer, setCustomer] = useState<any>(null);

    const [lastOrders, setLastOrders] = useState<any[]>([]);

    const [stats, setStats] = useState<any>(null);

    const [loading, setLoading] = useState(false);

    // 
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const [deleting, setDeleting] = useState(false);

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [deleteSuccess, setDeleteSuccess] = useState(false);

    

    useEffect(() => {
  const fetchCustomer = async () => {
    try {
      setLoading(true);

      if (typeof username !== "string") return;

      const parsedCustomerId = Number(customerId);

      if (isNaN(parsedCustomerId)) return;

      const res = await getSingleCustomer({
        username,
        customerId: parsedCustomerId,
      });

      setCustomer(res.customer);

      setLastOrders(res.lastOrders || []);

      setStats(res.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchCustomer();
}, [customerId, username]);

    const handleCopy = async (value: string, field: string) => {
        await Clipboard.setStringAsync(value);

        setCopiedField(field);

        setTimeout(() => {
            setCopiedField(null);
        }, 2000);
        };

    const handleDeleteCustomer = async () => {
  try {
    setDeleting(true);

    if (typeof username !== "string") return;

    const parsedCustomerId = Number(customerId);

    if (isNaN(parsedCustomerId)) return;

    await deleteCustomer({
      username,
      customerId: parsedCustomerId,
    });

    setDeleteSuccess(true);
  } catch (error) {
    console.log("DELETE ERROR:", error);
  } finally {
    setDeleting(false);
  }
    };
    
    const handleCloseDeleteModal = () => {
  if (deleting) return;

  setDeleteModalVisible(false);
    };
    
    const handleSuccessClose = () => {
  setDeleteSuccess(false);

  setDeleteModalVisible(false);

  router.back();
};
    
  return (
      <View>
          <View className="flex-row items-center gap-4">
                  <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-gray-900 w-11 h-11 rounded-2xl items-center justify-center shadow-md"
                  >
                    <ArrowLeft size={27} color="white" />
                  </TouchableOpacity>
                  <Text className="text-xl text-gray-800 font-bold">
                    #{customer?.id} {customer?.name}
                  </Text>
                </View>
          {/* ---------- */}
          <View className="bg-white rounded-3xl p-5 shadow-md mt-6 items-center flex-row gap-4">
  {/* Avatar */}
  <View className="w-20 h-20 rounded-3xl bg-black items-center justify-center">
    <Text className="text-white text-3xl font-bold uppercase">
      {customer?.name?.charAt(0)}
    </Text>
  </View>

  {/* Infos */}
  <View className="mt-4">
    <Text className="text-2xl font-bold text-black">
      {customer?.name}
    </Text>

    <Text className="text-gray-500 mt-1">
      {customer?.email || "Aucun email"}
    </Text>

    <Text className="text-gray-500 mt-1">
      {customer?.phone}
    </Text>

    <Text className="text-gray-500 mt-1">
      {customer?.city}
    </Text>
  </View>
          </View>
          {/* ---------- */}
          <View className="flex-row gap-3 mt-5">
  <View className="flex-1 bg-white rounded-2xl p-4 shadow-md">
    <Text className="text-gray-400 text-xs uppercase">
      Commandes
    </Text>

    <Text className="text-2xl font-bold text-black mt-2">
      {stats?.totalOrders}
    </Text>
  </View>

  <View className="flex-1 bg-white rounded-2xl p-4 shadow-md">
    <Text className="text-gray-400 text-xs uppercase">
      Dépenses
    </Text>

    <Text className="text-2xl font-bold text-black mt-2">
      {stats?.totalSpend} MAD
    </Text>
  </View>
</View>
          {/* ---------- */}
          {lastOrders.map((item) => (
  <TouchableOpacity
    key={item.id}
    className="bg-white rounded-2xl p-4 mt-3 shadow-sm"
  >
    <Text className="font-bold text-black">
      #ORD-{item.id}
    </Text>

    <Text className="text-gray-500 mt-1">
      {item.total_price} MAD
    </Text>

    <Text className="text-gray-400 mt-1">
      {item.order_status}
    </Text>
  </TouchableOpacity>
))}
          {/* ---------- */}
          <View className="bg-white p-4 mt-4 shadow-md rounded-2xl mb-6">
  {/* Title */}
  <View className="flex-row items-center gap-3 mb-4">
    <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
      <User size={18} color="#374151" />
    </View>

    <View>
      <Text className="text-lg font-bold text-gray-900">
        Client
      </Text>

      <Text className="text-xs text-gray-400">
        Informations de contact
      </Text>
    </View>
  </View>

  {/* Fields */}
  {[
    { label: "Nom", value: customer?.name },
    { label: "Téléphone", value: customer?.phone },
    { label: "Email", value: customer?.email },
    { label: "Adresse", value: customer?.address },
    { label: "Ville", value: customer?.city },
  ]
    .filter((f) => f.value)
    .map((field) => (
      <View
        key={field.label}
        className="flex-row items-center justify-between py-3 border-b border-gray-50"
      >
        <Text className="text-sm text-gray-400 w-24">
          {field.label}
        </Text>

        <Text className="flex-1 text-sm font-medium text-gray-800 text-right mr-3">
          {field.value}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            handleCopy(field.value!, field.label)
          }
          className={`w-8 h-8 rounded-lg items-center justify-center ${
            copiedField === field.label
              ? "bg-green-100"
              : "bg-gray-100"
          }`}
        >
          {copiedField === field.label ? (
            <CheckCircle size={14} color="#16A34A" />
          ) : (
            <Copy size={14} color="#6B7280" />
          )}
        </TouchableOpacity>
      </View>
    ))}
          </View>
          
          <TouchableOpacity
  activeOpacity={0.85}
  disabled={loading}
  onPress={() => setDeleteModalVisible(true)}
  className="bg-red-500 rounded-2xl py-4 items-center shadow-md"
>
  <Text className="text-white font-bold text-base capitalize">
    {loading
      ? "Loading..."
      : "supprimer le client"}
  </Text>
          </TouchableOpacity>
          
          <DeleteOrderModal
  visible={deleteModalVisible}
  onClose={handleCloseDeleteModal}
  onDelete={handleDeleteCustomer}
  onSuccessClose={handleSuccessClose}
  deleting={deleting}
  deleteSuccess={deleteSuccess}
  customerName={customer?.name}
/>
          
    </View>
  );
};

export default SingleCustomerPage;

const styles = StyleSheet.create({});
