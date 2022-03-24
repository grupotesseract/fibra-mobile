import React, { useState, useEffect } from 'react';
import {
  Card,
  Stack,
  Text,
  Box,
  Button,
  Select,
  Icon,
  View,
  HStack,
  IconButton,
  Divider,
} from 'native-base';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import NumericInput from 'react-native-numeric-input';
import { ApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ActionButton from '../../components/ActionButton';
import { Ionicons } from '@expo/vector-icons';

const IncluirMaterialAoItem = ({
  estoque,
  incluirMaterial,
  cancelarInclusao,
}) => {
  const [materialId, setMaterialId] = useState(null);
  const [materialSelecionado, setMaterialSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState(0);
  const [quantidadeBase, setQuantidadeBase] = useState(0);
  const [quantidadeReator, setQuantidadeReator] = useState(0);

  useEffect(() => {
    const selecionado = estoque.find(
      (materialEstoque) => materialEstoque.id === materialId
    );
    setMaterialSelecionado(selecionado);
  }, [materialId]);

  const handleIncluir = () => {
    incluirMaterial({
      ...materialSelecionado,
      quantidadeInstalada: quantidade,
      quantidadeBase: quantidadeBase,
      quantidadeReator: quantidadeReator,
      novoMaterial: true,
    });
  };

  return (
    <Stack flex={1} borderColor="transparent" borderWidth="1" shadow={1} padding={4} alignItems='center'>
      <HStack w='100%' justifyContent='space-between' alignItems='center'>
        <Text color='primary.600' bold>Incluir material</Text>
        <IconButton onPress={cancelarInclusao} icon={<Icon as={Ionicons} name='md-close' />} />
      </HStack>
      <Divider />
      <Stack w='100%' space={2}>
        <Select
          placeholder='Escolha um material'
          selectedValue={`${materialId}`}
          onValueChange={(id) => setMaterialId(Number(id))}
          fontSize='md'
        >
          {estoque.map((material) => {
            const label =
              (material.tipoMaterialTipo
                ? material.tipoMaterialTipo.substring(0, 3)
                : '') +
              ' ' +
              (material.tipoMaterialAbreviacao || '') +
              ' ' +
              (material.potencia ? material.potencia + 'W' : '') +
              ' ' +
              (material.tensao ? material.tensao + 'V' : '') +
              ' ' +
              (material.base || '') +
              ' ' +
              (material.reator || '') +
              ' ' +
              (material.nome || '') +
              ' ';
            return <Select.Item label={label} value={`${material.id}`} />;
          })}
        </Select>
        {materialSelecionado && (
          <Stack>
            {materialSelecionado.tipoMaterialTipo && (
              <Text>{materialSelecionado.tipoMaterialTipo}</Text>
            )}
            {materialSelecionado.tipoMaterial && (
              <Text>Tipo: {materialSelecionado.tipoMaterial}</Text>
            )}
            {materialSelecionado.base && (
              <Text>Base: {materialSelecionado.base}</Text>
            )}
            {materialSelecionado.reator && (
              <Text>Reator: {materialSelecionado.reator}</Text>
            )}
            {materialSelecionado.tensao && (
              <Text>Tensão: {materialSelecionado.tensao}</Text>
            )}
            {materialSelecionado.potencia && (
              <Text>Potência: {materialSelecionado.potencia}</Text>
            )}
          </Stack>
        )}

        <HStack space={2} alignItems='center' >
          <Text>Qtd. Instalada:</Text>
          <NumericInput
            minValue={0}
            step={1}
            editable={false}
            rounded={true}
            value={quantidade}
            onChange={setQuantidade}
          />
        </HStack>

        {materialSelecionado && materialSelecionado.base && (
          <HStack
            style={{
              borderBottomWidth: 0,
              borderTopWidth: 0,
              marginVertical: 3,
            }}
          >
            <Text>Qtd. Base:</Text>
            <NumericInput
              minValue={0}
              step={1}
              editable={false}
              rounded={true}
              value={quantidadeBase}
              onChange={setQuantidadeBase}
            />
          </HStack>
        )}
        {materialSelecionado && materialSelecionado.reator && (
          <HStack style={{ borderBottomWidth: 0, borderTopWidth: 0 }}>
            <Text>Qtd. Reator:</Text>
            <NumericInput
              minValue={0}
              step={1}
              editable={false}
              rounded={true}
              value={quantidadeReator}
              onChange={setQuantidadeReator}
            />
          </HStack>
        )}
        <Divider />
        <ActionButton mt={2} rounded='xl' isDisabled={!materialId} onPress={handleIncluir}>
          Incluir
        </ActionButton>
      </Stack>
    </Stack>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  const { plantaAtiva } = state.plantaReducer;
  const { estoque } = plantaAtiva;
  return {
    estoque,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncluirMaterialAoItem);
