import React, { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { ApiManga } from "../@scripts/ApiAnime";
import { itemList1, itemList2, ShowError } from "../@scripts/Components";
import Styles from "../Styles";

const apiManga = new ApiManga();
const { width, height } = Dimensions.get('window');

interface IProps {
    goToChapter: (url: string, title: string)=>any;
    goInfoManga: (url: string)=>any;
};

export function Tab1(props: IProps) {
    const [mangas, setMangas] = useState([]);
    const [popular, setPopular] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isNowLoading, setIsNowLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    function fetching() {
        setIsError(false);
        setIsLoading(true);
        apiManga.getRecents().then((recents: any)=>{
            setPopular(recents.popular);
            setMangas(recents.newMangas);
            setIsLoading(false);
        }).catch(()=>{
            setIsLoading(false);
            setIsError(true);
        });
    };

    function refresh() { if (isNowLoading) { fetching(); console.log('Loading'); setIsNowLoading(false); } }
    refresh();

    function retryList() {
        setIsNowLoading(true);
        refresh();
    }

    const Loading = ()=><View style={styles.verticalAling}><ActivityIndicator animating={true} size='large' color='#ff5131' style={{ marginTop: 16 }}/></View>;
    const ViewMangas = ()=>{
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.container2}>
                    {isLoading ? <Loading/> : ((isError)? <ShowError retry={()=>retryList()} /> : <FlatList
                        data={popular}
                        extraData={isLoading}
                        horizontal={false}
                        renderItem={({item})=>itemList1(item, (url: string)=>props.goInfoManga(url))}
                    /> )}
                </SafeAreaView>
            </View>
        );
    };
    const ViewUploads = ()=>{
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.container2}>
                    {isLoading ? <Loading/> : ((isError)? <ShowError retry={()=>retryList()} /> : <FlatList
                        data={mangas}
                        extraData={isLoading}
                        horizontal={false}
                        renderItem={({item})=>itemList2(item, (url: string, title: string)=>props.goToChapter(url, title))}
                    />)}
                </SafeAreaView>
            </View>
        );
    };

    //##### Other #####
    const renderScene = SceneMap({ newmangas: ViewMangas, newuploads: ViewUploads });
    const layout = Dimensions.get('window');
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([{ key: 'newmangas', title: 'Populares/Trending' }, { key: 'newuploads', title: 'Últimas subidas' }]);

    const renderTabBar = (props: any)=>(
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: Styles.backgroundPrimary.backgroundColor }}
            getLabelText={({route})=>route.title}
            renderLabel={({ route, color }) => ( <Text style={{ color, margin: 8 }}> {route.title} </Text> )}
        />
    );

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Recientes</Text>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={{ width: layout.width }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: {
        flex: 2,
    },
    header: { 
        width: width,
        backgroundColor: Styles.backgroundPrimary.backgroundColor
    },
    headerText: {
        color: '#FFFFFF',
        margin: 16,
        fontSize: 20,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    verticalAling: {
        width: width,
        height: (height - 180),
        textAlign: 'center',
        justifyContent: 'center'
    }
});