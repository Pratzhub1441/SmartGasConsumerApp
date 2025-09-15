import { StyleSheet } from "react-native";
import colors from "../../assets/colors/colors";

const styles= StyleSheet.create({
    Container: {
        padding: 10,
        borderColor: colors.borderColor1,
        backgroundColor: "#ABCDD136",
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
        shadowColor: '#fff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 1,
    },
    header: {
    }
});

export default styles;