import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../assets/colors/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { logout } from '../../shared/api/ServiceApi';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const ViewMore = () => {
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();

  const handleLogout = () => {
    logout()
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          }),
        );
      })
      .catch(err => console.error(err));
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: tabBarHeight + 20,
      }}
      style={{
        flex: 1,
      }}
    >
      <LinearGradient
        colors={[colors.linearGradientStart1, colors.linearGradientend1]}
        style={{
          width: '100%',
          paddingTop: 40,
          paddingHorizontal: 20,

        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: colors.textColor3,
            borderWidth: 1,
            borderRadius: 5,
            padding: 20,
          }}
          onPress={handleLogout}
        >
          <Icon name="logout" size={25} color={colors.textColor3} />
          <Text
            style={{
              fontSize: 24,
              fontWeight: '500',
              color: colors.textColor3,
              marginLeft: 10,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default ViewMore;
