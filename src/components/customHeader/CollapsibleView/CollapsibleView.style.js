import { StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const styles= StyleSheet.create({
    Container: {
        padding: 10,
        borderColor: colors.borderColor1,
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
});

export default styles;