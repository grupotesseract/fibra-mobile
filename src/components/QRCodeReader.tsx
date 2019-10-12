import React from 'react';
import { View } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TouchableHighlight, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export function QRCodeReader(props) {
    var {height} = Dimensions.get('window');
    return <View style={{zIndex:9, position: 'absolute', backgroundColor: 'black', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'flex-start', height: height}}>
        <BarCodeScanner
        onBarCodeScanned={props.handleScan}
        style={{position: 'absolute', alignSelf: 'flex-start', top: 0, left: 0, right: 0, bottom: 0}}
        />
        <TouchableHighlight 
        onPress={() => props.handleClose}
        style={{ zIndex: 10, alignSelf: 'flex-start', position: 'absolute', top: 0, left: 10, padding: 10}}
        >
        <FontAwesome
            name="arrow-left"
            size={36}
            color='white'
            />
        </TouchableHighlight>
    </View>
}