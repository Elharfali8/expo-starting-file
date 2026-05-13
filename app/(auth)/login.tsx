import { loginUser } from "@/services/api";
import { saveToken } from "@/utils/storage";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
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
  const [showPassword, setShowPassword] = useState(false);

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
      className="flex-1 bg-[#F8FAFC]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View className="flex-1 bg-[#F8FAFC]">
        {/* BACKGROUND EFFECTS */}

        <View
          className="
            absolute
            top-[-120px]
            right-[-80px]
            w-[320px]
            h-[320px]
            rounded-full
            bg-blue-100/40
          "
        />

        <View
          className="
            absolute
            top-[120px]
            right-[-30px]
            w-[260px]
            h-[140px]
            rounded-[80px]
            border
            border-blue-100
            opacity-40
          "
        />

        <View
          className="
            absolute
            top-[140px]
            right-[-10px]
            w-[220px]
            h-[120px]
            rounded-[80px]
            border
            border-blue-100
            opacity-30
          "
        />

        {/* DOTS */}

        <View className="absolute top-[100px] right-8">
          {[1, 2, 3].map((row) => (
            <View key={row} className="flex-row gap-2 mb-2">
              {[1, 2, 3].map((dot) => (
                <View
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full bg-blue-200"
                />
              ))}
            </View>
          ))}
        </View>

        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 90,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* LOGO */}

          <View className="items-center mb-14">
            <View
              className="
                w-[140px]
                h-[140px]
                rounded-[38px]
                bg-white
                items-center
                justify-center
                border
                border-slate-100
              "
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.06,
                shadowRadius: 20,
                elevation: 8,
              }}
            >
              <Image
                source={require("@/assets/images/yascript.png")}
                style={{
                  width: 110,
                  height: 110,
                }}
                contentFit="contain"
              />
            </View>
          </View>

          {/* HEADER */}

          <View className="mb-10">
            <Text
              className="
                text-[38px]
                font-black
                text-slate-900
                tracking-tight
                mb-3
              "
            >
              Welcome back
            </Text>

            <Text
              className="
                text-[16px]
                leading-7
                text-slate-500
              "
            >
              Sign in to continue managing your dashboard.
            </Text>
          </View>

          {/* ERROR */}

          {error ? (
            <View
              className="
                bg-red-50
                border
                border-red-200
                rounded-3xl
                px-5
                py-4
                mb-6
              "
            >
              <Text className="text-red-600 text-sm font-medium">{error}</Text>
            </View>
          ) : null}

          {/* FORM */}

          <View className="gap-5 mb-8">
            {/* EMAIL */}

            <View>
              <Text className="text-sm font-semibold text-slate-700 mb-3 ml-1">
                Email address
              </Text>

              <View
                className="
                  h-[62px]
                  bg-white
                  border
                  border-slate-200
                  rounded-[24px]
                  flex-row
                  items-center
                  px-5
                  gap-4
                "
              >
                <Mail size={20} color="#64748B" />

                <TextInput
                  className="flex-1 text-slate-900 text-[15px]"
                  placeholder="you@example.com"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  onFocus={() =>
                    scrollViewRef.current?.scrollTo({
                      y: 0,
                      animated: true,
                    })
                  }
                />
              </View>
            </View>

            {/* PASSWORD */}

            {/* PASSWORD */}

            <View>
              <Text className="text-sm font-semibold text-slate-700 mb-3 ml-1">
                Password
              </Text>

              <View
                className="
      h-[62px]
      bg-white
      border
      border-slate-200
      rounded-[24px]
      flex-row
      items-center
      px-5
      gap-4
    "
              >
                <Lock size={20} color="#64748B" />

                <TextInput
                  ref={passwordRef}
                  className="flex-1 text-slate-900 text-[15px]"
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  onFocus={() =>
                    scrollViewRef.current?.scrollTo({
                      y: 200,
                      animated: true,
                    })
                  }
                />

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#64748B" />
                  ) : (
                    <Eye size={20} color="#64748B" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* BUTTON */}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleLogin}
            disabled={loading}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <LinearGradient
              colors={["#2563EB", "#1D4ED8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="
                h-[62px]
                items-center
                justify-center
              "
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-[16px] font-bold">
                  Sign In
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* FOOTER */}

          <View className="items-center mt-10">
            <Text className="text-slate-400 text-[13px]">
              Secure access powered by Yascript
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
