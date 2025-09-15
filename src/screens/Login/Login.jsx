import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from './Login.styles';
import colors from '../../assets/colors/colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';
import { login } from '../../shared/api/ServiceApi';

const Login = ({ navigation }) => {
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('Invalid details');

  const handleLogin = async () => {
    if (!customerId || !password) {
      Alert.alert('Error', 'Please enter credentials');
      return;
    }

    const requestBody = {
      Username: customerId,
      Password: password,
    };

    login(requestBody)
      .then((res) => {
        console.log('Login response:', res);
        navigation.navigate('main');
      })
      .catch((err) => {
        console.error('Login error:', err);
        Alert.alert('Error', err?.error || 'Login failed');
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.linearGradientStart, colors.linearGradientend]}
        style={styles.linearGradient}
      />
      <View
        style={{
          position: 'absolute',
          top: 10,
        }}
      >
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: 200,
            height: 300,
            resizeMode: 'contain',
            marginBottom: 20,
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.header}>Login to your Account</Text>

        <View style={styles.inputRows}>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Customer Id</Text>
            <TextInput
              style={styles.textInput}
              value={customerId}
              keyboardType="numeric"
              onChangeText={text => setCustomerId(text)}
              editable={true}
              contextMenuHidden={false}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
              editable={true}
              contextMenuHidden={false}
            />
          </View>
        </View>

        <View style={styles.loginBottom}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
              {isChecked ? (
                <LinearGradient
                  colors={[
                    colors.linearGradientStart,
                    colors.linearGradientend,
                  ]}
                  style={styles.checkBox}
                >
                  <Icon name="check" size={20} color="white" />
                </LinearGradient>
              ) : (
                <View
                  style={[
                    styles.checkBox,
                    {
                      borderWidth: 1,
                      borderColor: colors.borderColor,
                      backgroundColor: 'transparent',
                    },
                  ]}
                />
              )}
            </TouchableOpacity>
            <Text style={{ marginLeft: 10, color: colors.textColor }}>
              Remember me
            </Text>
          </View>

          <TouchableOpacity onPress={() => alert('Forgot Password pressed!')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%' }}>
          <TouchableOpacity onPress={handleLogin}>
            <LinearGradient
              colors={[colors.linearGradientStart, colors.linearGradientend]}
              style={styles.loginBtn}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: colors.backgroundContainer,
                }}
              >
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: colors.textColor,
            }}
          >
            Dont have an Account?
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.linkColor,
            }}
          >
            Sign up
          </Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: colors.textColor,
          }}
        >
          Powerd by Esyasoft
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: colors.textColor,
          }}
        >
          V 2.0
        </Text>
      </View>
    </View>
  );
};

export default Login;
