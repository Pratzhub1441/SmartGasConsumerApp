import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './History.styles';
import colors from '../../../assets/colors/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBarChartView from '../../../components/ProgressiveBarChart/ProgressiveBarChartView';
import { getHistoryLog, getMSN } from '../../../shared/api/ServiceApi';
import GridView from '../../../components/GridView/GridView';

const History = () => {
  const [toggle, setToggle] = useState(true);
  const [weekView, setWeekView] = useState(true);
  const [data, setData] = useState({});
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [averageConsumption, setAverageConsumption] = useState(0);

  const getHistoryLogApi = () => {
    getMSN()
      .then(msn => {
        const params = { msn };
        getHistoryLog(params)
          .then(res => {
            const d = res.data || {};
            setData(d);

            const total =
              d.lastSevenHoursHistory.consumption.total +
              d.lastOnedayHistory.consumption.total +
              d.lastWeekHistory.consumption.total +
              d.lastMonthHistory.consumption.total;

            const average =
              (d.lastSevenHoursHistory.consumption.average +
                d.lastOnedayHistory.consumption.average +
                d.lastWeekHistory.consumption.average +
                d.lastMonthHistory.consumption.average) / 4;

            setTotalConsumption(total);
            setAverageConsumption(average);
          })
          .catch(error => console.error("Error fetching history log:", error));
      })
      .catch(error => console.error("Error fetching MSN:", error));
  };

  useEffect(() => {
    getHistoryLogApi();
  }, []);

  return (
    <ScrollView style={styles.Container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.wrapper}>
        <View style={styles.containerA}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.textColor }}>
            Historic Consumption
          </Text>
          <Text style={{ fontSize: 14, color: colors.textColor }}>
            Historic consumption details on your finger tips.
          </Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10 }}>
          <View style={{ width: '40%', flexDirection: 'row', borderColor: '#eeeeeeff', backgroundColor: '#EFF5F6', borderTopWidth: 4, borderRadius: 14 }}>
            <View style={{ flex: 1, alignItems: 'center', borderRadius: 14, overflow: 'hidden', backgroundColor: weekView ? colors.background1 : 'transparent' }}>
              <Text
                onPress={() => setWeekView(true)}
                style={{ paddingVertical: 10, textAlign: 'center', fontSize: 14, fontWeight: '500', color: weekView ? colors.background : colors.textColor }}
              >
                Week
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', borderRadius: 14, overflow: 'hidden', backgroundColor: !weekView ? colors.background1 : 'transparent' }}>
              <Text
                onPress={() => setWeekView(false)}
                style={{ paddingVertical: 10, textAlign: 'center', fontSize: 14, fontWeight: '500', color: !weekView ? colors.background : colors.textColor }}
              >
                Month
              </Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: colors.background, borderRadius: 5, marginTop: 15, marginBottom: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 1, height: 300, }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ alignItems: 'center', gap: 5, borderColor: colors.textColor3, borderWidth: 0.5, borderRadius: 5, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 1 }}>
              <Icon
                name="bar-chart"
                size={19}
                style={{ borderRadius: 5, paddingVertical: 5, paddingHorizontal: 5, textAlign: 'center', backgroundColor: toggle ? colors.textColor3 : 'transparent', borderColor: toggle ? '#066EC2' : 'transparent', borderWidth: 0.5, color: toggle ? colors.background : colors.textColor3 }}
                onPress={() => setToggle(true)}
              />
            </View>
            <View style={{ alignItems: 'center', gap: 5, borderColor: colors.textColor3, borderWidth: 0.5, borderRadius: 5, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 1 }}>
              <Icon
                name="grid-view"
                size={19}
                style={{ borderRadius: 5, paddingVertical: 5, paddingHorizontal: 5, textAlign: 'center', backgroundColor: !toggle ? colors.textColor3 : 'transparent', borderColor: !toggle ? '#066EC2' : 'transparent', borderWidth: 0.5, color: !toggle ? colors.background : colors.textColor3 }}
                onPress={() => setToggle(false)}
              />
            </View>
          </View>

          <View style={{ paddingBottom: 15 }}>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              {toggle ? (
                <ProgressBarChartView
                  data={weekView ? data.lastWeekHistory?.graphData ?? [] : data.lastMonthHistory?.graphData ?? []}
                />
              ) : (
                <GridView
                  data={weekView ? data.lastSevenHoursHistory?.graphData ?? [] : data.lastOnedayHistory?.graphData ?? []}
                />
              )}
            </View>
          </View>

          <View style={{ marginTop: 30, }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              X Axis : Days Y Axis : Consumption(Kwh)
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              (Click on the chart to see the value)
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: 5, marginBottom: 20, paddingVertical: 20, paddingHorizontal: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 1 }}>
          <View>
            <Text style={{ fontSize: 13, color: colors.textColor }}>Total Consumption</Text>
            <Text style={{ fontSize: 28, fontWeight: 600, color: colors.textColor3 }}>
              {totalConsumption}{' '}
              <Text style={{ fontSize: 22, fontWeight: 600, color: colors.textColor3 }}>kWh</Text>
            </Text>
          </View>
          <Icon name="bar-chart" size={80} color={colors.textColor3} />
        </View>

        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: 5, marginBottom: 20, paddingVertical: 20, paddingHorizontal: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 1 }}>
          <Icon name="bar-chart" size={80} color={colors.textColor3} />
          <View>
            <Text style={{ fontSize: 13, color: colors.textColor }}>Average Consumption</Text>
            <Text style={{ fontSize: 28, fontWeight: 600, color: colors.textColor3 }}>
              {averageConsumption}{' '}
              <Text style={{ fontSize: 22, fontWeight: 600, color: colors.textColor3 }}>kWh</Text>
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: colors.textColor3 }}>Disclaimer</Text>
          <Text style={{ textAlign: 'center', fontSize: 10, color: colors.textColor2 }}>
            The displayed consumption is only for information purposes and might be estimated in some cases. So, please do not infer this as the exact billing for consumption
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default History;
