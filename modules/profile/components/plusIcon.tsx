import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const PlusIcon = () => {
    return (
        <View>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path d="M14.8033 5.43359H9.07666C7.94333 5.43359 7.44333 6.00026 7.13666 6.69359L5.42999 10.5336C5.12333 11.2269 5.28999 12.2603 5.80333 12.8203L10.3767 17.8469C11.2433 18.7936 12.6567 18.7936 13.5167 17.8469L18.0833 12.8136C18.5967 12.2469 18.7633 11.2203 18.45 10.5269L16.7433 6.68693C16.4367 6.00026 15.9367 5.43359 14.8033 5.43359Z" fill="url(#paint0_linear_996_5362)"/>
                <Path d="M19.8613 0.112305L20.9417 3.03194L23.8613 4.1123L20.9417 5.19267L19.8613 8.1123L18.781 5.19267L15.8613 4.1123L18.781 3.03194L19.8613 0.112305Z" fill="url(#paint1_linear_996_5362)"/>
                <Path d="M4.36133 14.6123L5.1716 16.802L7.36133 17.6123L5.1716 18.4226L4.36133 20.6123L3.55106 18.4226L1.36133 17.6123L3.55106 16.802L4.36133 14.6123Z" fill="url(#paint2_linear_996_5362)"/>
                <Path d="M9.36133 21L9.76646 22.0949L10.8613 22.5L9.76646 22.9051L9.36133 24L8.95619 22.9051L7.86133 22.5L8.95619 22.0949L9.36133 21Z" fill="url(#paint3_linear_996_5362)"/>
                <Defs>
                    <LinearGradient id="paint0_linear_996_5362" x1="30.486" y1="-7.68973" x2="-11.8923" y2="18.474" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#FF9C9C"/>
                        <Stop offset="0.393199" stopColor="#58A0FD"/>
                        <Stop offset="0.717055" stopColor="#3076FF"/>
                        <Stop offset="1" stopColor="#2BB3FF"/>
                    </LinearGradient>
                    <LinearGradient id="paint1_linear_996_5362" x1="30.9886" y1="-7.88769" x2="5.33927" y2="7.69995" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#FF9C9C"/>
                        <Stop offset="0.393199" stopColor="#58A0FD"/>
                        <Stop offset="0.717055" stopColor="#3076FF"/>
                        <Stop offset="1" stopColor="#2BB3FF"/>
                    </LinearGradient>
                    <LinearGradient id="paint2_linear_996_5362" x1="12.7068" y1="8.61231" x2="-6.53022" y2="20.303" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#FF9C9C"/>
                        <Stop offset="0.393199" stopColor="#58A0FD"/>
                        <Stop offset="0.717055" stopColor="#3076FF"/>
                        <Stop offset="1" stopColor="#2BB3FF"/>
                    </LinearGradient>
                    <LinearGradient id="paint3_linear_996_5362" x1="13.5341" y1="18" x2="3.91556" y2="23.8454" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#FF9C9C"/>
                        <Stop offset="0.393199" stopColor="#58A0FD"/>
                        <Stop offset="0.717055" stopColor="#3076FF"/>
                        <Stop offset="1" stopColor="#2BB3FF"/>
                    </LinearGradient>
                </Defs>
            </Svg>
        </View>
    );
}

export default PlusIcon;