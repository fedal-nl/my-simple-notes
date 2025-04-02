import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';


const AuthScreen = () => {
    const router = useRouter();
    const { register, login } = useAuth();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAuth = async () => {
        if (!email.trim() || !password.trim()) {
            setError("Email and password are required");
            return;
        }

        if (isRegistering && password !== confirmationPassword) {
            setError("Passwords do not match");
            return;
        }

        let response;
        if (isRegistering) {
            response = await register(email, password);
        } else {
            response = await login(email, password);
        }

        if (response.error) {
            setError(response.error);
        } else {
            router.replace("/notes");
            console.log('response', response);
        }
    }

    return (
        <View style={styles.container}>
        <Text style={styles.headerText}>{isRegistering ? 'Sign Up' : 'Login'}</Text>
        
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            placeholderTextColor={"#aaa"}
            keyboardType='email-address'
            textContentType='none'
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            placeholderTextColor={"#aaa"}
            textContentType='none'
            secureTextEntry
        />

        {isRegistering && (
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmationPassword}
                onChangeText={(text) => setConfirmationPassword(text)}
                autoCapitalize="none"
                placeholderTextColor={"#aaa"}
                secureTextEntry
            />
        )}

        <TouchableOpacity
            style={[styles.input, {backgroundColor: "#ff8c00"}]}
            onPress={() => { handleAuth(); }}
        >
            <Text style={{color: "#fff"}}>{isRegistering ? 'Sign Up' : 'Login'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => setIsRegistering(!isRegistering)}
        >
            <Text style={{color: "blue"}}>{isRegistering ? 'Already have an account? Login' : 'Create an account'}</Text>
        </TouchableOpacity>

        </View>
    )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#f8f9fa",
        },
        headerText: {
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
        },
        errorText: {
            color: "red",
            fontSize: 16,
        },
        input: {
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#ddd",
            marginBottom: 10,
            width: "100%",
        },
    })

export default AuthScreen;