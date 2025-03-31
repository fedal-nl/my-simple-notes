import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import images from "@/constants/images";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
// 67c85dd1001e4ebcf404
const HomeScreen = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.replace("/notes");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff8c00" />
      </View>
    );
  }


  return (
    <View
      style={styles.container}
    >
      <Image source={images.notes} style={styles.notesImg}/>
      <Text style={styles.title}>Welcome to the notes app</Text>
      <Text style={styles.subtitle}>This is a simple note taking app</Text>
      <TouchableOpacity
        onPress={() => router.push("/notes")}
        style={styles.button}
        >
        <Text style={{color: "#fff"}}>Get started</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  notesImg: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: "#ff8c00",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
  }
});

export default HomeScreen;