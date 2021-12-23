import { View, StatusBar } from 'react-native';

import { BottomNavigation, DefaultTheme } from 'react-native-paper';

import SystemNavigationBar from "react-native-system-navigation-bar";
import SplashScreen from 'react-native-splash-screen';
import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';

import Tab1 from './Tab1/Tab1';
import { Tab2 } from './Tab2/Tab2';
import { Tab3 } from './Tab3/Tab3';

import { Global } from './@scripts/Global';
import Styles from './Styles';

const HomeScreen = ()=>{
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'recents', title: 'Recientes', icon: 'history' },
    { key: 'favorites', title: 'Favoritos', icon: 'heart' },
    { key: 'search', title: 'Buscar', icon: 'magnify' },
    { key: 'profile', title: 'Cuenta', icon: 'account' }
  ]);
  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'recents':
        return <Tab1 />;
      case 'favorites':
        return <Tab2 />;
      case 'search':
        return <Tab3 />;
      case 'profile':
        return <View style={{ flex: 2 }}></View>;
    }
  };
  const themeLight = {
    ...DefaultTheme,
    dark: false
  };

  return (
    <PaperProvider theme={themeLight}>
      <StatusBar backgroundColor="#c33509" barStyle="light-content" />
      <Global />
      <BottomNavigation
        navigationState={{ index, routes }}
        barStyle={Styles.backgroundPrimary}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
};

const App = () => {
  setTimeout(()=>SplashScreen.hide(), 1500);
  SystemNavigationBar.setNavigationColor('#c33509', true);
  return (<HomeScreen />);
};

export default App;
