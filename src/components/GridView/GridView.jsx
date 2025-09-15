import { View, Text } from 'react-native';
import React from 'react';
import styles from './GridView.styles';
import { ScrollView } from 'react-native-gesture-handler';

const GridView = ({ data = [] }) => {

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text
          style={{
            width: '20%',
            textAlign: 'center',
          }}
        >
          Sl No
        </Text>
        <Text
          style={{
            width: '30%',
            textAlign: 'center',
          }}
        >
          Month
        </Text>
        <Text
          style={{
            width: '50%',
            textAlign: 'center',
          }}
        >
          Consumption Kwh
        </Text>
      </View>
      <View>
        <ScrollView>
          {data.map((item, index) => (
            <View style={{
                flexDirection: "row",
              backgroundColor:  index%2===0? "#fff" : "#ADADAD4D",
              paddingVertical: 10,
            }}>
              <Text style={{
            width: '20%',
            textAlign: 'center',
          }}>{index+1}</Text>
              <Text style={{
            width: '30%',
            textAlign: 'center',
          }}>{item.x}</Text>
              <Text style={{
            width: '50%',
            textAlign: 'center',
          }}>{item.y}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default GridView;
