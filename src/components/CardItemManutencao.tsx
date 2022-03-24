import React, { Component } from 'react';
import {
  Button,
  Text, VStack,
  Divider,
  HStack
} from 'native-base';
import NumericInput from 'react-native-numeric-input';
import { Material } from '../store/ducks/planta/types';

type Props = {
  material: Material,
  onChangeQuantidadeBase: (idMaterial: number, quantidadeBase: number) => void,
  onChangeQuantidadeReator: (idMaterial: number, quantidadeReator: number) => void,
  onChangeQuantidade: (idMaterial: number, quantidade: number) => void,
  onPressBotaoOK: (idMaterial: number, quantidadeConfirmada: boolean) => void,
  permiteAlteracao: boolean
}

export class CardItemManutencao extends Component<Props> {
  shouldComponentUpdate(nextProps, nextState) {
    const quantidade = nextProps.material.quantidade;
    const prevQuantidade = this.props.material.quantidade;

    const quantidadeBase = nextProps.material.quantidadeBase;
    const prevQuantidadeBase = this.props.material.quantidadeBase;

    const quantidadeReator = nextProps.material.quantidadeReator;
    const prevQuantidadeReator = this.props.material.quantidadeReator;

    const quantidadeConfirmada = nextProps.material.quantidadeConfirmada;
    const prevQuantidadeConfirmada = this.props.material.quantidadeConfirmada;

    return (
      quantidade !== prevQuantidade ||
      quantidadeConfirmada !== prevQuantidadeConfirmada ||
      quantidadeBase !== prevQuantidadeBase ||
      quantidadeReator !== prevQuantidadeReator
    );
  }

  render() {
    const {
      material,
      onChangeQuantidadeBase,
      onChangeQuantidadeReator,
      onChangeQuantidade,
      onPressBotaoOK,
      permiteAlteracao,
    } = this.props;

    return (
      <VStack space={2} borderColor="transparent" borderWidth="1" shadow={1} padding={4} >

        <Text color='primary.600' bold mb={2}>
          LÂMPADA
        </Text>
        <Divider />
        <VStack>
          <Text>Tipo: {material.tipoMaterial}</Text>
          {material.base && <Text>Base: {material.base}</Text>}
          {material.reator && <Text>Reator : {material.reator}</Text>}
        </VStack>
        <VStack>
          {material.potencia && <Text>Potência: {material.potencia}</Text>}
          {material.tensao && <Text>Tensão: {material.tensao}</Text>}
          <Text>Quantidade Instalada: {material.quantidadeInstalada}</Text>
        </VStack>
        <Divider />
        <Text bold textAlign={'center'}>Trocas</Text>
        {material.base && (
          <HStack marginTop={3} space={2} alignItems='center'>
            <Text>Bases:</Text>
            <NumericInput
              minValue={0}
              step={+!material.quantidadeConfirmada}
              editable={false}
              rounded={true}
              value={material.quantidadeBase}
              onChange={(quantidade) =>
                onChangeQuantidadeBase(material.id, quantidade)
              }
            />
          </HStack>
        )}
        {material.reator && (
          <HStack marginTop={3} space={2} alignItems='center'>
            <Text>Reatores:</Text>
            <NumericInput
              minValue={0}
              step={+!material.quantidadeConfirmada}
              editable={false}
              rounded={true}
              value={material.quantidadeReator}
              onChange={(quantidade) =>
                onChangeQuantidadeReator(material.id, quantidade)
              }
            />
          </HStack>
        )}
        <HStack marginTop={3} space={2} alignItems='center'>
          <Text>Lâmpadas:</Text>
          <NumericInput
            minValue={0}
            step={+!material.quantidadeConfirmada}
            editable={false}
            rounded={true}
            value={material.quantidade}
            onChange={(quantidade) =>
              onChangeQuantidade(material.id, quantidade)
            }
          />
        </HStack>


        <Button
          margin={3} size='lg'
          rounded='2xl' alignContent='center'
          isDisabled={!permiteAlteracao}
          colorScheme={material.quantidadeConfirmada && permiteAlteracao ? 'success' : 'warning'}
          onPress={() => onPressBotaoOK(
            material.id,
            material.quantidadeConfirmada
          )}
        >Confirmar</Button>
      </VStack>

    );
  }
}
