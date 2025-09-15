import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Dashboard.styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import CustomHeader from '../../components/customHeader/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../assets/colors/colors';
import CollapsibleView from '../../components/customHeader/CollapsibleView/CollapsibleView';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ProgressBarChartView from '../../components/ProgressiveBarChart/ProgressiveBarChartView';
import PaymentScreen from '../PaymentScreen/PaymentScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GridView from '../../components/GridView/GridView';
import { getDashBoard, getMSN } from '../../shared/api/ServiceApi';

const Dashboard = () => {
  const [flag, setFlag] = useState(false);
  const [value, setValue] = useState(50000);
  const [data, setData] = useState([]);
  const [dashboard, setDashboard]= useState([]);
  const [toggle, setToggle] = useState({
    weekView: true,
    gridView: false,
  });
  const tabBarHeight = useBottomTabBarHeight();

  const minValue = 0;
  const maxValue = 100000;
  const fill = ((value - minValue) / (maxValue - minValue)) * 100;

  const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_data');
    if (jsonValue != null) {
      const parsedData = JSON.parse(jsonValue);
      setData(parsedData);
      console.log('data:', parsedData);
    }
  } catch (e) {
    console.error('Failed to fetch data', e);
  }
};

const getDashboardData = () => {
    getMSN().then(msn => {
      const params = { msn };
      getDashBoard(params)
        .then(res => {
          setDashboard(res.data || {});
        })
        .catch(error => {
          console.error("Error fetching consumption log:", error);
        });
    }).catch(error => {
      console.error("Error fetching MSN:", error);
    });
  };

  useEffect(() => {
    getData();
    getDashboardData();
  }, []);

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
        contentContainerStye={{
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
            paddingBottom: 70,
          }}
        >
          {!flag ? (
            <View style={styles.wrapper}>
              <View style={styles.custId}>
                <Text style={styles.custIdLeft}>Customer ID</Text>
                <Text>:</Text>
                <Text style={styles.custIdRight}>{data.consumerId}</Text>
              </View>
              <View>
                <CollapsibleView
                  title="Account Code: A-3616"
                  connected={
                    !data.connectionStatus === 'Active'
                      ? 'Disconnected'
                      : 'Connected'
                  }
                >
                  <View
                    style={{
                      gap: 5,
                    }}
                  >
                    <Text>Employee code : NA</Text>
                    <Text>Company Name : APSEZL</Text>
                    <Text>Employee Name : W m</Text>
                  </View>
                </CollapsibleView>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  marginTop: 5,
                  position: 'relative',
                }}
              >
                <AnimatedCircularProgress
                  size={250}
                  width={15}
                  fill={fill}
                  tintColor={colors.textColor3}
                  backgroundColor="#EFF5F6"
                  rotation={-135}
                  arcSweepAngle={270}
                  onAnimationComplete={() => console.log('Animation complete')}
                  lineCap="round"
                  renderCap={({ center }) => (
                    <Circle
                      cx={center.x}
                      cy={center.y}
                      r="10"
                      fill="#fff"
                      stroke={colors.textColor3}
                      strokeWidth={1}
                    />
                  )}
                />
                <View
                  style={{
                    alignItems: 'center',
                    position: 'absolute',
                    top: 80,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                      color: colors.textColor3,
                    }}
                  >
                    ₹ {data.balanceAmount}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                    }}
                  >
                    {!data.connectionStatus === 'Active'
                      ? 'disconnected'
                      : 'connected'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 25,
                    backgroundColor: colors.textColor3,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 1,
                  }}
                  onPress={() => setFlag(prev => !prev)}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.background,
                    }}
                  >
                    Tap to recharge
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#ADADAD',
                    }}
                  >
                    Last recharge of ₹{data.lastRechargeAmount} on{' '}
                    {data.lastRechargeDate}
                  </Text>
                </View>
              </View>

              <View>
                <LinearGradient
                  colors={[
                    colors.linearGradientStart,
                    colors.linearGradientend,
                  ]}
                  style={{
                    borderRadius: 5,
                    marginTop: 20,
                    marginBottom: 20,
                    marginHorizontal: 5,
                    paddingTop: 20,
                    paddingHorizontal: 20,
                    paddingBottom: 16,
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <View
                        style={{
                          marginRight: 5,
                        }}
                      >
                        <Icon name="arrow-drop-up" size={30} color="#99B7BB" />
                        <Icon
                          name="arrow-drop-down"
                          size={30}
                          color={colors.background}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 40,
                            fontFamily: 'SevenSegment',
                            color: '#fff',
                          }}
                        >
                          4.936
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#fff',
                        }}
                      >
                        Total Vb (in SCM)
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 10,
                        color: '#fff',
                      }}
                    >
                      Updated on 25-09-2024 07:21:16
                    </Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={[styles.contianers, colors.shadow]}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: colors.textColor,
                    marginBottom: 10,
                  }}
                >
                  Consumption (in SCM)
                </Text>
                <View
                  style={{
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: colors.textColor3,
                          fontSize: 20,
                          fontWeight: 600,
                        }}
                      >
                        {dashboard?.consumption?.currentMonth?.percent}
                      </Text>
                      <Text
                        style={{
                          color: '#ADADAD',
                          fontSize: 10,
                        }}
                      >
                        This month
                      </Text>
                    </View>
                    <View
                      style={{
                        position: 'relative',
                      }}
                    >
                      <Progress.Bar
                        progress={0.3}
                        width={250}
                        height={10}
                        backgroundColor="#EFF5F6"
                        borderColor="#EFF5F6"
                        animated={true}
                        color={colors.textColor3}
                      />
                      <LinearGradient
                        colors={['#00000040', 'transparent']}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: 5,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: colors.textColor3,
                          fontSize: 20,
                          fontWeight: 600,
                        }}
                      >
                        {dashboard?.consumption?.lastMonth?.percent}
                      </Text>
                      <Text
                        style={{
                          color: '#ADADAD',
                          fontSize: 10,
                        }}
                      >
                        Last month
                      </Text>
                    </View>
                    <View
                      style={{
                        position: 'relative',
                      }}
                    >
                      <Progress.Bar
                        progress={0.3}
                        width={250}
                        height={10}
                        backgroundColor="#EFF5F6"
                        borderColor="#EFF5F6"
                        animated={true}
                        color={colors.textColor3}
                      />
                      <LinearGradient
                        colors={['#00000040', 'transparent']}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: 5,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 300,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginBottom: 20,
                  padding: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      borderColor: colors.textColor3,
                      borderWidth: 0.5,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        backgroundColor: toggle.weekView
                          ? colors.textColor3
                          : colors.background,
                        color: toggle.weekView
                          ? colors.background
                          : colors.textColor2,
                      }}
                      onPress={() => setToggle({ ...toggle, weekView: true })}
                    >
                      Week
                    </Text>
                    <Text
                      style={{
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        backgroundColor: !toggle.weekView
                          ? colors.textColor3
                          : colors.background,
                        color: !toggle.weekView
                          ? colors.background
                          : colors.textColor2,
                      }}
                      onPress={() => setToggle({ ...toggle, weekView: false })}
                    >
                      Month
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      borderColor: colors.textColor3,
                      borderWidth: 0.5,
                      borderRadius: 5,
                    }}
                  >
                    <Icon
                      name="bar-chart"
                      size={22}
                      style={{
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: toggle.gridView
                          ? colors.textColor3
                          : colors.background,
                        color: toggle.gridView
                          ? colors.background
                          : colors.textColor2,
                      }}
                      onPress={() => setToggle({ ...toggle, gridView: true })}
                    />
                    <Icon
                      name="grid-view"
                      size={22}
                      style={{
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: !toggle.gridView
                          ? colors.textColor3
                          : colors.background,
                        color: !toggle.gridView
                          ? colors.background
                          : colors.textColor2,
                      }}
                      onPress={() => setToggle({ ...toggle, gridView: false })}
                    />
                  </View>
                </View>

                <View style={{ flex: 1, marginTop: 30, }}>
                  {toggle.gridView ? (
                    <View>
                      <ProgressBarChartView
                        data={toggle.weekView ? dashboard?.barGraph?.week : dashboard?.barGraph?.month}
                      />
                    </View>
                  ) : (
                    <View style={{ flex: 1 }}>
                      <GridView data={toggle.weekView ? dashboard?.barGraph?.week : dashboard?.barGraph?.month} />
                    </View>
                  )}
                </View>

                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 10,
                      color: colors.textColor2,
                    }}
                  >
                    X Axis : Days / Month, Y Axis : Consumption (Kwh)
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 10,
                      color: colors.textColor2,
                    }}
                  >
                    (Click on the chart to see the value)
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: colors.background,
                  borderRadius: 5,
                  marginBottom: 20,
                  paddingVertical: 50,
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    color: colors.textColor,
                  }}
                >
                  Your Consumption
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 28,
                    fontWeight: 600,
                    color: colors.textColor3,
                  }}
                >
                  472.5{' '}
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 22,
                      color: colors.textColor3,
                    }}
                  >
                    kWh
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 30,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                    color: colors.textColor3,
                  }}
                >
                  Disclaimer
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    color: colors.textColor2,
                  }}
                >
                  The displayed consumption is only for information purposes and
                  might be estimated in some cases. So, please do not infer this
                  as the exact billing for consumption
                </Text>
              </View>
            </View>
          ) : (
            <LinearGradient
              colors={[colors.linearGradientStart1, colors.linearGradientend1]}
              style={{
                width: '100%',
                paddingBottom: 110,
              }}
            >
              <PaymentScreen />
            </LinearGradient>
          )}
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
