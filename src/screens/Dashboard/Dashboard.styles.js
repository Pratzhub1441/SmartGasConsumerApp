import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/colors/colors';

const styles= StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:colors.white,
        position:'relative',
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: 50,
    },
    headerContainer: {
        width: '100%',
    },
    wrapper: {
        flex: 1,
        padding: 16,
    },
    custId: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        marginTop: 25,
    },
    custIdLeft: {
        fontSize: 18,
        fontWeight: 700,
        color: colors.textColor,
    },
    custIdRight: {
        fontSize: 18,
        color: colors.textColor,
    },
    contianers: {
         backgroundColor: colors.background,
         borderColor: "#eae2e2ff",
         borderWidth: 0.5,
         elevation: 0.8,
                borderRadius: 5,
                marginBottom: 20,
                padding: 20,
                backgroundColor: 'white',             
    },
    shadow: {
        shadowColor: '#0000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 1,
    }
});

export default styles;