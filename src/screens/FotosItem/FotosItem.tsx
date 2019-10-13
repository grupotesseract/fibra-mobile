import React, { useState, useEffect } from 'react';
import { Text, Container, Button, Content, Icon, Fab, Grid, Col } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { CameraRoll, Image, ScrollView, View, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FotosItem() {
    const [photos, setPhotos] = useState([]);
    
    const pickImage = async () => {
        ImagePicker.launchCameraAsync()
        .then(img => {
            setPhotos([
                ...photos,
                img
            ])
            console.log("IMG SUCES", img)
        })
        .catch(err => {
            console.log("ERRO NA IMG", err)
        })
    };

    return (
        <Container>
            <HeaderNav title="Fotos Item #1" />
            <Content padder contentContainerStyle={{ flex: 1, flexDirection: 'row' }}>
                <FlatList
                    data={photos}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                            <Image style={{ justifyContent: 'center',
                                alignItems: 'center',
                                height: 130,
                                maxWidth:100
                            }} source={{ uri: item.uri }} />
                        </View>
                    )}
                    //Setting the number of column
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                />
                <Fab 
                    position="bottomRight"
                    style={{ backgroundColor: "#13328c" }}
                    onPress={() => { pickImage() }}>
                    <Icon name='md-camera'/>
                </Fab>
            </Content>
        </Container>
    );
}

const style = {
    botaoQuadrado: {
        margin: 5,
        padding: 10,
        paddingBottom: 10,
        height: 110,
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: "column"
    }
}