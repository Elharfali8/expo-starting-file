import { Link } from "expo-router";
import { Text, View } from "react-native";

const Dashboard = () => {
  return (
    <View className="flex-1 bg-gray-100 items-center justify-center">
      <Link href={'/(auth)/login'}>go back to login</Link>
    </View>
  );
};

export default Dashboard;
