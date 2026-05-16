import {
  deleteOrder,
  getSingleOrder,
  updateOrder,
} from "@/app/(dashboard)/digital-profile/api/store/orders";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Copy,
  MapPin,
  Package,
  PackageCheck,
  RefreshCw,
  Truck,
  User,
  XCircle,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as Clipboard from "expo-clipboard";
import { Image } from "react-native";
import Loading from "../../components/Loading";
import DeleteOrderModal from "../components/DeleteOrderModal";

const orderStatusConfig: Record<
  string,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    badge: string;
    iconBg: string;
    badgeBg: string;
    icon: any;
    iconColor: string;
  }
> = {
  pending: {
    label: "En attente",
    bg: "bg-amber-200",
    text: "text-amber-800",
    border: "border-amber-300",
    badge: "bg-amber-100",
    iconBg: "bg-amber-100",
    badgeBg: "bg-amber-100",
    icon: Clock,
    iconColor: "#D97706",
  },
  confirmed: {
    label: "Confirmée",
    bg: "bg-blue-200",
    text: "text-blue-800",
    border: "border-blue-300",
    badge: "bg-blue-100",
    iconBg: "bg-blue-100",
    badgeBg: "bg-blue-100",
    icon: CheckCircle,
    iconColor: "#2563EB",
  },
  completed: {
    label: "Terminée",
    bg: "bg-green-200",
    text: "text-green-800",
    border: "border-green-300",
    badge: "bg-green-100",
    iconBg: "bg-green-100",
    badgeBg: "bg-green-100",
    icon: PackageCheck,
    iconColor: "#16A34A",
  },
  cancelled: {
    label: "Annulée",
    bg: "bg-red-200",
    text: "text-red-800",
    border: "border-red-300",
    badge: "bg-red-100",
    iconBg: "bg-red-100",
    badgeBg: "bg-red-100",
    icon: XCircle,
    iconColor: "#DC2626",
  },
};

const statuses = ["pending", "confirmed", "completed", "cancelled"];

const paymentStatusConfig: Record<
  string,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    iconBg: string;
    badgeBg: string;
    icon: any;
    iconColor: string;
  }
> = {
  unpaid: {
    label: "Non payé",
    bg: "bg-red-200",
    text: "text-red-800",
    border: "border-red-300",
    iconBg: "bg-red-100",
    badgeBg: "bg-red-100",
    icon: XCircle,
    iconColor: "#DC2626",
  },
  paid: {
    label: "Payé",
    bg: "bg-green-200",
    text: "text-green-800",
    border: "border-green-300",
    iconBg: "bg-green-100",
    badgeBg: "bg-green-100",
    icon: CheckCircle,
    iconColor: "#16A34A",
  },
  refunded: {
    label: "Remboursé",
    bg: "bg-gray-200",
    text: "text-gray-800",
    border: "border-gray-400",
    iconBg: "bg-gray-300",
    badgeBg: "bg-gray-300",
    icon: RefreshCw,
    iconColor: "#6B7280",
  },
};

const fulfillmentStatusConfig: Record<
  string,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    iconBg: string;
    badgeBg: string;
    icon: any;
    iconColor: string;
  }
> = {
  unfulfilled: {
    label: "Non traité",
    bg: "bg-gray-200",
    text: "text-gray-800",
    border: "border-gray-400",
    iconBg: "bg-gray-300",
    badgeBg: "bg-gray-300",
    icon: Package,
    iconColor: "#6B7280",
  },
  ready: {
    label: "Prêt",
    bg: "bg-amber-200",
    text: "text-amber-800",
    border: "border-amber-300",
    iconBg: "bg-amber-100",
    badgeBg: "bg-amber-100",
    icon: MapPin,
    iconColor: "#D97706",
  },
  "out for delivery": {
    label: "En livraison",
    bg: "bg-blue-200",
    text: "text-blue-800",
    border: "border-blue-300",
    iconBg: "bg-blue-100",
    badgeBg: "bg-blue-100",
    icon: Truck,
    iconColor: "#2563EB",
  },
  fulfilled: {
    label: "Livré",
    bg: "bg-green-200",
    text: "text-green-800",
    border: "border-green-300",
    iconBg: "bg-green-100",
    badgeBg: "bg-green-100",
    icon: PackageCheck,
    iconColor: "#16A34A",
  },
};

const fulfillmentStatuses = [
  "unfulfilled",
  "ready",
  "out for delivery",
  "fulfilled",
];

