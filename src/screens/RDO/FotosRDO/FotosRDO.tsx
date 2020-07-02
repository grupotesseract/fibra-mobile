import React, { Component } from 'react';
import { Text, Container, Button, Content, Icon, Fab } from 'native-base';
import HeaderNav from '../../../components/HeaderNav';
import { Image, View, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationScreenProp } from 'react-navigation';
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { ManutencaoRDO } from '../../../store/ducks/rdo/types';

interface StateProps {
  rdoAtual: ManutencaoRDO,
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
    armazenaFotos({ fotos }): void,
}

type Props = StateProps & DispatchProps

class FotosRDO extends Component<Props> {
    state = {
        photos: []
    };

    setPhotos = (photos) => {
        this.setState({
            photos,
        })
    };

    pickImage = async () => {
        const { photos } = this.state;
        ImagePicker.launchCameraAsync({quality: 0.2})
        .then(img => {
            if (!img.cancelled) {
              this.setPhotos([
                  ...photos,
                  img
              ])
            }
        })
        .catch(err => {
            console.log("ERRO NA IMG", err)
        })
    };

    storePhotos = async () => {
        const { navigation, armazenaFotos } = this.props;
        const { photos } = this.state;
        await armazenaFotos({ fotos: photos });

        navigation.navigate({
            routeName: 'MenuRDO',
        })
    }

  componentDidMount() {
    const { rdoAtual } = this.props;
    const photos = rdoAtual.fotos;
    this.setState({
      photos
    })
  };

    render() {
        const { photos } = this.state;
        return <Container>
            <HeaderNav title={"Fotos RDO"} />
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
                    keyExtractor={(item, index) => String(index)}
                />
                <Fab
                    position="bottomRight"
                    style={{ backgroundColor: "#13328c" }}
                    onPress={() => { this.pickImage() }}>
                    <Icon name='md-camera'/>
                </Fab>
            </Content>
            <Button
                block
                onPress={() => this.storePhotos()}
                style={{ marginVertical: 5 }}
                disabled={photos.length <= 0}
            >
                <Text>Concluído</Text>
            </Button>
        </Container>
    }
}

const mapStateToProps = (state: ApplicationState) => ({
  rdoAtual: state.manutencaoRDOReducer.rdoAtual
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FotosRDO)
