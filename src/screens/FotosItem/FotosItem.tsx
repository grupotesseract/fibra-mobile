import React, { Component } from 'react';
import { Text, Container, Button, Content, Icon, Fab, Grid, Col } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { Image, View, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Planta } from '../../store/ducks/planta/types';
import { NavigationScreenProp } from 'react-navigation';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import * as MediaLibrary from 'expo-media-library';

interface StateProps {
  plantaAtiva: Planta,
  programacoesRealizadas: ProgramacaoRealizada[],
  navigation: NavigationScreenProp<any, any>,
}


interface DispatchProps {
    armazenaFotos(idProgramacao: number, idItem: number, fotos): void,
}

type Props = StateProps & DispatchProps

class FotosItemScreen extends Component<Props> {
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
        const { navigation } = this.props;
        const { idItem } = navigation.state.params;

        ImagePicker.launchCameraAsync({quality: 0.2})
        .then(img => {
            if (!img.cancelled) {
              this.setPhotos([
                  ...photos,
                  img
              ])

              MediaLibrary.createAssetAsync(img.uri)
              .then(asset => {

                MediaLibrary.createAlbumAsync('Iluminação Item '+idItem, asset)
                  .then(() => {
                    console.log('Album created!');
                  })
                  .catch(error => {
                    console.log('err', error);
                  });
              })
            }
        })
        .catch(err => {
            console.log("ERRO NA IMG", err)
        })
    };

    componentDidMount() {
        this.getPermissionAsync();
        this.getPermissionCameraRollAsync();
        const { programacoesRealizadas, plantaAtiva, navigation } = this.props;
        const { idItem } = navigation.state.params;
        const idProgramacao = plantaAtiva.proximaProgramacao.id;

        const programacaoRealizada = programacoesRealizadas.find(programacaoRealizada => programacaoRealizada.programacao.id === idProgramacao);
        if (programacaoRealizada) {
            const fotosItem = programacaoRealizada.fotosItens?.find(fotoItem => fotoItem.id_item === idItem);
            if (fotosItem) {
                this.setPhotos(fotosItem.fotos);
            }
        }
    }

    getPermissionAsync = async () => {
        const platform = '';
        if (platform === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Permissão não foi concedida! As imagens não serão salvas na galeria!');
            }
        }
    }

    getPermissionCameraRollAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Permissão não foi concedida! As imagens não serão salvas na galeria!');
      }
    }

    storePhotos = async () => {
        const { navigation, plantaAtiva, armazenaFotos } = this.props;
        const { idItem } = navigation.state.params;
        const { photos } = this.state;
        const idProgramacao = plantaAtiva.proximaProgramacao.id;
        await armazenaFotos(idProgramacao, idItem, photos);

        navigation.navigate({
            routeName: 'ManutencaoItem',
            params: {
                idItem
            }
        })
    }

    render() {
        const { photos } = this.state;
        const { idItem } = this.props.navigation.state.params;
        return <Container>
            <HeaderNav title={"Fotos Item #"+idItem} />
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
  plantaAtiva: state.plantaReducer.plantaAtiva,
  programacoesRealizadas: state.programacoesReducer.programacoesRealizadas,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FotosItemScreen)
