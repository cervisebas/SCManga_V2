import React, { Component } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Searchbar, Text, Provider as PaperProvider } from 'react-native-paper';
import { itemList1 } from '../@scripts/Components';
import { popular } from '../@types/ApiManga';
import { Global } from '../@scripts/Global';
import { Search } from '../@Icons/Icons';
import { ApiManga } from '../@scripts/ApiAnime';
import Styles from '../Styles';

interface IProps {};
interface IState {
    searchQuery: string;
    searchResults: popular[];
    isLoading: boolean;
    notFound: boolean;
};

const apiManga = new ApiManga();
const fglobal = new Global({});
const { width, height } = Dimensions.get('window');

export class Tab3 extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            searchQuery: '',
            searchResults: [],
            isLoading: true,
            notFound: true
        };
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.goSearch = this.goSearch.bind(this);
    }

    componentWillUnmount() {
        this.setState({
            searchQuery: '',
            searchResults: [],
            isLoading: true,
            notFound: true
        });
    }

    onChangeSearch(query: string) { return this.setState({ searchQuery: query }); }
    Loading() {
        return(<View style={styles.verticalAling}>
            <ActivityIndicator animating={true} size='large' color='#ff5131' style={{ marginTop: 16 }}/>
        </View>);
    }
    nowSearch() {
        return(<View style={styles.verticalAling}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Search width={96} height={96} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>No hay resultados</Text>
            </View>
        </View>);
    }
    goSearch(search: string) {
        this.setState({ isLoading: true, notFound: false });
        apiManga.getSearchResults(search).then((results)=>{
            return this.setState({ searchResults: results, notFound: false, isLoading: false });
        }).catch((error)=>{
            console.log(error);
            return this.setState({ isLoading: false, notFound: true });
        })
    }
    render(): React.ReactNode {
        return(<View style={{ flex: 2 }}>
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.headerTextContent}>Directorios</Text>
                </View>
                <View style={styles.headerSearch}>
                    <Searchbar
                        placeholder="Buscar..."
                        onChangeText={this.onChangeSearch}
                        value={this.state.searchQuery}
                        onSubmitEditing={({ nativeEvent: { text }})=>this.goSearch(text)}
                    />
                </View>
            </View>
            <SafeAreaView>
                {(this.state.notFound)? <this.nowSearch /> : ((this.state.isLoading)? <this.Loading /> : <FlatList
                    data={this.state.searchResults}
                    style={{ marginBottom: 116 }}
                    extraData={this.state.isLoading}
                    renderItem={({item})=>itemList1(item, (url: string)=>fglobal.openViewInfo(url))}
                />)}
            </SafeAreaView>
        </View>);
    }
}

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 116,
        backgroundColor: Styles.backgroundPrimary.backgroundColor,
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    headerText: { 
        width: width,
    },
    headerTextContent: {
        color: '#FFFFFF',
        margin: 16,
        fontSize: 20,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    headerSearch: {
        width: width,
        height: 64,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
    },
    verticalAling: {
        width: width,
        height: (height - 180),
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
});