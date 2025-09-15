import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './Comparision.styles';
import colors from '../../../assets/colors/colors';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBarChartView from '../../../components/ProgressiveBarChart/ProgressiveBarChartView';
import { getConsumptionaLog, getMSN } from '../../../shared/api/ServiceApi';
import GridView from '../../../components/GridView/GridView';

const Comparision = () => {
  const [toggle, setToggle] = useState(true);
  const [data, setData] = useState({});

  const getConsumptionLogApi = () => {
    getMSN().then(msn => {
      const params = { msn };
      getConsumptionaLog(params)
        .then(res => {
          setData(res.data || {});
        })
        .catch(error => {
          console.error("Error fetching consumption log:", error);
        });
    }).catch(error => {
      console.error("Error fetching MSN:", error);
    });
  };

  useEffect(() => {
    getConsumptionLogApi();
  }, []);

  return (
    <ScrollView style={styles.Container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.wrapper}>
        <View style={styles.containerA}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.textColor }}>
            Unit{' '}
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.textColor3 }}>
              Comparsion
            </Text>
          </Text>
          <Text style={{ fontSize: 14, color: colors.textColor }}>
            Compare your daily, weekly & monthly consumption to keep a tab on energy usage
          </Text>
        </View>
        <View style={styles.contianers}>
          <Text style={{ textAlign: 'center', fontSize: 12, color: colors.textColor, marginBottom: 10 }}>
            Today’s Comparsion (in Kwh)
          </Text>
          <View style={{ gap: 10 }}>
            {["today", "yesterday"].map((key, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ color: colors.textColor3, fontSize: 20, fontWeight: '600' }}>
                    {data?.[key]?.value ?? (key === "today" ? "96.88" : "496.88")}
                  </Text>
                  <Text style={{ color: '#ADADAD', fontSize: 10 }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                </View>
                <View style={{ position: 'relative' }}>
                  <Progress.Bar
                    progress={0.3}
                    width={300}
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
            ))}
          </View>
        </View>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 5,
          marginTop: 10,
          marginBottom: 20,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 1,
          height: 300,
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, }}>
            <View style={{ alignItems: 'center', gap: 5, borderColor: colors.textColor3, borderWidth: 0.5, borderRadius: 5, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 1 }}>
              <Text
                style={{
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                  backgroundColor: toggle ? colors.textColor3 : 'transparent',
                  borderColor: toggle ? '#066EC2' : 'transparent',
                  borderWidth: 0.5,
                  color: toggle ? colors.background : colors.textColor3,
                }}
                onPress={() => setToggle(true)}
              >
                Week
              </Text>
            </View>
            <View style={{ alignItems: 'center', gap: 5, borderColor: colors.textColor3, borderWidth: 0.5, borderRadius: 5, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 1 }}>
              <Icon
                name="grid-view"
                size={19}
                style={{
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  textAlign: 'center',
                  backgroundColor: !toggle ? colors.textColor3 : 'transparent',
                  borderColor: !toggle ? '#066EC2' : 'transparent',
                  borderWidth: 0.5,
                  color: !toggle ? colors.background : colors.textColor3,
                }}
                onPress={() => setToggle(false)}
              />
            </View>
          </View>
          <View style={{ paddingVertical: 15 }}>
            {toggle ? (
              <ProgressBarChartView data={data?.weeklycomparison?.currentweek ?? []} />
            ) : (
              <GridView data={data?.weeklycomparison?.lastweek ?? []} />
            )}
          </View>
          <View style={{ alignItems: 'center', marginTop: 30, }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              X Axis : Days Y Axis : Consumption(Kwh)
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              (Click on the chart to see the value)
            </Text>
          </View>
        </View>
        <View style={styles.contianers}>
          <Text style={{ textAlign: 'center', fontSize: 12, color: colors.textColor, marginBottom: 10 }}>
            Month’s Comparsion (in Kwh)
          </Text>
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ color: colors.textColor3, fontSize: 20, fontWeight: '600' }}>
                  {data?.monthlycomparison?.current?.value ?? "N/A"}
                </Text>
                <Text style={{ color: '#ADADAD', fontSize: 10 }}>
                  Current Month
                </Text>
              </View>
              <View style={{ position: 'relative' }}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ color: colors.textColor3, fontSize: 20, fontWeight: '600' }}>
                  {data?.monthlycomparison?.last?.value ?? "N/A"}
                </Text>
                <Text style={{ color: '#ADADAD', fontSize: 10 }}>
                  Last Month
                </Text>
              </View>
              <View style={{ position: 'relative' }}>
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
      </View>
    </ScrollView>
  );
};

export default Comparision;
