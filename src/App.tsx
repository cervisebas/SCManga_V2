import { StatusBar } from 'react-native';

import { BottomNavigation } from 'react-native-paper';

import SystemNavigationBar from "react-native-system-navigation-bar";
import SplashScreen from 'react-native-splash-screen';
import React, { useState } from 'react';

import { Provider as PaperProvider } from 'react-native-paper';

import { Tab1 } from './Tab1/Tab1';
import { Tab2 } from './Tab2/Tab2';
import { Tab3 } from './Tab3/Tab3';
import { Tab4 } from './Tab4/Tab4';

import { Global2 } from './@scripts/Global';
import Styles, { themeDefault } from './Styles';
import { ApiManga } from './@scripts/ApiAnime';


const apiManga = new ApiManga();

const HomeScreen = ()=>{
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'recents', title: 'Recientes', icon: 'history' },
    { key: 'favorites', title: 'Favoritos', icon: 'heart' },
    { key: 'search', title: 'Buscar', icon: 'magnify' },
    { key: 'settings', title: 'Configuraciones', icon: 'cog' }
  ]);

  /* ##### Global ##### */
  const [infoView, setInfoView] = useState(false);
  const [infoData, setInfoData] = useState({ title: '', date: '', type: '', synopsis: '', image: '', genders: [{ title: '', url: '' }], chapters: [{ chapter: '', url: '' }], url: '' });
  const infoClose = ()=>{
    setInfoView(false);
    setInfoData({ title: '', date: '', type: '', synopsis: '', image: '', genders: [{ title: '', url: '' }], chapters: [{ chapter: '', url: '' }], url: '' });
  };
  const [vMangaSources, setVMangaSources] = useState(['']);
  const [vMangaView, setVMangaView] = useState(false);
  const [vMangaTitle, setVMangaTitle] = useState('');
  const vMangaClose = ()=>{
    setVMangaSources(['']);
    setVMangaView(false);
    setVMangaTitle('');
  };
  const [vImageSrc, setVImageSrc] = useState('');
  const [vImageView, setVImageView] = useState(false);
  const vImageClose = ()=>{
    setVImageSrc('');
    setVImageView(false);
  };
  const [vImagesMangaSources, setVImagesMangaSources] = useState('');
  const [vImagesMangaView, setVImagesMangaView] = useState(false);
  const vImagesMangaClose = ()=>{
    setVImagesMangaSources('');
    setVImagesMangaView(false);
  };
  const [loadingView, setLoadingView] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const goToChapter = (url: string, title: string)=>{
    setLoadingView(true);
    setLoadingText('Obteniendo información...');
    apiManga.getImagesChapter(url).then((images)=>{
      setLoadingView(false);
      setVMangaSources(images);
      setVMangaTitle(title);
      setVMangaView(true);
    }).catch(()=>{
      setLoadingText('Ocurrio un error...');
      setTimeout(()=>setLoadingView(false), 1500);
    });
  };
  const goInfoManga = (url: string)=>{
    setLoadingView(true);
    setLoadingText('Obteniendo información...');
    apiManga.getInformation(url).then((data)=>{
      setLoadingView(false);
      setInfoData(data);
      setInfoView(true);
    }).catch(()=>{
      setLoadingText('Ocurrio un error...');
      setTimeout(()=>setLoadingView(false), 1500);
    });
  };
  const goOpenImageViewer = (urlImage: string)=>{
    setVImageSrc(urlImage);
    setVImageView(true);
  };
  const goOpenImageViewer2 = (urlImage: string)=>{
    setVImagesMangaSources(urlImage);
    setVImagesMangaView(true);
  };


  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'recents':
        return(<Tab1
          goToChapter={(url: string, title: string)=>goToChapter(url, title)}
          goInfoManga={(url: string)=>goInfoManga(url)}
        />);
      case 'favorites':
        return(<Tab2
          goInfoManga={(url: string)=>goInfoManga(url)}
        />);
      case 'search':
        return <Tab3
          goInfoManga={(url: string)=>goInfoManga(url)}
        />;
      case 'settings':
        return <Tab4 />;
    }
  };

  return (
    <PaperProvider theme={themeDefault}>
      <StatusBar backgroundColor="#c33509" barStyle="light-content" />
      <Global2
        infoView={infoView}
        infoData={infoData}
        infoClose={()=>infoClose()}
        vMangaSources={vMangaSources}
        vMangaView={vMangaView}
        vMangaTitle={vMangaTitle}
        vMangaClose={()=>vMangaClose()}
        vImageSrc={vImageSrc}
        vImageView={vImageView}
        vImageClose={()=>vImageClose()}
        vImagesMangaSources={vImagesMangaSources}
        vImagesMangaView={vImagesMangaView}
        vImagesMangaClose={()=>vImagesMangaClose()}
        loadingView={loadingView}
        loadingText={loadingText}
        goToChapter={(url: string, title: string)=>goToChapter(url, title)}
        goOpenImageViewer={(urlImage: string)=>goOpenImageViewer(urlImage)}
        goOpenImageViewer2={(urlImage: string)=>goOpenImageViewer2(urlImage)}
        goInfoManga={(url: string)=>goInfoManga(url)}
      />
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
