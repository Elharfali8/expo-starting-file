import { loginUser } from "@/services/api";
import { saveToken } from "@/utils/storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useRef, useState } from "react";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollViewRef = useRef<ScrollView>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(email, password);
          await saveToken(data.token);
      router.replace("/(dashboard)");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"} // ✅ fix Android too
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          paddingHorizontal: 24,
          paddingBottom: 40, // ✅ ensures space when keyboard is open
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* LOGO */}
        <View className="items-center mb-12">
          <Image
            source={require("@/assets/images/yascript.png")}
            style={{ width: 140, height: 140 }}
            contentFit="contain"
          />
        </View>

        {/* HEADER */}
        <View className="mb-10">
          <Text className="text-[34px] font-bold text-slate-900 mb-3 tracking-tight">
            Welcome back
          </Text>
          <Text className="text-base leading-6 text-slate-500">
            Sign in to continue managing your dashboard.
          </Text>
        </View>

        {/* ERROR */}
        {error ? (
          <View className="bg-red-50 border border-red-200 rounded-2xl px-4 py-4 mb-6">
            <Text className="text-red-500 text-sm font-medium">{error}</Text>
          </View>
        ) : null}

        {/* FORM */}
        <View className="gap-5 mb-8">
          {/* EMAIL */}
          <View>
            <Text className="text-sm font-medium text-slate-600 mb-2 ml-1">
              Email
            </Text>
            <TextInput
              className="bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-base"
              style={{ height: 58, paddingHorizontal: 20 }}
              placeholder="you@example.com"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next" // ✅ shows "Next" on keyboard
              onSubmitEditing={() => passwordRef.current?.focus()} // ✅ jumps to password
              onFocus={
                () => scrollViewRef.current?.scrollTo({ y: 0, animated: true }) // ✅ scroll up for email
              }
            />
          </View>

          {/* PASSWORD */}
          <View>
            <Text className="text-sm font-medium text-slate-600 mb-2 ml-1">
              Password
            </Text>
            <TextInput
              ref={passwordRef}
              className="bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-base"
              style={{ height: 58, paddingHorizontal: 20 }}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done" // ✅ shows "Done" on keyboard
              onSubmitEditing={handleLogin} // ✅ submits on Done
              onFocus={
                () =>
                  scrollViewRef.current?.scrollTo({ y: 200, animated: true }) // ✅ scroll down for password
              }
            />
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          className={`h-[58px] rounded-2xl items-center justify-center ${
            loading ? "bg-indigo-400" : "bg-indigo-600"
          }`}
          activeOpacity={0.9}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-semibold">Sign in</Text>
          )}
        </TouchableOpacity>

        {/* FOOTER */}
        {/* <View className="mt-8 items-center">
          <Text className="text-slate-400 text-sm">Secure dashboard access</Text>
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
