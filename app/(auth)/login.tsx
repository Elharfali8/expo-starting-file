import { loginUser } from "@/services/api";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(email, password);
      console.log("token login :", data.token);
      router.replace("/(dashboard)");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-950"
      behavior={Platform.OS === "ios" ? "padding" : "padding"} // ✅ "padding" on both
      keyboardVerticalOffset={Platform.OS === "android" ? 30 : 0} // ✅ tweak if needed
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingVertical: 48,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ❌ Removed the inner <View> with flexGrow/justifyContent — redundant & breaks layout */}
        <View className="mb-10">
          <Text className="text-4xl font-bold text-white mb-2">
            Welcome back
          </Text>
          <Text className="text-slate-400 text-base">
            Sign in to your account
          </Text>
        </View>

        {error ? (
          <View className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6">
            <Text className="text-red-400 text-sm">{error}</Text>
          </View>
        ) : null}

        <View className="gap-4 mb-6">
          <View>
            <Text className="text-slate-400 text-sm mb-2 ml-1">Email</Text>
            <TextInput
              className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-4"
              placeholder="you@example.com"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-slate-400 text-sm mb-2 ml-1">Password</Text>
            <TextInput
              className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-4"
              placeholder="••••••••"
              placeholderTextColor="#64748b"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity
          className={`rounded-xl py-4 items-center ${loading ? "bg-indigo-400" : "bg-indigo-600"}`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-base">Sign in</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default login;
