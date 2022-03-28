import React, { Component } from 'react';
import { Image, Text, Button, Icon, Fab, Box, Stack } from 'native-base';
import HeaderNav from '../../../components/HeaderNav';
import { View, FlatList, Platform, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationScreenProp } from 'react-navigation';
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { ManutencaoRDO } from '../../../store/ducks/rdo/types';
//import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from '../../../components/ActionButton';

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

    const { rdoAtual } = this.props;

    const { photos } = this.state;
    ImagePicker.launchCameraAsync({ quality: 0.2 })
      .then(img => {
        if (!img.cancelled) {

          this.setPhotos([
            ...photos,
            img
          ])

          MediaLibrary.createAssetAsync(img.uri)
            .then(asset => {

              MediaLibrary.getAlbumAsync('RDO Planta ' + rdoAtual.plantaSelecionadaId)
                .then(album => {
                  if (!album) {
                    MediaLibrary.createAlbumAsync('RDO Planta ' + rdoAtual.plantaSelecionadaId, asset, false)
                      .then(() => {
                        console.log('Album created!');
                      })
                      .catch(error => {
                        alert('Erro ao criar novo album ' + error);
                        console.log('err', error);
                      });
                  } else {
                    MediaLibrary.addAssetsToAlbumAsync(asset, album, false)
                      .then(() => {
                        console.log('Asset inserted!');
                      })
                      .catch(error => {
                        alert('Erro ao adicionar foto no álbum ' + error);
                        console.log('Erro ao adicionar foto no álbum', error);
                      });
                  }
                })
            })
        }
      })
      .catch(err => {
        alert('Erro ao tirar foto ' + err);
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

  async componentDidMount() {

    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // if (status !== 'granted') {
    //   alert('Permissão não foi concedida! As imagens não serão salvas na galeria!');
    // }

    // if (Platform.OS !== 'web') {
    //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   if (status !== 'granted') {
    //     alert('Permissão não foi concedida! As imagens não serão salvas na galeria!');
    //   }
    // }

    const imagePickerStatus = await ImagePicker.getCameraPermissionsAsync();
    console.log('imagePickerStatus', imagePickerStatus);
    if (imagePickerStatus.status !== 'granted') {
      alert('Atenção com as permissões do app!! Confirme as permissões e cheque se as mesmas estão corretas antes de prosseguir');
      if (Platform.OS !== 'web') {
        const { status, expires } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Permissão não foi concedida! A câmera não funcionará!');
        }

        if (expires !== 'never') {
          alert('A permissão liberada não foi a definitiva. O app pode não funcionar corretamente');
        }
      }
    }


    // if (Platform.OS !== 'web') {
    //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   if (status !== 'granted') {
    //     alert('Permissão não foi concedida! A câmera não funcionará!');
    //   }
    // }

    const mediaLibrarystatus = await MediaLibrary.getPermissionsAsync();
    console.log('mediaLibrarystatus', mediaLibrarystatus);
    if (mediaLibrarystatus.status !== 'granted') {
      alert('Atenção com as permissões do app!! Confirme as permissões e cheque se as mesmas estão corretas antes de prosseguir');
      if (Platform.OS !== 'web') {
        const { status, expires } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Permissão não foi concedida! As imagens não serão salvas na galeria!');
        }

        if (expires !== 'never') {
          alert('A permissão liberada não foi a definitiva. O app pode não funcionar corretamente');
        }
      }
    }


    const { rdoAtual } = this.props;
    const photos = rdoAtual.fotos;
    this.setState({
      photos
    })
  };

  render() {
    const { photos } = this.state;
    return (
      <Stack padding={7} flex={1}>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={photos}
            renderItem={({ item, index }) => (
              <Box flex={1} m={1}>
                <Image height={130} width={100} source={{ uri: item.uri }} alt={`imagem #${index}`} />
              </Box>
            )}
            numColumns={3}
            keyExtractor={(item, index) => String(index)}
          />
          <Fab
            placement='bottom-right'
            renderInPortal={false}
            icon={<Icon as={Ionicons} name='md-camera' />}
            onPress={() => { this.pickImage() }} />
        </SafeAreaView>
        <ActionButton
          onPress={() => this.storePhotos()}
          isDisabled={photos.length <= 0}
        >
          Concluído
        </ActionButton>
      </Stack>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  rdoAtual: state.manutencaoRDOReducer.rdoAtual
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FotosRDO)
