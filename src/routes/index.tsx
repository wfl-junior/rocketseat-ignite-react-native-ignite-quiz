import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import { THEME } from "../styles/theme";

import { AppRoutes } from "./app.routes";

export function Routes() {
  return (
    <View style={{ flex: 1, backgroundColor: THEME.COLORS.GRAY_800 }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}
