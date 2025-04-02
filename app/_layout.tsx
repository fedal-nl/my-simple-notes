import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const HeaderLogout = () => {
  const { user, logout } = useAuth();

  return user ? (
    <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null;
}

const RootLayout = () => {
  return ( 
    <AuthProvider>
        <Stack 
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#ff8c00',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20
                },
                contentStyle: {
                  backgroundColor: '#fff',
                  paddingHorizontal: 10,
                  paddingTop: 10,
                },
                headerRight: () => <HeaderLogout />
              }}
          >
          <Stack.Screen name='index' options={{ title: 'Home'}} />
          <Stack.Screen name='notes' options={{ title: 'Notes'}} />
          <Stack.Screen name='auth' options={{ title: 'Login'}} />
          </Stack>
      </AuthProvider>
  )
}

const styles = StyleSheet.create({
  logoutBtn: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
  }
})

export default RootLayout;
