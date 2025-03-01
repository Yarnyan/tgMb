import { useLoginMutation } from "@/store/api/Auth";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    const [login] = useLoginMutation();

    const onSubmit = async (data: any) => {
        const sanitizedPhoneNumber = String(data.phoneNumber).replace(/[+\-\s]/g, '');
        const body = { phone: sanitizedPhoneNumber };

        try {
            const res = await login(body);
            if (res.error) {
                setErrorMessage(res.error.data?.message);
            } else {
                const { token, refreshToken, userId } = res.data.data;
                
                await AsyncStorage.setItem("token", String(token));
                await AsyncStorage.setItem("refreshToken", String(refreshToken));
                await AsyncStorage.setItem("userId", String(userId));
                router.push("/");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <View className="w-full h-[100dvh] flex justify-center items-center flex-col px-4">
            <Image source={require("../../../assets/image/Lock.png")} className="w-24 h-24" resizeMode="contain" />
            <View className="flex flex-col items-center">
                <Text className="text-[20px] font-bold mt-3" style={{ color: "#FFFFFF" }}>
                    Sign in to TeleClone
                </Text>
                <Text className="text-[#8F8F8F] text-[14px] max-w-[340px] text-center mt-2">
                    Please provide your phone number with the correct country code to access your account
                </Text>
                <Controller
                    control={control}
                    name="phoneNumber"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            onChangeText={onChange}
                            value={value}
                            placeholder="+0 000 000 00 00"
                            placeholderTextColor={"#8F8F8F"}
                            style={{ backgroundColor: "#272727", color: "#FFFFFF" }}
                            className="w-[340px] h-[50px] rounded-[20px] pl-[16px] mt-4"
                        />
                    )}
                />
                {errors.phoneNumber && <Text className="text-red-500 mt-1">Phone number is required</Text>}
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className={`mt-4 w-full py-3.5 rounded-[20px] w-[150px] ${
                        !errors.phoneNumber ? "bg-[#6558E8] text-[#FFFFFF]" : "bg-[#251D49] text-[#583FC3]"
                    }`}
                    disabled={!!errors.phoneNumber}
                >
                    <Text className="text-center text-white font-bold">Continue</Text>
                </TouchableOpacity>
                <Text className="text-center text-[#f8717c] mt-1">{errorMessage}</Text>
                <Text className="text-[#8F8F8F] text-[14px] max-w-[340px] text-center mt-1">
                    Don't have an account?
                    <Text className="text-[#6558E8]" onPress={() => router.push("/reg")}> Sign up</Text>
                </Text>
            </View>
        </View>
    );
}