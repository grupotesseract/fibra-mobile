import React, { Component } from 'react'
import { Button, Card, CardItem, Container, Content, Text, Left, Body, Toast } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import HeaderNav from '../../../components/HeaderNav'
import { ApplicationState } from '../../../store'
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { ManutencaoRDO } from '../../../store/ducks/rdo/types';
import { Alert, ScrollView, ActivityIndicator } from 'react-native';
import { iso2ddmmaaaa } from '../../../utils/utils';
import { uploadInfosRDO, uploadFotos, uploadFotosRDO } from '../../../services/api';

interface StateProps {
  rdos: ManutencaoRDO[];
}

interface DispatchProps {
  deleteRDOs(): void
  updateRDO({ rdo }): void
}

type Props = StateProps & DispatchProps

interface State {
}

const CardRDO = ({ rdo, sincronizarRDO }) => {
  const {
    id,
    errorSync,
    dadosEnviados,
    fotosEnviadas,
    fotos,
    dataHoraEntrada,
    dataHoraSaida,
    loading,
  } = rdo;

  return <Card key={rdo.id}>
    <CardItem header bordered>
      { loading && <ActivityIndicator /> }
      <Text> RDO Planta #{id}</Text>
    </CardItem>
    <CardItem>
      <Left>
        <Body>
          <Text>Entrada:</Text>
          <Text note>{iso2ddmmaaaa(dataHoraEntrada)}</Text>
          <Text>Saída:</Text>
          <Text note>{iso2ddmmaaaa(dataHoraSaida)}</Text>

          <Text style={{ marginVertical: 7, fontWeight: 'bold' }}> 
            Sincronização
          </Text>

          <Text> Informações: {errorSync ? 'reenvio pendente' : dadosEnviados ? 'sincronizadas' : 'pendente'} </Text>
          <Text> Fotos: {fotos.length} fotos {fotosEnviadas ? 'sincronizadas' : 'pendentes'} </Text>

          <Button
            full
            style={{ marginTop: 12 }}
            onPress={() => sincronizarRDO(rdo)}
          >
            { loading ? 
              <ActivityIndicator /> :
              <Text>Sincronizar</Text>
            }
          </Button>
        </Body>
      </Left>
    </CardItem>

    {errorSync &&
      <CardItem footer bordered>
        <Text>Ocorreu um erro ao sincronizar, tente novamente.</Text>
      </CardItem>
    }
  </Card>
};

class SincronizacaoRDO extends Component<Props, State> {

  limpaRDOs = async () => {
    const { deleteRDOs } = this.props;
    Alert.alert(
      'Sincronizar RDOs',
      'Deseja excluir todos os RDOs cadastrados? Esta ação não poderá ser desfeita.',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'OK', onPress: () => deleteRDOs() },
      ],
    )
  }

  syncRDO = async (rdo) => {
    const { updateRDO } = this.props;
    let idRDOServer: number;

    updateRDO({ 
      rdo: {
        ...rdo,
        loading: true,
      }
    });
    
    const res = await uploadInfosRDO(rdo);
    if (res.error) {
      rdo.errorSync = true;

      Toast.show({
        text: String(res.error),
        buttonText: 'Ok',
        type: "danger"
      })
    } else {
      rdo.dadosEnviados = true;
      idRDOServer = res.id;
      console.log("Dados enviados!")
    }

    if(idRDOServer) {
      const resFotos = await uploadFotosRDO({
        fotos: rdo.fotos,
        idRDO: idRDOServer,
      });
      if (resFotos.error) {
        rdo.fotosEnviadas = false;

        Toast.show({
          text: String(resFotos.error),
          buttonText: 'Ok',
          type: "danger"
        })
      } else {
        rdo.fotosEnviadas = true;
        console.log("Fotos enviadas!")
      }
    }
    rdo.loading = false;
    await updateRDO({ rdo });
  }

  render() {
    const { rdos } = this.props;

    return (
      <Container>
        <HeaderNav title="Sincronizar RDOs" />

        <Content padder contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <ScrollView>
            {
              rdos.map(rdo => <CardRDO
                key={rdo.plantaSelecionadaId + rdo.dataHoraEntrada}
                rdo={rdo}
                sincronizarRDO={this.syncRDO}
              />
              )}
            <Button
              full
              onPress={() => this.limpaRDOs()}
            >
              <Text>Limpar RDOs</Text>
            </Button>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  rdos: state.manutencaoRDOReducer.rdos,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SincronizacaoRDO)

