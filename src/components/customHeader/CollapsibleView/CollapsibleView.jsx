import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './CollapsibleView.style';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/colors/colors';
import DropShadow from 'react-native-drop-shadow';

const CollapsibleView = ({ title, connected, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
     <DropShadow
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3.5,
      elevation: 4,
    }}
  >
    <View style={[styles.Container, { backgroundColor: 'white' }]}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: 14, color: colors.textColor }}>{title}</Text>
          <LinearGradient
            colors={[colors.linearGradientStart, colors.linearGradientend]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: 90,
              height: 25,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                fontWeight: '600',
              }}
            >
              {connected}
            </Text>
          </LinearGradient>
        </View>

        <TouchableOpacity onPress={toggleCollapse}>
          <Icon
            name={collapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
            size={30}
            color={colors.textColor}
          />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={collapsed}>{children}</Collapsible>
    </View>
    </DropShadow>
  );
};

export default CollapsibleView;
