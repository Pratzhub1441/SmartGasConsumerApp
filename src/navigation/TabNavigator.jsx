import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/colors';
import Dashboard from '../screens/Dashboard/Dashboard';
import Consumption from '../screens/Consumption/Consumption';
import LiveData from '../screens/LiveData/LiveData';
import PrepaidConsumption from '../screens/PrepaidConsumption/PrepaidConsumption';
import ViewMore from '../screens/ViewMore/ViewMore';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: 'Dashboard', component: Dashboard, icon: 'home' },
  { name: 'Consumption', component: Consumption, icon: 'equalizer' },
  { name: 'Live Data', component: LiveData, icon: 'insights' },
  {
    name: 'Energy Tips',
    component: PrepaidConsumption,
    icon: 'lightbulb',
  },
  { name: 'Settings', component: ViewMore, icon: 'settings' },
];

const CustomTabBarButton = ({ children, onPress, focused }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      {focused ? (
        <LinearGradient
          colors={[colors.linearGradientStart, colors.linearGradientend]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: '90%',
            height: 80,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </LinearGradient>
      ) : (
        <View
          style={{
            width: '90%',
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 100,
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: '#EAEEF3',
          paddingTop: 22,
        },
        tabBarLabelStyle: { fontSize: 11, marginTop: 2 },
      }}
    >
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            // tabBarButton: props => (
            //   <CustomTabBarButton
            //     {...props}
            //     focused={props.accessibilityState?.selected}
            //   />
            // ),
            tabBarIcon: ({ focused }) => (
              <View>
                {focused? 
                <View>
               <LinearGradient
          colors={[colors.linearGradientStart, colors.linearGradientend]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: 75,
            height: 45,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name={tab.icon}
            size={28}
            color='#fff'
          />
          </LinearGradient>
          </View> :   <View>
          <Icon
            name={tab.icon}
            size={28}
            color={colors.textColor3}
          />
          </View>
                }
          </View>
        ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? '#000' : '#555',
                  fontWeight: '600',
                  fontSize: 11,
                  textAlign: 'center',
                  marginTop: 10,
                }}
              >
                {tab.name}
              </Text>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
