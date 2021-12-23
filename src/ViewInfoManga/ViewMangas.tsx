import React, { Component } from 'react';
import { Dimensions, StatusBar, StyleSheet, View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Appbar, Modal } from 'react-native-paper';
import Styles from '../Styles';
import { FullWidthImage } from './FullWidthImage';

const { width, height } = Dimensions.get('window');

interface IProps {
    visible: boolean;
    title: string;
    close: ()=>any;
    images: string[];
    openImage: (image: string)=>any;
};
interface IState {};

export class ViewMangas extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    componentWillUnmount() {
        this.state = (_state: any, _callback: any)=>{
            return;
        };
    }
    renderImage(uri: string, index: number) {
        return(<TouchableOpacity key={index} onPress={()=>{ this.props.openImage(uri); }}>
            <View style={styles.imageContent}>
                <FullWidthImage source={{ uri: uri }} />
            </View>
        </TouchableOpacity>);
    }
    render(): React.ReactNode {
        return(
            <Modal visible={this.props.visible} dismissable={true} onDismiss={()=>this.props.close()}>
                <View style={{ backgroundColor: '#FFFFFF' }}>
                    <StatusBar backgroundColor="#c33509" barStyle="light-content" />
                    <Appbar.Header style={{ backgroundColor: Styles.backgroundPrimary.backgroundColor }}>
                        <Appbar.BackAction onPress={()=>this.props.close()} />
                        <Appbar.Content title={this.props.title}/>
                    </Appbar.Header>
                    <SafeAreaView style={styles.content}>
                        <FlatList
                            data={this.props.images}
                            extraData={(this.props.visible)? false: true}
                            renderItem={({item, index})=>this.renderImage(item, index)}
                        />
                    </SafeAreaView>
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        height: (height - 32),
        width: width,
        backgroundColor: '#FFFFFF'
    },
    imageContent: {
        paddingLeft: 8,
        paddingRight: 8
    },
    image: {
        width: (width - 16),
        height: undefined
    }
});