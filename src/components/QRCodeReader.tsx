import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Dimensions } from "react-native";


export function QRCodeReader(props) {

    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        alert(`Código escaneado: ${data}. Aguarde enquanto as informações são carregadas.`);
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
        </View>
    );


}