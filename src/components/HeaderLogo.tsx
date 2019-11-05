import React from 'react';
import { Image } from 'react-native';
import { Header, Body, View  } from 'native-base';

const HeaderLogo = () => {
    return <View style={{ backgroundColor: '#aaa' ,paddingTop: 20, marginBottom: 10}}>
        <Header transparent style={{ backgroundColor: 'white' }}>
        <Body>
            <Image 
            style={{ width: 300, height: 87, marginTop: 10 }}
            resizeMode="contain"
            source={require('../../assets/fibraheader.png')}/>
        </Body>
        </Header>
    </View>
}

export default HeaderLogo;