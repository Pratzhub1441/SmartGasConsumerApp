import { View, Text } from 'react-native';
import styles from './CustomHeader.style';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../assets/colors/colors';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../shared/api/ServiceApi';

const CustomHeader = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    logout()
    .then((res)=> {
      navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      }),
    );
    })
    .catch((err)=> {

    })
  };

  return (
    <LinearGradient
      colors={[colors.linearGradientStart1, colors.linearGradientend1]}
      style={styles.headerContainer}
    >
      <View style={styles.headerWrapper}>
        <View style={styles.leftSection}>
          <Icon name="menu" size={30} color={colors.textColor3} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: colors.textColor,
              marginLeft: 22,
            }}
          >
            AGCL Smart Gas
          </Text>
        </View>
        <View style={styles.rightSection}>
          <Icon name="manage-accounts" size={30} color={colors.textColor3} />
          <Icon
            name="logout"
            size={25}
            color={colors.textColor3}
            onPress={handleLogout}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default CustomHeader;
