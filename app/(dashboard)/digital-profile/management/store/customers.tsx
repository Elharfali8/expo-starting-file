import { ChevronRight, Phone, Plus, Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ── moved outside component so it's never recreated ─────────────────────────
const ALL_CUSTOMERS = [
  { id: "1", name: "Youssef", phone: "+212611765659" },
  { id: "2", name: "Test", phone: "+212765454637" },
  { id: "3", name: "Yasin El Ouardi", phone: "+212618184845" },
  { id: "4", name: "Karim Benali", phone: "+212600112233" },
  { id: "5", name: "Sara Moukrim", phone: "+212699887766" },
  { id: "6", name: "Omar Fassi", phone: "+212655443322" },
  { id: "7", name: "Nadia Chraibi", phone: "+212677001122" },
];

const PAGE_SIZE = 6;

const Customers = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // ── filter by search ───────────────────────────────────────────────────────
  const filtered = ALL_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );

  // ── paginate ───────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages); // reset if filter shrinks pages
  const pageData = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSearch = (text: string) => {
    setSearch(text);
    setPage(1); // reset to page 1 on new search
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
          <Text className="text-[20px] font-bold text-slate-900">Clients</Text>

          {/* SEARCH */}
          <View className="mt-4 flex-row items-center bg-slate-100 rounded-2xl px-4 h-12">
            <Search size={18} color="#64748B" />
            <TextInput
              value={search}
              onChangeText={handleSearch}
              placeholder="Recherche..."
              placeholderTextColor="#94A3B8"
              className="flex-1 ml-3 text-slate-900 text-[15px]"
            />
          </View>
        </View>

        {/* LIST */}
        {pageData.length === 0 ? (
          <View className="py-12 items-center">
            <Text className="text-slate-400 text-[14px]">Aucun client trouvé</Text>
          </View>
        ) : (
          <FlatList
            data={pageData}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // prevents conflict if inside a ScrollView
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                className="px-4 py-4 border-b border-slate-100 flex-row items-center justify-between"
              >
                <View className="flex-row items-center flex-1">
                  {/* AVATAR */}
                  <View className="w-12 h-12 rounded-2xl bg-slate-900 items-center justify-center">
                    <Text className="text-white font-bold text-[16px] uppercase">
                      {item.name.charAt(0)}
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
        {/* FOOTER — only shown when there's more than 1 page */}
        {/* PAGINATION */}
{totalPages > 1 && (
  <View className="flex-row items-center justify-between mt-6 mb-2">

    {/* Previous */}
    <TouchableOpacity
      disabled={safePage === 1}
      onPress={() => setPage((p) => p - 1)}
      className={`px-5 py-3 rounded-2xl ${
        safePage === 1 ? "bg-gray-200" : "bg-black"
      }`}
    >
      <Text className={`font-semibold ${
        safePage === 1 ? "text-gray-400" : "text-white"
      }`}>
        Précédent
      </Text>
    </TouchableOpacity>

    {/* Page numbers */}
    <View className="flex-row items-center gap-2">
      {Array.from({ length: totalPages }).map((_, index) => {
        const p = index + 1;
        return (
          <TouchableOpacity
            key={p}
            onPress={() => setPage(p)}
            className={`w-10 h-10 rounded-xl items-center justify-center ${
              safePage === p ? "bg-black" : "bg-gray-100"
            }`}
          >
            <Text className={`font-semibold ${
              safePage === p ? "text-white" : "text-black"
            }`}>
              {p}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>

    {/* Next */}
    <TouchableOpacity
      disabled={safePage === totalPages}
      onPress={() => setPage((p) => p + 1)}
      className={`px-5 py-3 rounded-2xl ${
        safePage === totalPages ? "bg-gray-200" : "bg-black"
      }`}
    >
      <Text className={`font-semibold ${
        safePage === totalPages ? "text-gray-400" : "text-white"
      }`}>
        Suivant
      </Text>
    </TouchableOpacity>

  </View>
)}
    </View>
  );
};

export default Customers;