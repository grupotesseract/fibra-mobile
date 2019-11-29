export const checkAuth = async ({ auth, navigation, origin = '-'}) => {
    if (!auth.loading && !auth.error && auth.data && auth.data.token) {
        console.log("NAVEGANDO PRO MENU", origin, auth)
        navigation.navigate('Menu');
        return;
    }
    navigation.navigate('Login');
}