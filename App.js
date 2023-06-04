import NavigationStack from "./components/navigation/navigation";
import { PaperProvider } from "react-native-paper";
import { theme } from "./utils/theme";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationStack />
    </PaperProvider>
  );
}
