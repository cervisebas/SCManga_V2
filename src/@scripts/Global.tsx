import React, { Component } from "react";
import { Dimensions } from "react-native";
import { DefaultTheme, Portal } from "react-native-paper";
import LoadingController from '../@assets/loading/loading-controller';
import { ApiManga } from "./ApiAnime";
import { Info } from "../@types/ViewInfo";
import { ViewInfoManga3 } from '../ViewInfoManga/ViewInfoManga';
import { ImageView3 } from './ImageView';
import { ImageViewManga2 } from './ImageViewManga';
import { ViewMangas } from '../ViewInfoManga/ViewMangas';

interface IProps {}
interface IState {
    viewInfo: boolean;
    dataInfo: Info;
    showLoading: boolean;
    messageLoading: string;
    imageViewShow: boolean;
    imageViewShow2: boolean;
    sourceViewShow: string;
    viewManga: boolean;
    titleViewManga: string;
    imagesViewManga: string[];
}

const apiAnime = new ApiManga();

var then: Global | undefined = undefined;
const themeLight = { ...DefaultTheme, dark: false };

export class Global extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            viewInfo: false,
            dataInfo: { title: '', date: '', type: '', synopsis: '', image: '', genders: [], chapters: [], url: '' },
            showLoading: false,
            imageViewShow: false,
            imageViewShow2: false,
            sourceViewShow: '',
            messageLoading: 'Cargando...',
            viewManga: false,
            titleViewManga: 'Sin titulo',
            imagesViewManga: []
        };
        this.openViewInfo = this.openViewInfo.bind(this);
        this.openImageViewer = this.openImageViewer.bind(this);
        then = this;
    }
    //componentDidUpdate() { then = this; }

    async openViewInfo(url: string) {
        then?.setState({ showLoading: true, messageLoading: 'Obteniendo información...' });
        apiAnime.getInformation(url).then((info)=>{
            then?.setState({ dataInfo: info, viewInfo: true, showLoading: false });
        }).catch(()=>{
            then?.setState({ showLoading: false });
        });
    }

    openImageViewer(image: string) { return this.setState({ imageViewShow: true, sourceViewShow: image }); }
    openImageViewer2(image: string) { return this.setState({ imageViewShow2: true, sourceViewShow: image }); }

    async goToChapter(url: string, title: string) {
        then?.setState({ showLoading: true, messageLoading: 'Obteniendo información...' });
        apiAnime.getImagesChapter(url).then((images)=>{
            then?.setState({ showLoading: false, imagesViewManga: images, viewManga: true, titleViewManga: title });
        }).catch((error)=>{
            console.log(error);
            then?.setState({ showLoading: false });
        });
    }

    render() {
        return(
            <Portal theme={themeLight}>
                <ViewInfoManga3 visible={this.state.viewInfo} data={this.state.dataInfo} clickViewImage={(src: string)=>this.openImageViewer(src)} close={()=>this.setState({ viewInfo: false })} clickGoToChapter={(url: string, title: string)=>this.goToChapter(url, title)} />
                <ViewMangas images={this.state.imagesViewManga} visible={this.state.viewManga} title={this.state.titleViewManga} openImage={(img: string)=>this.openImageViewer2(img)} close={()=>this.setState({ viewManga: false, imagesViewManga: [] })} />
                <ImageView3 image={this.state.sourceViewShow} visible={this.state.imageViewShow} dissmiss={()=>this.setState({ imageViewShow: false })} />
                <ImageViewManga2 image={this.state.sourceViewShow} visible={this.state.imageViewShow2} dissmiss={()=>this.setState({ imageViewShow2: false })} />
                <LoadingController
                    show={this.state.showLoading}
                    loadingText={this.state.messageLoading}
                    borderRadius={8}
                    indicatorColor={'#f4511e'}
                />
            </Portal>
        );
    }
}