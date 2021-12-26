import React from "react";
import { View } from "react-native";
import { Appbar, List, TouchableRipple } from "react-native-paper";
import Styles from "../Styles";

export function Tab4() {
    
    return(<View style={{ flex: 2 }}>
        <Appbar.Header dark={true} style={Styles.backgroundPrimary}>
            <Appbar.Content title={'Configuraciones'}></Appbar.Content>
        </Appbar.Header>
        <TouchableRipple onPress={()=>console.log('Hola')} style={{ justifyContent: 'center' }} rippleColor={'rgba(0, 0, 0, .16)'}>
            <List.Item
                title='Información'
                left={(props)=><List.Icon {...props} icon={'information'}/>}
            />
        </TouchableRipple>
    </View>);
}