import NavigationStack from "./components/navigation/navigation";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./redux/store";
import { theme } from "./utils/theme";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationStack />
      </PaperProvider>
    </Provider>
  );
}
