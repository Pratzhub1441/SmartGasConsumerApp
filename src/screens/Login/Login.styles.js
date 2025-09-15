import { Dimensions, Platform, StyleSheet } from 'react-native';
import colors from '../../assets/colors/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    height: Dimensions.get('window').height * 0.45,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  loginContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.34,
    backgroundColor: colors.backgroundContainer,
    width: Dimensions.get('window').width * 0.85,
    padding: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 20,
    color: colors.textColor,
  },
  inputRows: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  inputLabel: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: colors.backgroundContainer,
    zIndex: 1,
    paddingHorizontal: 8,
    fontSize: 14,
    color: colors.textColor,
  },
  textInput: {
    flex: 1,
    height: 50,
    borderColor: colors.borderColor,
    borderRadius: 4,
    borderWidth: 1,
    padding: 10,
    color: colors.textColor,
  },
  loginBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  checkBox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  forgotPassword: {
    color: colors.textColor,
    fontSize: 12,
    fontWeight: 500,
  },
  loginBtn: {
    height: 50,
    paddingVertical: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  }
});
