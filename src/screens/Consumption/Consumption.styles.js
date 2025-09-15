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
    },
    headerContainer: {
        width: '100%',
        marginTop: 50,
    },
    wrapper: {
        flex: 1,
        padding: 16,
    },
});

export default styles;