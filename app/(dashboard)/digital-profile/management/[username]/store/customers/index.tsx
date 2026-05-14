import { getAllCustomers } from "@/app/(dashboard)/digital-profile/api/store/customers";
import { useLocalSearchParams } from "expo-router";
import {
  ChevronRight,
  Phone,
  Plus,
  Search,
} from "lucide-react-native";

import React, { useEffect, useState } from "react";

import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PAGE_SIZE = 10;

const Customers = () => {
  const { username } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);

  const [customers, setCustomers] = useState<any[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  // debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  // fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);

      try {
        if (typeof username !== "string") return;

        const res = await getAllCustomers({
          username,
          search,
          page: currentPage,
          limit: PAGE_SIZE,
        });

        setCustomers(res.customers);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [username, currentPage, search]);

  const getVisiblePages = () => {
    const delta = 1;

    const range: (number | string)[] = [];

    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    if (start > 1) {
      range.push(1);
    }

    if (start > 2) {
      range.push("...");
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages - 1) {
      range.push("...");
    }

    if (end < totalPages) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <View className="flex-1 pt-6">
      {/* ADD BUTTON */}
      <TouchableOpacity
        activeOpacity={0.85}
        className="bg-slate-900 rounded-2xl h-14 flex-row items-center justify-center gap-2"
      >
        <Plus color="white" size={20} />

        <Text className="text-white text-[15px] font-semibold">
          Ajouter un client
        </Text>
      </TouchableOpacity>

      {/* CARD */}
      <View className="bg-white rounded-3xl mt-5 overflow-hidden border border-slate-200">
        {/* HEADER */}
        <View className="p-4 border-b border-slate-100">
          <Text className="text-[20px] font-bold text-slate-900">
            Clients
          </Text>

          {/* SEARCH */}
          <View className="mt-4 flex-row items-center bg-slate-100 rounded-2xl px-4 h-12">
            <Search size={18} color="#64748B" />

            <TextInput
              value={searchInput}
              onChangeText={setSearchInput}
              placeholder="Recherche..."
              placeholderTextColor="#94A3B8"
              className="flex-1 ml-3 text-slate-900 text-[15px]"
            />
          </View>
        </View>

        {/* LIST */}
        {customers.length === 0 ? (
          <View className="py-12 items-center">
            <Text className="text-slate-400 text-[14px]">
              Aucun client trouvé
            </Text>
          </View>
        ) : (
          <FlatList
            data={customers}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                className="px-4 py-4 border-b border-slate-100 flex-row items-center justify-between"
              >
                <View className="flex-row items-center flex-1">
                  {/* AVATAR */}
                  <View className="w-12 h-12 rounded-2xl bg-slate-900 items-center justify-center">
                    <Text className="text-white font-bold text-[16px] uppercase">
                      {item.name?.charAt(0)}
                    </Text>
                  </View>

                  {/* INFO */}
                  <View className="ml-3 flex-1">
                    <Text
                      numberOfLines={1}
                      className="text-slate-900 font-semibold text-[15px]"
                    >
                      {item.name}
                    </Text>

                    <View className="flex-row items-center mt-1">
                      <Phone size={14} color="#64748B" />

                      <Text className="text-slate-500 text-[13px] ml-2">
                        {item.phone}
                      </Text>
                    </View>
                  </View>
                </View>

                <ChevronRight size={18} color="#94A3B8" />
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <View className="mt-6 gap-y-3">
          {/* Pages */}
          <View className="flex-row items-center justify-center gap-2 flex-wrap">
            {getVisiblePages().map((page, index) => {
              if (page === "...") {
                return (
                  <View
                    key={`dots-${index}`}
                    className="w-9 h-9 items-center justify-center"
                  >
                    <Text className="text-gray-400 font-bold">
                      ···
                    </Text>
                  </View>
                );
              }

              return (
                <TouchableOpacity
                  key={`page-${page}`}
                  onPress={() => setCurrentPage(Number(page))}
                  className={`w-9 h-9 rounded-xl items-center justify-center ${
                    currentPage === page
                      ? "bg-black"
                      : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`font-semibold text-sm ${
                      currentPage === page
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {page}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Prev / Next */}
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              disabled={currentPage === 1}
              onPress={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className={`px-4 py-2.5 rounded-2xl ${
                currentPage === 1
                  ? "bg-gray-100"
                  : "bg-black"
              }`}
            >
              <Text
                className={`font-semibold text-sm ${
                  currentPage === 1
                    ? "text-gray-400"
                    : "text-white"
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
              onPress={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className={`px-4 py-2.5 rounded-2xl ${
                currentPage === totalPages
                  ? "bg-gray-100"
                  : "bg-black"
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
  );
};

export default Customers;