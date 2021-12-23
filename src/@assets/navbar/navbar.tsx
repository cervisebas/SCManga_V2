import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import SystemNavigationBar from "react-native-system-navigation-bar";


interface IProps {
    useColor: boolean;
    useHide?: boolean;
    useFullScreen?: boolean;
};
interface IState {};

export class NavBar extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    process() {
        if (this.props.useColor) {
            SystemNavigationBar.setNavigationColor('#c33509', true);
        }
        if (this.props.useHide !== undefined) {
            if (this.props.useHide) {
                SystemNavigationBar.navigationHide();
            } else {
                SystemNavigationBar.navigationShow();
            }
        }
        if (this.props.useFullScreen !== undefined) {
            if (this.props.useFullScreen) {
                SystemNavigationBar.fullScreen(true);
            } else {
                SystemNavigationBar.fullScreen(false);
            }
        }
    }
    render(): React.ReactNode {
        this.process();
        return(<View style={{ display: 'none' }}>
            <Text>Hola!!!</Text>
        </View>);
    }
}