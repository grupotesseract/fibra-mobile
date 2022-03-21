import React, { Component } from 'react';
import {
  Button,
  Text, VStack,
  Divider,
  HStack
} from 'native-base';
import NumericInput from 'react-native-numeric-input';

type Props = {
  itemMaterial: any,
  onChangeQuantidade: (idMaterial: any, quantidade: any) => void
  onPressBotaoOK: (idMaterial: any, quantidadeConfirmada: any) => void
}

export class CardEstoque extends Component<Props> {
  shouldComponentUpdate(nextProps, nextState) {
    const quantidade = nextProps.itemMaterial.quantidade;
    const prevQuantidade = this.props.itemMaterial.quantidade;

    const quantidadeConfirmada = nextProps.itemMaterial.quantidadeConfirmada;
    const prevQuantidadeConfirmada = this.props.itemMaterial
      .quantidadeConfirmada;

    return (
      quantidade !== prevQuantidade ||
      quantidadeConfirmada !== prevQuantidadeConfirmada
    );
  }

  render() {
    const { itemMaterial, onChangeQuantidade, onPressBotaoOK } = this.props;

    return (
      <VStack borderColor="transparent" borderWidth="1" shadow={1} padding={4} mb={2}>
        <Text color='primary.600' bold mb={2}>
          {itemMaterial.nome
            ? itemMaterial.nome
            : itemMaterial.tipoMaterialTipo.toUpperCase()}
        </Text>
        <Divider />
        <VStack>
          {itemMaterial.tipoMaterial && (
            <Text>Tipo: {itemMaterial.tipoMaterial}</Text>
          )}
          {itemMaterial.potencia && (
            <Text>Potência: {itemMaterial.potencia}</Text>
          )}
          {itemMaterial.tensao && (
            <Text>Tensão: {itemMaterial.tensao}</Text>
          )}
          {itemMaterial.base && <Text>Base: {itemMaterial.base}</Text>}
        </VStack>

        <HStack marginTop={3} alignItems='center'>
          <Text mr={2}>Qtde. Estoque:</Text>
          <NumericInput
            minValue={0}
            step={+!itemMaterial.quantidadeConfirmada}
            editable={false}
            rounded={true}
            value={itemMaterial.quantidade}
            onChange={(quantidade) => onChangeQuantidade(itemMaterial.id, quantidade)} />

          <Button
            ml={3} size='lg'
            rounded='2xl' alignContent='center'
            colorScheme={itemMaterial.quantidadeConfirmada ? 'success' : 'warning'}
            onPress={() => onPressBotaoOK(
              itemMaterial.id,
              itemMaterial.quantidadeConfirmada
            )}
          >OK</Button>
        </HStack>
      </VStack>

    );
  }
}
