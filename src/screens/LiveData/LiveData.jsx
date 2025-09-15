import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import styles from './LiveData.styles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import colors from '../../assets/colors/colors';
import CustomHeader from '../../components/customHeader/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CollapsibleView1 from '../../components/CollapsibleView1/CollapsibleView1';
import { getLiveData, getMSN } from '../../shared/api/ServiceApi';

const LiveData = () => {
  const [flag, setFlag] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();
  const [data, setData]=useState([]);

  const getLiveDataApi = () => {
      getMSN().then(msn => {
        const params = { MSN: msn };
        getLiveData(params)
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

  useEffect(()=> {
    getLiveDataApi();
  },[]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

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
            <Ionicons
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
            paddingTop: 40,
            paddingBottom: 70,
          }}
        >
          <View style={styles.wrapper}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                marginVertical: 10,
              }}
            >
              Live <Text style={{ color: colors.textColor3 }}>data</Text>
            </Text>

            <View>
             {data.map((item, index) => (
  <CollapsibleView1
    key={index}
    title={`Reading Time: ${formatDate(item["Reading Time"])}`}
    title1={formatTime(item["Reading Time"])}
  >
    <View style={{ gap: 5 }}>
      <Text>MSN: {item.MSN}</Text>
      <Text>Total Vb: {item["Total Vb"]}</Text>
      <Text>Other field: {item["Other Field"]}</Text>
    </View>
  </CollapsibleView1>
))}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default LiveData;
