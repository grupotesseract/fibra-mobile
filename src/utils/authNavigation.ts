import { setToken } from "../services/api";

export const checkAuth = async ({ auth, navigation }) => {
  if (!auth.loading && !auth.error && auth.data && auth.data.token) {
    await setToken(auth.data.token);
    navigation.navigate('Menu');
    return;
  }
  navigation.navigate('Login');
}
