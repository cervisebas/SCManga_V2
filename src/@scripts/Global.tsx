import React from "react";
import { DefaultTheme, Portal } from "react-native-paper";
import LoadingController from '../@assets/loading/loading-controller';
import { Info } from "../@types/ViewInfo";
import { ViewInfoManga3 } from '../ViewInfoManga/ViewInfoManga';
import { ImageView3 } from './ImageView';
import { ImageViewManga2 } from './ImageViewManga';
import { ViewMangas } from '../ViewInfoManga/ViewMangas';

const themeLight = { ...DefaultTheme, dark: false };

interface IProps {
    /* Information */
    infoView: boolean;
    infoData: Info;
    infoClose: ()=>any;

    /* View Manga */
    vMangaSources: string[];
    vMangaView: boolean;
    vMangaTitle: string;
    vMangaClose: ()=>any;

    /* View Image */
    vImageSrc: string;
    vImageView: boolean;
    vImageClose: ()=>any;

    /* View Images Manga */
    vImagesMangaSources: string;
    vImagesMangaView: boolean;
    vImagesMangaClose: ()=>any;

    /* Loading View */
    loadingView: boolean;
    loadingText: string;

    /* Functions */
    goToChapter: (url: string, title: string)=>any;
    goOpenImageViewer: (urlImage: string)=>any;
    goOpenImageViewer2: (urlImage: string)=>any;
    goInfoManga: (url: string)=>any;
};

export function Global2(props: IProps) {
    return(
        <Portal theme={themeLight}>
            <ViewInfoManga3
                visible={props.infoView}
                data={props.infoData}
                clickViewImage={(src: string)=>props.goOpenImageViewer(src)}
                close={()=>props.infoClose()}
                clickGoToChapter={(url: string, title: string)=>props.goToChapter(url, title)}
            />
            <ViewMangas
                images={props.vMangaSources}
                visible={props.vMangaView}
                title={props.vMangaTitle}
                openImage={(img: string)=>props.goOpenImageViewer2(img)}
                close={()=>props.vMangaClose()}
            />
            <ImageView3
                image={props.vImageSrc}
                visible={props.vImageView}
                dissmiss={()=>props.vImageClose()}
            />
            <ImageViewManga2
                image={props.vImagesMangaSources}
                visible={props.vImagesMangaView}
                dissmiss={()=>props.vImagesMangaClose()}
            />
            <LoadingController
                show={props.loadingView}
                loadingText={props.loadingText}
                borderRadius={8}
                indicatorColor={'#f4511e'}
            />
        </Portal>
    );
}