import { Stack } from 'expo-router';


const AuthLayout = () => {
  return (
    <Stack 
        screenOptions={
            {
                headerShown: false,
                contentStyle: {
                    backgroundColor: "#f8f9fa",
                    paddingHorizontal: 10,
                    paddingTop: 10,
                }
            }
        }
    />
  )
}

export default AuthLayout;