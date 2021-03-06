import React, {Component} from 'react';
import { Dimensions, Image, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator } from 'react-native-paper';

interface IProps {
    source: { uri: string };
};
interface IState {
    width: number;
    height: number;
    isLoad: boolean;
};

const { width } = Dimensions.get('window');

export class FullWidthImage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            isLoad: true
        };
        this.Loading = this.Loading.bind(this);
    }

    componentWillUnmount() {
        this.setState({
            width: 0,
            height: 0,
            isLoad: true
        });
    }

    _onLayout(event: LayoutChangeEvent) {
        const containerWidth = event.nativeEvent.layout.width;
        if (typeof this.props.source === 'number') {
            const source = Image.resolveAssetSource(this.props.source);
            this.setState({
                width: containerWidth,
                height: (containerWidth * source.height / source.width)
            });
        } else if (typeof this.props.source === 'object') {
            Image.getSize(this.props.source.uri, (width, height) => {
                this.setState({
                    width: containerWidth,
                    height: (containerWidth * height / width)
                });
            });
        }
    }

    Loading() {
        return(<View style={{ ...styles.verticalAling, height: this.state.height }}>
            <ActivityIndicator animating={true} size={(this.state.height !== 0)? 'large' : 'small'} color='#ff5131' style={{ marginTop: 16 }}/>
        </View>);
    }

    render() {
        return (<View onLayout={this._onLayout.bind(this)} style={{ minHeight: 120 }}>
            <FastImage
                source={{
                    uri: this.props.source.uri,
                    priority: FastImage.priority.normal
                }}
                style={{
                    width: this.state.width,
                    height: this.state.height
                }}
                onLoadStart={()=>this.setState({ isLoad: true })}
                onLoadEnd={()=>this.setState({ isLoad: false })}
                resizeMode={FastImage.resizeMode.stretch}
            />
            {(this.state.isLoad)? <this.Loading /> : null}
        </View>);
    }
}

const styles = StyleSheet.create({
    verticalAling: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        minHeight: 120,
        width: (width - 16),
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
});