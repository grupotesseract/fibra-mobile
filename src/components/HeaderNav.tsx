import React from 'react';
import { Header, Left, Button, Icon, Body, Title, View  } from 'native-base';
import { withNavigation } from 'react-navigation';

class HeaderNav extends React.Component {
    render() {
        return <View style={{backgroundColor: '#101090', paddingTop: 0}}>
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
            </Header>
        </View>
    }
}

export default withNavigation(HeaderNav);