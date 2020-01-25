import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { View } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TouchableHighlight, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
  

export function QRCodeReader(props) {
    
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`QRCODE ${data} ESCANEADO. FAVOR AGUARDAR!!`);
        const { navigation } = props;
        const qrcode = data;
        navigation.navigate({ routeName: 'ManutencaoItem', params: { qrcode }})
    };


    var {height} = Dimensions.get('window');

    
    return (
    
        <View style={{zIndex:9, position: 'absolute', backgroundColor: 'black', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'flex-start', height: height}}>
            
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            />

            {/* <TouchableHighlight 
            onPress={() => props.handleClose}
            style={{ zIndex: 10, alignSelf: 'flex-start', position: 'absolute', top: 0, left: 10, padding: 10}}
            >
            <FontAwesome
                name="arrow-left"
                size={36}
                color='white'            
                />
            </TouchableHighlight> */}
        </View>
    );

    
}

const styles = {
    container: {
      flexGrow: 1
    },
    spinner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  };