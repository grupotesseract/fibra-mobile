import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { Camera } from 'expo-camera';

export function QRCodeReader(props) {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(
      `Código escaneado: ${data}. Aguarde enquanto as informações são carregadas.`
    );
    const { navigation } = props;
    const qrcode = data;
    navigation.navigate({ routeName: 'ManutencaoItem', params: { qrcode } });
  };

  return (
    <View flex={1}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}
