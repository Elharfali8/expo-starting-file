import { Redirect, useLocalSearchParams } from "expo-router";

const Store = () => {
  const { username } = useLocalSearchParams();

  return (
    <Redirect href={`/digital-profile/management/${username}/store/products`} />
  );
};

export default Store;
