import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './CollapsibleView1.styles';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../assets/colors/colors';

const CollapsibleView1 = ({ title, title1, connected, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <View>
            <View style={{ alignItems: 'start', gap: 5, marginBottom: 5, }}>
          <Text style={{ fontSize: 16, color: colors.textColor }}>{title}</Text>
          <Text style={{ fontSize: 16, color: colors.textColor }}>{title1}</Text>
          </View>
          <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
           }}>
           <TouchableOpacity onPress={toggleCollapse}>
          <Icon
            name={collapsed ? 'keyboard-double-arrow-down' : 'keyboard-double-arrow-up'}
            size={34}
            color={colors.textColor3}
          />
        </TouchableOpacity>
        </View>
        </View>

      </View>

      <Collapsible collapsed={collapsed}>{children}</Collapsible>
    </View>
  );
};

export default CollapsibleView1;
