import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

export default function HeaderLogo() {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row" }}>
      <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
        Diabetic App
      </Text>
    </View>
  );
}
