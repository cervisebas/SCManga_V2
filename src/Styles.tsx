import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

const Styles = StyleSheet.create({
  backgroundPrimary: {
    backgroundColor: '#f4511e',
    color: '#FFFFFF'
  },
  marginSearch: {
    margin: 8
  }
});
const themeDefault: ReactNativePaper.Theme = {
  ...DefaultTheme,
  dark: false
};
const rippleColor: string = 'rgba(0, 0, 0, .16)';
const StylesDefaults = {
  background: '#FFFFFF',
  colorText: '#000000',
  components: '#FFFFFF'
};

export default Styles;
export {
  themeDefault,
  rippleColor
};