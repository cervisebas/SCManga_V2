import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Divider, List, Text, TouchableRipple } from "react-native-paper";
import { popular, newMangas } from "../@types/ApiManga";
import { chapter, optionChapter } from "../@types/ViewInfo";

const rippleColor: string = 'rgba(0, 0, 0, .16)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemList1: {
        margin: 0,
        height: 165,
        flexGrow: 0
    },
    itemList2: {
        margin: 0,
        height: 85,
        flexGrow: 0
    }
});

const itemList1 = (data: popular, action: (url: string)=>void)=>{
    return(<View style={styles.container}>
        <TouchableRipple onPress={()=>{ action(data.url); }} style={{ justifyContent: 'center' }} rippleColor={rippleColor}>
            <List.Item
                title={data.title}
                description={()=><Text style={{ marginLeft: 8, color: '#666666' }}>{data.type}</Text>}
                style={styles.itemList1}
                left={()=><Image source={{ uri: data.image }} style={{ width: 110, height: 150, borderRadius: 4 }} /> }
            />
        </TouchableRipple>
        <Divider />
    </View>);
};
const itemList2 = (data: newMangas, action: (url: string, chapter: string)=>void)=>{
    return(<View style={styles.container}>
        <TouchableRipple onPress={()=>{ action(data.url, `Capitulo ${data.chapter} - ${data.title}`); }} style={{ justifyContent: 'center' }} rippleColor={rippleColor}>
            <List.Item
                title={data.title}
                description={()=><Text style={{ marginLeft: 4, color: '#666666' }}>Capitulo {data.chapter}</Text>}
                style={styles.itemList2}
                left={()=><Image source={require('../Assets/Icon1.png')} style={{ width: 70, height: 70, borderRadius: 4 }} /> }
            />
        </TouchableRipple>
        <Divider />
    </View>);
};
const itemList3 = (data: chapter, key: number, title: string, action: (url: string, chapter: string)=>void)=>{
    return(<View style={styles.container} key={key}>
        <TouchableRipple onPress={()=>{ action(data.url, `Capitulo ${data.chapter} - ${title}`); }} style={{ justifyContent: 'center' }} rippleColor={rippleColor}>
            <List.Item
                title={data.chapter}
                style={styles.itemList2}
                left={()=><Image source={require('../Assets/Icon1.png')} style={{ width: 70, height: 70, borderRadius: 4 }} /> }
            />
        </TouchableRipple>
        <Divider />
    </View>);
};

export {
    itemList1,
    itemList2,
    itemList3
};