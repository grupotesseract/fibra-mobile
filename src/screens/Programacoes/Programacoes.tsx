import React, { Component } from 'react';
import { Container, Content, Text, Card, CardItem, Body, Left, Badge, View, Button, Icon, Spinner } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ProgramacaoRealizada, Programacao } from '../../store/ducks/programacoes/types';

const empresas = [
    { 
      id: 1, 
      nome: 'Valentin e Saraiva e Filhos', 
      plantas: [
        {
          id: 1,
          nome: "65532-630, Travessa Simon, 0 Porto Andres - MS",
          proximaProgramacao: {
            id: 1,
            data_inicio_prevista: '12/01/2020',
            data_fim_prevista: '18/01/2020',
            sincronizadoInfos: false,
            sincronizadoFotos: false,
          },
        },
        {
          id: 3,
          nome: "65532-630, Travessa Simon, Planta 2 Porto Andres - MS",
          proximaProgramacao: {
            id: 2,
            data_inicio_prevista: '13/01/2020',
            data_fim_prevista: '19/01/2020',
            sincronizadoInfos: false,
            sincronizadoFotos: true,
          },
        }
      ]
    },
    { 
      id: 2, 
      nome: 'Rios e Filhos', 
      plantas: [
        {
          id: 2,
          nome: "07969-607, R. Teobaldo, 0405 David d'Oeste - PB",
          proximaProgramacao: {
            id: 3,
            data_inicio_prevista: '08/01/2020',
            data_fim_prevista: '11/01/2020',
            sincronizadoInfos: true,
            sincronizadoFotos: true,
          },
        }
      ]
    },
    
]

interface StateProps {
  programacoesRealizadas: ProgramacaoRealizada[],
}

interface DispatchProps {
  deleteProgramacoes(): void,
}

type Props = StateProps & DispatchProps

class Programacoes extends Component<Props> {    

  state = {
    empresas
  }

  componentDidMount() {
    const { deleteProgramacoes, programacoesRealizadas } = this.props;
    console.log( programacoesRealizadas );
    
  }
  

  render() {
    const { programacoesRealizadas } = this.props;
    const { empresas } = this.state;

    var plantas = [];

    empresas.forEach(function (empresa) {
      empresa.plantas.forEach(function (planta) {
        plantas.push(
          <Card key={planta.proximaProgramacao.id}>
            <CardItem header bordered>
                <Text>{empresa.nome}</Text>                  
            </CardItem>
            <CardItem>
              <Left>
                <Body>                                
                  <Text>{planta.nome}</Text>
                  <Text note>{planta.proximaProgramacao.data_inicio_prevista} - {planta.proximaProgramacao.data_fim_prevista}</Text>
                  <View style={{flexDirection: "row"}}>
                    <Badge 
                        style={style.badgeSync}
                        danger={!planta.proximaProgramacao.sincronizadoInfos}
                        success={planta.proximaProgramacao.sincronizadoInfos}>
                        <Text>Informações</Text>
                    </Badge>
                    <Badge 
                        style={style.badgeSync}
                        danger={!planta.proximaProgramacao.sincronizadoFotos}
                        success={planta.proximaProgramacao.sincronizadoFotos}>
                        <Text>Fotos</Text>
                    </Badge>                  
                  </View>
                  <Button 
                    full 
                    disabled={planta.proximaProgramacao.sincronizadoFotos && planta.proximaProgramacao.sincronizadoInfos} >                    
                      <Text>SINCRONIZAR</Text>                        
                  </Button>
                </Body>
              </Left>
            </CardItem>                              
          </Card>
        );
      })
    });

    return (
      <Container>
        <HeaderNav title="Listagem de Programações"/>

        <Content padder>
          {
            plantas          
          }             
          {
            programacoesRealizadas.map( (programacaoRealizada: ProgramacaoRealizada) => {

              return <Card key={programacaoRealizada.programacao.id}>
                <Text>programacao</Text>
                <Text>data_inicio_prevista {programacaoRealizada.programacao.data_inicio_prevista}</Text>
                <Text>data_fim_prevista {programacaoRealizada.programacao.data_fim_prevista}</Text>
                <Text>data_inicio_real {programacaoRealizada.programacao.data_inicio_real}</Text>
                <Text>data_fim_real {programacaoRealizada.programacao.data_fim_real}</Text>
                <Text>comentarioGeral {programacaoRealizada.programacao.comentarioGeral}</Text>

                <Text>qtdFotos {programacaoRealizada.fotos.length}</Text>
              </Card>
            })
          }

          <Button
            full
            onPress={() => this.props.deleteProgramacoes()}
          >
            <Text>Limpar programações</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const style = {  
  badgeSync: {
      margin: 5,      
      height: 40,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: "row"  
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  programacoesRealizadas: state.programacoesReducer.programacoesRealizadas
})

const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Programacoes)
