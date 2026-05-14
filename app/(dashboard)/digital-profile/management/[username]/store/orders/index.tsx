import { getAllOrders } from "@/app/(dashboard)/digital-profile/api/store/orders";
import { router, useLocalSearchParams } from "expo-router";
import { Filter, Search, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Loading from "../../components/Loading";
import {
    fulfillmentStatusConfig,
    orderStatusConfig,
    paymentStatusConfig,
} from "../constants/orders";

const orders = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickedCategory, setPickedCategory] = useState<string>("toutes");

  const [loading, setLoading] = useState(false);
  const { username } = useLocalSearchParams();

  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      try {
        if (typeof username !== "string") return;

        const res = await getAllOrders({
          username,
          page: currentPage,
        });

        setOrders(res.orders);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [username, currentPage]);

  const handleOpenModal = (item: any) => {
    setModalVisible(true);
  };

  // const orders = [
  //   {
  //     id: 1,
  //     orderNumber: "#ORD-1024",
  //     customer: "Ahmed Benali",
  //     deliveryMethod: "Livraison à domicile",
  //     total: 1299,
  //     date: "12 Mai 2026",
  //     status: "En attente",
  //   },
  //   {
  //     id: 2,
  //     orderNumber: "#ORD-1025",
  //     customer: "Sara Amrani",
  //     deliveryMethod: "Retrait magasin",
  //     total: 895,
  //     date: "11 Mai 2026",
  //     status: "Confirmée",
  //   },
  //   {
  //     id: 3,
  //     orderNumber: "#ORD-1026",
  //     customer: "Youssef Tazi",
  //     deliveryMethod: "Livraison express",
  //     total: 749,
  //     date: "10 Mai 2026",
  //     status: "Livrée",
  //   },
  //   {
  //     id: 4,
  //     orderNumber: "#ORD-1027",
  //     customer: "Nadia Karim",
  //     deliveryMethod: "Livraison à domicile",
  //     total: 1999,
  //     date: "09 Mai 2026",
  //     status: "En attente",
  //   },
  //   {
  //     id: 5,
  //     orderNumber: "#ORD-1028",
  //     customer: "Mehdi Alaoui",
  //     deliveryMethod: "Retrait magasin",
  //     total: 149,
  //     date: "08 Mai 2026",
  //     status: "Annulée",
  //   },
  //   {
  //     id: 6,
  //     orderNumber: "#ORD-1029",
  //     customer: "Salma Idrissi",
  //     deliveryMethod: "Livraison express",
  //     total: 599,
  //     date: "07 Mai 2026",
  //     status: "Confirmée",
  //   },
  //   {
  //     id: 7,
  //     orderNumber: "#ORD-1030",
  //     customer: "Karim Chraibi",
  //     deliveryMethod: "Livraison à domicile",
  //     total: 399,
  //     date: "06 Mai 2026",
  //     status: "Livrée",
  //   },
  //   {
  //     id: 8,
  //     orderNumber: "#ORD-1031",
  //     customer: "Imane El Fassi",
  //     deliveryMethod: "Retrait magasin",
  //     total: 499,
  //     date: "05 Mai 2026",
  //     status: "En attente",
  //   },
  // ];

  const categories = [
    {
      id: 1,
      category: "toutes",
      label: "Toutes",
    },

    {
      id: 2,
      category: "pending",
      label: "En attente",
    },

    {
      id: 3,
      category: "confirmed",
      label: "Confirmée",
    },

    {
      id: 4,
      category: "completed",
      label: "Terminée",
    },

    {
      id: 5,
      category: "cancelled",
      label: "Annulée",
    },
  ];

  //
  const filteredOrders =
    pickedCategory.toLowerCase() === "toutes"
      ? orders
      : orders.filter(
          (order: any) =>
            order.order_status.toLowerCase() === pickedCategory.toLowerCase(),
        );

  const getVisiblePages = () => {
    const delta = 1;

    const range = [];

    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    // Always first page
    if (start > 1) {
      range.push(1);
    }

    // Left dots
    if (start > 2) {
      range.push("...");
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Right dots
    if (end < totalPages - 1) {
      range.push("...");
    }

    // Always last page
    if (end < totalPages) {
      range.push(totalPages);
    }

    return range;
  };

  if (loading) {
    return <Loading />;
  }

  if (orders.length < 1) {
    return (
      <View className="items-center justify-center py-20 px-6">
        {/* Icon */}
        <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-6">
          <Text className="text-5xl">📦</Text>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 text-center">
          Aucune commande
        </Text>

        {/* Description */}
        <Text className="text-gray-500 text-center mt-3 leading-6">
          Les commandes apparaîtront ici une fois que vos clients commenceront à
          acheter.
        </Text>
      </View>
    );
  }

  return (
    <>
      <View>
        {/* ADD BUTTON */}
        {/* <View className="">
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-slate-900 rounded-2xl py-4 flex-row items-center justify-center gap-2"
        >
          <Plus color="white" size={20} />

          <Text className="text-white font-semibold">Ajouter un produit</Text>
        </TouchableOpacity>
      </View> */}
        {/* CONTENT */}
        <View className="bg-white shadow-md rounded-2xl p-4 mt-4">
          {/* Search + Filter */}
          <View className="flex-row items-center gap-3 ">
            {/* Search Input */}
            <View className="flex-1 relative">
              <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-2 h-12 shadow-sm">
                <Search size={20} color="#6B7280" style={{ marginRight: 10 }} />

                <TextInput
                  placeholder="Recherche une commande"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 text-[15px] text-black"
                />
              </View>
            </View>

            {/* Filter Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleOpenModal}
              className="h-12 px-3 bg-black rounded-2xl items-center justify-center flex-row gap-2 shadow-sm"
            >
              <Filter size={18} color="white" />

              <Text className="text-white font-semibold text-sm">Filters</Text>
            </TouchableOpacity>
          </View>
          {/* -- */}
          <View className="my-5 items-center flex-row flex-1 gap-3">
            <View className="w-full h-px bg-blue-600 flex-1" />
            <View className="bg-blue-50 px-4 py-2 rounded-full">
              <Text className="font-semibold text-blue-700 text-sm">
                {filteredOrders.length} commande
                {filteredOrders.length > 1 ? "s" : ""}
                {" • "}
                {pickedCategory}
              </Text>
            </View>
            <View className="w-full h-px bg-blue-600 flex-1" />
          </View>
          {/* products list */}
          <View className="flex-col gap-3">
            {filteredOrders.map((item: any) => {
              const orderConfig = orderStatusConfig[item.order_status];
              const paymentConfig = paymentStatusConfig[item.payment_status];
              const fulfillmentConfig =
                fulfillmentStatusConfig[item.fulfillment_status];

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.85}
                  onPress={() =>
                    router.push(
                      `/digital-profile/management/${username}/store/orders/${item.id}`,
                    )
                  }
                  className={`bg-white border border-gray-100 rounded-3xl p-4 shadow-sm border-l-4 ${orderConfig.border}`}
                >
                  {/* Header */}
                  <View className="flex-row items-start justify-between">
                    <View>
                      <Text className="text-lg font-bold text-black">
                        #ORD-{item.id}
                      </Text>

                      <Text className="text-gray-500 mt-1">
                        {item.orderCustomer?.name}
                      </Text>
                    </View>

                    {/* badge */}
                    <View
                      className={`px-3 py-1 rounded-full ${orderConfig.badge}`}
                    >
                      <Text
                        className={`text-xs font-semibold ${orderConfig.text}`}
                      >
                        {orderConfig.label}
                      </Text>
                    </View>
                  </View>

                  {/* Divider */}
                  <View className="h-px bg-gray-100 my-4" />

                  {/* Infos */}
                  {/* Infos */}
                  <View className="gap-y-2">
                    <View className="flex-row justify-between">
                      <Text className="text-gray-500">Méthode</Text>

                      <Text className="font-medium text-black capitalize">
                        {item.delivery_method}
                      </Text>
                    </View>

                    <View className="flex-row justify-between">
                      <Text className="text-gray-500">Date</Text>

                      <Text className="font-medium text-black">
                        {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                      </Text>
                    </View>

                    <View className="flex-row justify-between">
                      <Text className="text-gray-500">Montant</Text>

                      <Text className="text-lg font-bold text-black">
                        {item.total_price} MAD
                      </Text>
                    </View>

                    <View className="flex-row justify-between">
                      <Text className="text-gray-500">Paiement</Text>

                      <Text className={`font-semibold ${paymentConfig.color}`}>
                        {paymentConfig.label}
                      </Text>
                    </View>

                    <View className="flex-row justify-between">
                      <Text className="text-gray-500">Fulfillment</Text>

                      <Text
                        className={`font-semibold ${fulfillmentConfig.color}`}
                      >
                        {fulfillmentConfig.label}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            {/* PAGINATION */}
            {totalPages > 1 && (
              <View className="mt-6 gap-y-3">
                {/* Page numbers row */}
                <View className="flex-row items-center justify-center gap-2 flex-wrap">
                  {getVisiblePages().map((page, index) => {
                    if (page === "...") {
                      return (
                        <View
                          key={`dots-${index}`}
                          className="w-9 h-9 items-center justify-center"
                        >
                          <Text className="text-gray-400 font-bold">···</Text>
                        </View>
                      );
                    }
                    return (
                      <TouchableOpacity
                        key={`page-${page}`}
                        onPress={() => setCurrentPage(Number(page))}
                        className={`w-9 h-9 rounded-xl items-center justify-center ${
                          currentPage === page ? "bg-black" : "bg-gray-100"
                        }`}
                      >
                        <Text
                          className={`font-semibold text-sm ${
                            currentPage === page ? "text-white" : "text-black"
                          }`}
                        >
                          {page}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Prev / Page info / Next row */}
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    disabled={currentPage === 1}
                    onPress={() => setCurrentPage((prev) => prev - 1)}
                    className={`px-4 py-2.5 rounded-2xl ${
                      currentPage === 1 ? "bg-gray-100" : "bg-black"
                    }`}
                  >
                    <Text
                      className={`font-semibold text-sm ${
                        currentPage === 1 ? "text-gray-400" : "text-white"
                      }`}
                    >
                      ← Précédent
                    </Text>
                  </TouchableOpacity>

                  <Text className="text-gray-400 text-sm font-medium">
                    {currentPage} / {totalPages}
                  </Text>

                  <TouchableOpacity
                    disabled={currentPage === totalPages}
                    onPress={() => setCurrentPage((prev) => prev + 1)}
                    className={`px-4 py-2.5 rounded-2xl ${
                      currentPage === totalPages ? "bg-gray-100" : "bg-black"
                    }`}
                  >
                    <Text
                      className={`font-semibold text-sm ${
                        currentPage === totalPages
                          ? "text-gray-400"
                          : "text-white"
                      }`}
                    >
                      Suivant →
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Overlay */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          className="absolute inset-0 bg-gray-300/70"
        />
        <View className="flex-1 bg-black/40 items-center justify-center px-6">
          <View className="bg-white w-full max-h-[500px] rounded-3xl p-6">
            <View className="items-center flex-row justify-between">
              <Text className="text-xl font-bold text-black ">
                Filtrer les commandes
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setModalVisible(false)}
                className="p-1 rounded-lg bg-gray-100 shadow-md"
              >
                <X size={24} />
              </TouchableOpacity>
            </View>

            <Text className="text-gray-500 mb-4">par catégories</Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              className="max-h-[320px]"
              contentContainerStyle={{
                paddingBottom: 10,
              }}
            >
              <View className="flex-col items-center gap-y-2">
                {categories.map((item) => {
                  const activeCategory =
                    pickedCategory.toLowerCase() ===
                    item.category.toLowerCase();

                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.85}
                      onPress={() => {
                        setPickedCategory(item.category);
                        setModalVisible(false);
                      }}
                      className={`
        w-full rounded-2xl border px-4 py-4
        flex-row items-center justify-between
        ${
          activeCategory
            ? "bg-black border-black"
            : "bg-gray-50 border-gray-200"
        }
      `}
                    >
                      {/* Left Content */}
                      <View className="flex-row items-center gap-3">
                        {/* Circle Indicator */}
                        <View
                          className={`
            w-4 h-4 rounded-full border-2 items-center justify-center
            ${activeCategory ? "border-white bg-white" : "border-gray-400"}
          `}
                        >
                          {activeCategory && (
                            <View className="w-2 h-2 rounded-full bg-black" />
                          )}
                        </View>

                        {/* Category Name */}
                        <Text
                          className={`
            text-[15px] font-semibold
            ${activeCategory ? "text-white" : "text-gray-900"}
          `}
                        >
                          {item.category}
                        </Text>
                      </View>

                      {/* Active Badge */}
                      {activeCategory && (
                        <View className="bg-white/20 px-3 py-1 rounded-full">
                          <Text className="text-white text-xs font-semibold">
                            Selected
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default orders;

const styles = StyleSheet.create({});
