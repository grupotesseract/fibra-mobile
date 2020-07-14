import React, { useState, useEffect } from 'react';
import { Card, CardItem, Text, Body, Item, Left, Label, Right, Button, Picker, Icon, View } from 'native-base';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import NumericInput from 'react-native-numeric-input';
import { ApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';


const IncluirMaterialAoItem = ({ estoque, incluirMaterial, cancelarInclusao }) => {
  const [materialId, setMaterialId] = useState(null);
  const [materialSelecionado, setMaterialSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    const selecionado = estoque.find( materialEstoque => materialEstoque.id === materialId)
    setMaterialSelecionado(selecionado);
  }, [materialId]);

  const handleIncluir = () => {
    incluirMaterial({
      ...materialSelecionado,
      quantidadeInstalada: quantidade
    })
  }

  return (
    <Card key={"novoitem-" + materialId}>
      <CardItem header bordered style={{ justifyContent: 'space-between' }}>
        <Text>Incluir material</Text>
        <Button transparent onPress={cancelarInclusao}>
          <Icon name="md-close" />
        </Button>
      </CardItem>
      <CardItem>
        <Body>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: "100%" }}
              placeholder="Escolha um material"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={materialId}
              onValueChange={m => setMaterialId(m)}
            >
              {estoque.map(material => {
                const label =
                  (material.tipoMaterialTipo
                    ? material.tipoMaterialTipo.substring(0, 3)
                    : "") +
                  " " +
                  (material.tipoMaterialAbreviacao || "") +
                  " " +
                  (material.potencia ? material.potencia + "W" : "") +
                  " " +
                  (material.tensao ? material.tensao + "V" : "") +
                  " " +
                  (material.base || "") +
                  " " +
                  (material.reator || "") +
                  " " +
                  (material.nome || "") +
                  " ";
                return <Picker.Item label={label} value={material.id} />;
              })}
            </Picker>
          </Item>
          {materialSelecionado && (
            <Item style={{ borderBottomWidth: 0 }}>
              <View
                style={{
                  marginBottom: 5,
                  borderBottomWidth: 0,
                  paddingBottom: 5,
                  paddingTop: 5
                }}
              >
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
              </View>
            </Item>
          )}
          <Item style={{ borderBottomWidth: 0, borderTopWidth: 0 }}>
            <Left>
              <Label>Qtd. Instalada:</Label>
            </Left>
            <Right>
              <NumericInput
                minValue={0}
                step={1}
                editable={false}
                rounded={true}
                value={quantidade}
                onChange={setQuantidade}
              />
            </Right>
          </Item>
        </Body>
      </CardItem>
      <CardItem footer bordered style={{ flexDirection: "column" }}>
        <Item style={{ borderBottomWidth: 0 }}>
          <Button
            small
            disabled={!materialId}
            rounded={true}
            onPress={handleIncluir}
          >
            <Text>Incluir</Text>
          </Button>
        </Item>
      </CardItem>
    </Card>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  const { plantaAtiva } = state.plantaReducer;
  const { estoque } = plantaAtiva;
  return {
    estoque,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IncluirMaterialAoItem)
