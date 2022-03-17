import React, { Component } from 'react';
import {
  Box,
  Button,
  Container,
  Text,
  Toast,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../../store';
import * as RDOActions from '../../../store/ducks/rdo/actions';
import { ManutencaoRDO } from '../../../store/ducks/rdo/types';
import { Alert, ScrollView, ActivityIndicator } from 'react-native';
import { iso2ddmmaaaa } from '../../../utils/utils';
import {
  uploadInfosRDO,
  uploadFotos,
  uploadFotosRDO,
} from '../../../services/api';
import ActionButton from '../../../components/ActionButton';

interface StateProps {
  rdos: ManutencaoRDO[];
}

interface DispatchProps {
  deleteRDOs(): void;
  updateRDO({ rdo }): void;
}

type Props = StateProps & DispatchProps;

interface State { }

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

  return (
    <Box key={rdo.id}>
      <Box>
        {loading && <ActivityIndicator color='blue' />}
        <Text> RDO Planta #{id}</Text>
      </Box>
      <Box>
        <Box>
          <Box>
            {/* <Text>Entrada:</Text>
          <Text note>{iso2ddmmaaaa(dataHoraEntrada)}</Text>
          <Text>Saída:</Text>
          <Text note>{iso2ddmmaaaa(dataHoraSaida)}</Text> */}

            <Text style={{ marginVertical: 7, fontWeight: 'bold' }}>
              Sincronização
            </Text>

            <Text>
              Informações:{' '}
              {errorSync
                ? 'reenvio pendente'
                : dadosEnviados
                  ? 'sincronizadas'
                  : 'pendente'}
            </Text>
            <Text>
              Fotos: {fotos.length} fotos{' '}
              {fotosEnviadas ? 'sincronizadas' : 'pendentes'}
            </Text>

            <Button
              style={{ marginTop: 12 }}
              onPress={() => sincronizarRDO(rdo)}
            >
              {loading ? (
                <ActivityIndicator color='white' />
              ) : (
                <Text>Sincronizar</Text>
              )}
            </Button>
          </Box>
        </Box>
      </Box>

      {errorSync && (
        <Box>
          <Text>Ocorreu um erro ao sincronizar, tente novamente.</Text>
        </Box>
      )}
    </Box>
  );
};
const SincronizacaoRDO = (props: Props) => {
  const limpaRDOs = async () => {
    const { deleteRDOs } = props;
    Alert.alert(
      'Sincronizar RDOs',
      'Deseja excluir todos os RDOs cadastrados? Esta ação não poderá ser desfeita.',
      [
        {
          text: 'Cancelar',
          onPress: () => null
        },
        { text: 'OK', onPress: () => deleteRDOs() },
      ]
    );
  };

  const syncRDO = async (rdo) => {
    const { updateRDO } = props;
    let idRDOServer: number;

    updateRDO({
      rdo: {
        ...rdo,
        loading: true,
      },
    });

    const res = await uploadInfosRDO(rdo);
    if (res.error) {
      rdo.errorSync = true;
      rdo.loading = false;
      await updateRDO({ rdo });

      Toast.show({
        title: String(res.error),
        isClosable: true,
        status: 'error',
      });
    } else {
      rdo.dadosEnviados = true;
      idRDOServer = res.id;
      console.log('Dados enviados!');
    }

    if (idRDOServer) {
      const resFotos = await uploadFotosRDO({
        fotos: rdo.fotos,
        idRDO: idRDOServer,
      });
      if (resFotos.error) {
        rdo.fotosEnviadas = false;

        Toast.show({
          title: String(resFotos.error),
          isClosable: true,
          status: 'error',
        });
      } else {
        rdo.fotosEnviadas = true;
        console.log('Fotos enviadas!');
      }
    }
    rdo.loading = false;
    await updateRDO({ rdo });
  };

  const { rdos } = props;

  return (
    <Box
      padding={7}
      style={{
        justifyContent: 'space-between',
      }}
    >
      <ScrollView>
        {rdos.map((rdo) => (
          <CardRDO
            key={rdo.plantaSelecionadaId + rdo.dataHoraEntrada}
            rdo={rdo}
            sincronizarRDO={syncRDO}
          />
        ))}
        <ActionButton onPress={() => limpaRDOs()}>
          Limpar RDOs
        </ActionButton>
      </ScrollView>
    </Box>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  rdos: state.manutencaoRDOReducer.rdos,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SincronizacaoRDO);
