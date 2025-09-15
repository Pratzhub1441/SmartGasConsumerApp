import { StyleSheet } from "react-native";
import colors from '../../../assets/colors/colors';

const styles= StyleSheet.create({
    Container: {
        flex: 1,
    },
    wrapper: {
        paddingVertical: 30,
    },
    containerA: {
        gap: 10,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
     contianers: {
             backgroundColor: colors.background,
                    borderRadius: 5,
                    marginBottom: 20,
                    padding: 20,
                    backgroundColor: 'white',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 1,  
        },
});

export default styles;