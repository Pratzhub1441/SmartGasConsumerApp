import { StyleSheet } from "react-native";
import colors from '../../../assets/colors/colors';

const styles= StyleSheet.create({
    Container: {
           flex: 1,
       },
       wrapper: {
        flex: 1,
           paddingVertical: 30,
       },
       containerA: {
           gap: 10,
           marginBottom: 30,
           paddingHorizontal: 20,
       },
        containers: {
                backgroundColor: colors.background,
                       borderRadius: 5,
                       marginBottom: 20,
                       padding: 20,
                       shadowColor: '#000',
                       shadowOffset: {
                         width: 0,
                       },
                       shadowOpacity: 0.25,
                       shadowRadius: 3.84,
                       elevation: 5,
           },
});

export default styles;