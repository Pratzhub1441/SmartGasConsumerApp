import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from './Consumption.styles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import colors from '../../assets/colors/colors';
import CustomHeader from '../../components/customHeader/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Comparision from './Comparision/Comparision';
import History from './History/History';

const Consumption = () => {
  const [flag, setFlag] = useState(false);
  const [comparision, setComparision] = useState(true);
  const tabBarHeight = useBottomTabBarHeight();

  console.log(comparision);

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        {!flag ? (
          <CustomHeader />
        ) : (
          <LinearGradient
            colors={[colors.linearGradientStart1, colors.linearGradientend1]}
            style={styles.headerContainer}
          >
            <Icon
              name="arrow-back"
              size={30}
              color="#000"
              onPress={() => setFlag(false)}
              style={{ margin: 10 }}
            />
          </LinearGradient>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{
        }}
        style={{
          flex: 1,
        }}
      >
        <LinearGradient
          colors={[colors.linearGradientStart1, colors.linearGradientend1]}
          style={{
            width: '100%',
            paddingTop: 70,
            paddingBottom: 70,
          }}
        >
          <View style={styles.wrapper}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                borderColor: "#eeeeeeff",
                backgroundColor: '#EFF5F6',
                borderTopWidth: 4,
                borderRadius: 14,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 14,
  elevation: 5,  
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  borderRadius: 14,
                  overflow: 'hidden',
                  backgroundColor: comparision
                    ? colors.background1
                    : 'transparent',
                }}
                onPress={() => setComparision(true)}
              >
                <Icon name="compare" size={16} color={comparision ? colors.background : colors.textColor} />
                <Text
                  style={{
                    paddingVertical: 15,
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: '500',
                    color: comparision ? colors.background : colors.textColor,
                  }}
                >
                  Comparision
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  borderRadius: 14,
                  overflow: 'hidden',
                  backgroundColor: !comparision
                    ? colors.background1
                    : 'transparent',
                }}
                onPress={() => setComparision(false)}
              >
                <Icon name="history" size={16} color={!comparision ? colors.background : colors.textColor} />
                <Text
                  style={{
                    paddingVertical: 15,
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: '500',
                    color: !comparision ? colors.background : colors.textColor,
                  }}
                >
                  History
                </Text>
              </TouchableOpacity>
            </View>

            {comparision ? (
              <View>
                <Comparision />
              </View>
            ) : (
              <View>
                <History />
              </View>
            )}
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default Consumption;
