import React from 'react';
import { Header, Left, Button, Icon, Body, Title, Right, Text, View  } from 'native-base';
import { withNavigation } from 'react-navigation';

class HeaderNav extends React.Component {
    render() {
        return <View style={{backgroundColor: '#101090', paddingTop: 26}}>
            <Header>
                <Left>
                    <Button hasText transparent onPress={() => {
                        this.props.navigation.goBack()
                        }}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right>
                    <Button hasText transparent>
                        <Text>Cancelar</Text>
                    </Button>
                </Right>
            </Header>
        </View>
    }
}

export default withNavigation(HeaderNav);