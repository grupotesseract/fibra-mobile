export const checkAuth = async ({ auth, navigation, origin = '-'}) => {
    if (!auth.loading && !auth.error && auth.data && auth.data.token) {
        navigation.navigate('Menu');
        return;
    }
    navigation.navigate('Login');
}