import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default styles;
