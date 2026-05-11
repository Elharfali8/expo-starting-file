import { Redirect, useLocalSearchParams } from "expo-router";

export default function Index() {
  const { username } = useLocalSearchParams();

  if (!username || typeof username !== "string") {
    return null;
  }

  return <Redirect href={`/digital-profile/management/${username}/home`} />;
}
