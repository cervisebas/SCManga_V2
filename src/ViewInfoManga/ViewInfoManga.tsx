import React, { useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, View, ToastAndroid } from "react-native";
import { Appbar, Text, Card, TouchableRipple, Drawer, Modal } from "react-native-paper";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { itemList3 } from "../@scripts/Components";
import { Info } from "../@types/ViewInfo";
import { ApiManga } from "../@scripts/ApiAnime";
import Styles from "../Styles";

const apiManga = new ApiManga();
const { width, height } = Dimensions.get('window');

interface IProps {
    close: ()=>any;
    data: Info;
    visible: boolean;
    clickViewImage: (src: string)=>any;
    clickGoToChapter: (url: string, title: string)=>any;
};


export function ViewInfoManga3(props: IProps) {
    const [routes, setRouters] = useState([{ key: 'info', title: 'Información' }, { key: 'chapters', title: 'Capítulos' }]);
    const [index, setIndex] = useState(0);
    const [colorFavorite, setColorFavorite] = useState('#FFFFFF');
    const [favorite, setFavorite] = useState(false);

    /* ##### Rendes & Actions & Elements ##### */
    const renderTabBar = (props: any)=>{
        return(<TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#ff8a50' }}
            getLabelText={({route})=>route.title}
            renderLabel={({ route, color })=>(<Text style={{ color, margin: 8 }}>{route.title}</Text>)}
        />);
    };
    const loading = ()=>{
        apiManga.isIntoFavorites(props.data.url).then((isFavorite)=>{
            setFavorite(isFavorite);
            setColorFavorite((isFavorite)? '#00FF00': '#FFFFFF');
        }).catch(()=>{
            setFavorite(false);
            setColorFavorite('#FFFFFF');
        });
    };
    const actionButtonFavorite = ()=>{
        if (favorite) {
            apiManga.removeFavorite(props.data.url).then(()=>{
                ToastAndroid.showWithGravity('Se ha quitado de favoritos.', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                return loading();
            });
        } else {
            apiManga.addFavorite(props.data).then(()=>{
                ToastAndroid.showWithGravity('Se ha añadido a favoritos.', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                return loading();
            });
        }
    };


    /* ##### Views ##### */
    const viewChapters = ()=>{
        const renderListChapters = props.data.chapters.map((data, index)=>itemList3(data, index, props.data.title, (url: string, chapter: string)=>props.clickGoToChapter(url, chapter)));
        return(<ScrollView>{renderListChapters}<Text>{'\n'}</Text></ScrollView>);
    };
    const viewInfo = ()=>{
        const renderListGenders = props.data.genders.map((data, index)=><Drawer.Item key={index} style={styles.itemGen} label={data.title} />);
        return(<ScrollView>
            <Card>
                <Card.Title title="Información:" />
                <Card.Content>
                    <Text><Text style={{ fontWeight: 'bold' }}>{'\t'}Nombre:</Text> {props.data.title}{'\n'}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>{'\t'}Año de publicación:</Text> {props.data.date}{'\n'}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>{'\t'}Tipo:</Text> {props.data.type}{'\n'}</Text>
                </Card.Content>
            </Card>
            <Card>
                <Card.Title title="Sinopsis:" />
                <Card.Content>
                    <Text style={{ paddingLeft: 16 }}>{props.data.synopsis}</Text>
                </Card.Content>
            </Card>
            <Card>
                <Card.Title title="Generos:" />
                <Card.Content>{renderListGenders}</Card.Content>
            </Card>
            <Text>{'\n'}</Text>
        </ScrollView>);
    };
    const renderScene = SceneMap({ info: viewInfo, chapters: viewChapters });

    loading();
    return(<Modal visible={props.visible} dismissable={true} onDismiss={()=>props.close()} contentContainerStyle={{ backgroundColor: '#FFFFFF' }}>
        <StatusBar backgroundColor="#c33509" barStyle="light-content" />
        <Appbar.Header dark={true} style={{ backgroundColor: Styles.backgroundPrimary.backgroundColor }}>
            <Appbar.BackAction onPress={()=>{ props.close(); }} />
            <Appbar.Content title={props.data.title}/>
            <Appbar.Action
                icon="heart"
                color={colorFavorite}
                onPress={()=>actionButtonFavorite()}
            />
        </Appbar.Header>
        <View style={styles.image}>
            <TouchableRipple onPress={()=>props.clickViewImage(props.data.image)} rippleColor="rgba(0, 0, 0, .32)">
                <Image source={{ uri: ((props.data.image !== "")? props.data.image : undefined) }} style={styles.imageComponent}/>
            </TouchableRipple>
        </View>
        <SafeAreaView style={styles.content}>
            <View style={{ flex: 1 }}>
                <TabView
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    renderTabBar={renderTabBar}
                    initialLayout={{ width: width }}
                />
            </View>
        </SafeAreaView>
    </Modal>);
}

const styles = StyleSheet.create({
    content: {
        width: width,
        height: (height - 352),
        backgroundColor: '#FFFFFF'
    },
    image: {
        width: width,
        height: 320,
        backgroundColor: '#000000'
    },
    imageComponent: {
        width: width,
        height: 384,
        resizeMode: 'cover'
    },
    itemGen: {
        backgroundColor: '#eeeeee'
    }
});