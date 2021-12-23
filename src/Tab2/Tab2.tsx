import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { popular } from '../@types/ApiManga';
import { ApiManga } from '../@scripts/ApiAnime';
import { HeartOff } from '../@Icons/Icons';
import { itemList1 } from '../@scripts/Components';
import { Global } from '../@scripts/Global';
import Styles from '../Styles';

const apiManga = new ApiManga();
const fglobal = new Global({});
const { width, height } = Dimensions.get('window');

interface IProps {};
interface IState {
    favotites: popular[];
    isLoading: boolean;
    empty: boolean;
};

export class Tab2 extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            favotites: [],
            isLoading: true,
            empty: false
        };
        this.getFavorites = this.getFavorites.bind(this);
    }
    nowEmpty() {
        return(<View style={styles.verticalAling}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <HeartOff width={96} height={96} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>No hay resultados</Text>
            </View>
        </View>);
    }
    Loading() {
        return(<View style={styles.verticalAling}>
            <ActivityIndicator animating={true} size='large' color='#ff5131' style={{ marginTop: 16 }}/>
        </View>);
    }
    getFavorites() {
        apiManga.getFavorites().then((favorites)=>{
            if (favorites.length !== 0) {
                setTimeout(()=>{
                    this.setState({ favotites: favorites, isLoading: false, empty: false });
                }, 1500);
            } else {
                this.setState({ favotites: [], isLoading: false, empty: true });
            }
        }).catch(()=>this.setState({ favotites: [], isLoading: false, empty: true }));
    }
    render(): React.ReactNode {
        this.getFavorites();
        return(<View style={{ flex: 2 }}>
            <Appbar.Header dark={true} style={Styles.backgroundPrimary}>
                <Appbar.Content title={'Favoritos'}></Appbar.Content>
            </Appbar.Header>
            <SafeAreaView>
                {(this.state.empty)? <this.nowEmpty /> : ((this.state.isLoading)? <this.Loading /> : <FlatList
                    data={this.state.favotites}
                    style={{ marginBottom: 116 }}
                    extraData={this.state.isLoading}
                    renderItem={({item})=>itemList1(item, (url: string)=>fglobal.openViewInfo(url))}
                />)}
            </SafeAreaView>
        </View>);
    }
}

const styles = StyleSheet.create({
    verticalAling: {
        width: width,
        height: (height - 180),
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
});