const paymentStatus = ["unpaid", "paid", "refunded"];

const SingleOrderPage = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [activeStatus, setActiveStatus] = useState<string>("");
  const [activePaymentStatus, setActivePaymentStatus] = useState<string>("");
  const [activeFulfillmentStatus, setActiveFulfillmentStatus] =
    useState<string>("");
  const [note, setNote] = useState("");

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleCopy = async (value: string, field: string) => {
    await Clipboard.setStringAsync(value);

    setCopiedField(field);

    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const mediaUrl = process.env.EXPO_PUBLIC_MEDIA_URL;

  const { orderId, username } = useLocalSearchParams();

  // fetch order
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        if (typeof username !== "string") return;

        const parsedOrderId = Number(orderId);
        if (isNaN(parsedOrderId)) return;

        const res = await getSingleOrder({
          username,
          orderId: parsedOrderId,
        });

        setOrder(res);
        setActiveStatus(res.order_status);
        setActivePaymentStatus(res.payment_status);
        setActiveFulfillmentStatus(res.fulfillment_status?.toLowerCase());
        setNote(res.note);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, username]);

  // Update order
  const handleUpdateOrder = async () => {
    try {
      setLoading(true);

      if (typeof username !== "string") return;

      const parsedOrderId = Number(orderId);

      if (isNaN(parsedOrderId)) return;

      const updatedOrder = await updateOrder({
        username,
        orderId: parsedOrderId,
        orderData: {
          note,
          order_status: activeStatus,
          payment_status: activePaymentStatus,
          fulfillment_status: activeFulfillmentStatus,
        },
      });

      setOrder(updatedOrder);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      setDeleting(true);

      if (typeof username !== "string") return;

      const parsedOrderId = Number(orderId);

      if (isNaN(parsedOrderId)) return;

      await deleteOrder({
        username,
        orderId: parsedOrderId,
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

  if (loading) {
    return <Loading />;
  }

  // useEffect(() => {
  //   if (!orderId || typeof username !== "string") return;

  //   const parsedOrderId = Number(orderId);

  //   if (isNaN(parsedOrderId)) {
  //     router.replace(`/digital-profile/management/${username}/store/orders`);
  //   }
  // }, [orderId, username]);

  return (
    <View>
      {/* HEADER */}
      <View className="flex-row items-center gap-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-gray-900 w-11 h-11 rounded-2xl items-center justify-center shadow-md"
        >
          <ArrowLeft size={27} color="white" />
        </TouchableOpacity>
        <Text className="text-xl text-gray-800 font-bold">
          #{order?.id} {order?.orderCustomer?.name}
        </Text>
      </View>

      {/* Delivery method banner */}
      <View className="mt-6">
        <View className="flex-row items-center justify-between">
          <View className="h-px bg-blue-500 flex-1" />
          <View className="flex-row items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mx-2">
            <Truck size={16} color="#1D4ED8" />
            <Text className="text-blue-700 font-medium text-sm">
              {order?.delivery_method}
            </Text>
          </View>
          <View className="h-px bg-blue-500 flex-1" />
        </View>
      </View>

      {/* Order status selector */}
      <View className="bg-white p-4 mt-6 shadow-md rounded-2xl">
        <Text className="font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Statut de la commande
        </Text>

        <View className="gap-y-2">
          {statuses.map((status) => {
            const config = orderStatusConfig[status];
            const isActive = activeStatus === status;
            const IconComponent = config.icon;

            return (
              <TouchableOpacity
                key={status}
                activeOpacity={0.8}
                onPress={() => setActiveStatus(status)}
                className={`flex-row items-center gap-3 px-4 py-3 rounded-xl border ${
                  isActive
                    ? `${config.bg} ${config.border}`
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                {/* Icon */}
                <View
                  className={`w-9 h-9 rounded-xl items-center justify-center ${
                    isActive ? config.iconBg : "bg-gray-100"
                  }`}
                >
                  <IconComponent
                    size={18}
                    color={isActive ? config.iconColor : "#9CA3AF"}
                  />
                </View>

                {/* Label */}
                <Text
                  className={`flex-1 font-semibold text-[15px] ${
                    isActive ? config.text : "text-gray-500"
                  }`}
                >
                  {config.label}
                </Text>

                {/* Active badge */}
                {isActive && (
                  <View className={`px-3 py-1 rounded-full ${config.badgeBg}`}>
                    <Text className={`text-xs font-semibold ${config.text}`}>
                      Actif
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="mt-3">
          <Text className="text-sm uppercase text-gray-600 text">Note</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Écrire une note..."
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            className="bg-white border border-gray-200 rounded-2xl p-4 text-base min-h-[120px]"
          />
        </View>
      </View>

      {/* Paiement */}
      <View className="bg-white p-4 mt-6 shadow-md rounded-2xl">
        <Text className="font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Paiement
        </Text>

        <View className="gap-y-2">
          {paymentStatus.map((item) => {
            const config = paymentStatusConfig[item];
            const isActive = activePaymentStatus === item;
            const IconComponent = config.icon;

            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() => setActivePaymentStatus(item)}
                className={`flex-row items-center gap-3 px-4 py-3 rounded-xl border ${
                  isActive
                    ? `${config.bg} ${config.border}`
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                {/* Icon */}
                <View
                  className={`w-9 h-9 rounded-xl items-center justify-center ${
                    isActive ? config.iconBg : "bg-gray-100"
                  }`}
                >
                  <IconComponent
                    size={18}
                    color={isActive ? config.iconColor : "#9CA3AF"}
                  />
                </View>

                {/* Label */}
                <Text
                  className={`flex-1 font-semibold text-[15px] ${
                    isActive ? config.text : "text-gray-500"
                  }`}
                >
                  {config.label}
                </Text>

                {/* Active badge */}
                {isActive && (
                  <View className={`px-3 py-1 rounded-full ${config.badgeBg}`}>
                    <Text className={`text-xs font-semibold ${config.text}`}>
                      Actif
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Fulfillment */}
      <View className="bg-white p-4 mt-6 shadow-md rounded-2xl">
        <Text className="font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Livraison
        </Text>

        <View className="gap-y-2">
          {fulfillmentStatuses.map((item) => {
            const config = fulfillmentStatusConfig[item];
            const isActive = activeFulfillmentStatus === item;
            const IconComponent = config.icon;

            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() => setActiveFulfillmentStatus(item)}
                className={`flex-row items-center gap-3 px-4 py-3 rounded-xl border ${
                  isActive
                    ? `${config.bg} ${config.border}`
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <View
                  className={`w-9 h-9 rounded-xl items-center justify-center ${
                    isActive ? config.iconBg : "bg-gray-100"
                  }`}
                >
                  <IconComponent
                    size={18}
                    color={isActive ? config.iconColor : "#9CA3AF"}
                  />
                </View>

                <Text
                  className={`flex-1 font-semibold text-[15px] ${
                    isActive ? config.text : "text-gray-500"
                  }`}
                >
                  {config.label}
                </Text>

                {isActive && (
                  <View className={`px-3 py-1 rounded-full ${config.badgeBg}`}>
                    <Text className={`text-xs font-semibold ${config.text}`}>
                      Actif
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Order Info Card */}
      <View className="bg-white p-4 mt-6 shadow-md rounded-2xl">
        {/* Title */}
        <View className="flex-row items-center gap-2 mb-4">
          <View className="w-9 h-9 rounded-xl bg-gray-100 items-center justify-center">
            <PackageCheck size={18} color="#374151" />
          </View>
          <Text className="text-lg font-bold text-gray-800">
            Informations sur la commande
          </Text>
        </View>

        {/* Order number + date */}
        <View className="gap-y-1 mb-5">
          <Text className="text-sm text-gray-500">
            N° de commande:{" "}
            <Text className="font-bold text-gray-900">#{order?.id}</Text>
          </Text>
          <Text className="text-sm text-gray-500">
            Date:{" "}
            <Text className="font-medium text-gray-700">
              {order?.createdAt
                ? new Date(order.createdAt).toLocaleString("fr-FR")
                : "—"}
            </Text>
          </Text>
        </View>

        {/* Articles header */}
        <Text className="text-sm font-bold text-gray-800 mb-3">
          Articles achetés
        </Text>

        {/* Table header */}
        <View className="flex-row bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mb-2">
          <Text className="flex-1 text-xs font-semibold text-gray-500 uppercase">
            Article
          </Text>
          <Text className="w-10 text-xs font-semibold text-gray-500 uppercase text-center">
            Qté
          </Text>
          <Text className="w-20 text-xs font-semibold text-gray-500 uppercase text-right">
            Unité
          </Text>
          <Text className="w-20 text-xs font-semibold text-gray-500 uppercase text-right">
            Sous-total
          </Text>
        </View>

        {/* Items */}
        {order?.orderItems?.map((item: any) => {
          const image = item.product?.images?.[0]?.image_path;
          const subtotal = item.price * item.quantity;

          return (
            <View
              key={item.id}
              className="flex-row items-center border border-gray-100 rounded-xl px-3 py-3 mb-2"
            >
              {/* Product image */}
              {image ? (
                <Image
                  source={{ uri: `${mediaUrl}${image}` }}
                  className="w-14 h-14 rounded-xl mr-3"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-12 h-12 rounded-xl bg-gray-100 items-center justify-center mr-3">
                  <Package size={20} color="#9CA3AF" />
                </View>
              )}

              {/* Name */}
              <Text
                className="flex-1 text-sm font-medium text-gray-800 mr-2"
                numberOfLines={2}
              >
                {item.product?.name}
              </Text>

              {/* Qty */}
              <Text className="w-10 text-sm text-gray-600 text-center">
                {item.quantity}
              </Text>

              {/* Unit price */}
              <Text className="w-20 text-sm text-gray-600 text-right">
                {item.price} MAD
              </Text>

              {/* Subtotal */}
              <Text className="w-20 text-sm font-bold text-gray-900 text-right">
                {subtotal} MAD
              </Text>
            </View>
          );
        })}

        {/* Divider */}
        <View className="h-px bg-gray-100 my-3" />

        {/* Delivery fee */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm text-gray-500">Livraison</Text>
          <Text className="text-sm text-gray-700 font-medium">
            {order?.delivery_fee} MAD
          </Text>
        </View>

        {/* Total */}
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-bold text-gray-900">Total</Text>
          <Text className="text-base font-bold text-green-600">
            {order?.total_price} MAD
          </Text>
        </View>
      </View>

      {/* Customer Card */}
      <View className="bg-white p-4 mt-4 shadow-md rounded-2xl mb-6">
        {/* Title */}
        <View className="flex-row items-center gap-3 mb-4">
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <User size={18} color="#374151" />
          </View>
          <View>
            <Text className="text-lg font-bold text-gray-900">Client</Text>
            <Text className="text-xs text-gray-400">
              Informations de contact
            </Text>
          </View>
        </View>

        {/* Fields */}
        {[
          { label: "Nom", value: order?.orderCustomer?.name },
          { label: "Téléphone", value: order?.orderCustomer?.phone },
          { label: "Email", value: order?.orderCustomer?.email },
          { label: "Adresse", value: order?.orderCustomer?.address },
          { label: "Ville", value: order?.orderCustomer?.city },
        ]
          .filter((f) => f.value)
          .map((field) => (
            <View
              key={field.label}
              className="flex-row items-center justify-between py-3 border-b border-gray-50"
            >
              <Text className="text-sm text-gray-400 w-24">{field.label}</Text>
              <Text className="flex-1 text-sm font-medium text-gray-800 text-right mr-3">
                {field.value}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleCopy(field.value!, field.label)}
                className={`w-8 h-8 rounded-lg items-center justify-center ${
                  copiedField === field.label ? "bg-green-100" : "bg-gray-100"
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

      {/* DELETE AND SAVE BUTTON */}
      <View className="gap-2">
        {/* save */}
        <TouchableOpacity
          activeOpacity={0.85}
          disabled={loading}
          onPress={handleUpdateOrder}
          className="bg-black rounded-2xl py-4 items-center shadow-md"
        >
          <Text className="text-white font-bold text-base">
            {loading ? "Loading..." : "Modifier le commande"}
          </Text>
        </TouchableOpacity>
        {/* delete */}
        <TouchableOpacity
          activeOpacity={0.85}
          disabled={loading}
          onPress={() => setDeleteModalVisible(true)}
          className="bg-red-500 rounded-2xl py-4 items-center shadow-md"
        >
          <Text className="text-white font-bold text-base capitalize">
            {loading ? "Loading..." : "supprimer la commande"}
          </Text>
        </TouchableOpacity>
      </View>
      <DeleteOrderModal
        visible={deleteModalVisible}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteOrder}
        onSuccessClose={handleSuccessClose}
        deleting={deleting}
        deleteSuccess={deleteSuccess}
        customerName={order?.orderCustomer?.name}
      />
    </View>
  );
};

export default SingleOrderPage;

const styles = StyleSheet.create({});
