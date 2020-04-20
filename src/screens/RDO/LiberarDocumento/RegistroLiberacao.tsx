import React, { Component } from 'react';
import { Container, Content, Text, Button, ListItem, List, View, Input, H3, CheckBox } from 'native-base';
import HeaderNav from '../../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store'
import { Usuario } from '../../../store/ducks/usuarios/types';
import { NavigationScreenProp } from 'react-navigation';

interface StateProps {
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  liberarDocumentoManutencao(now: string, usuarios: number[]): void,
}

type Props = StateProps & DispatchProps
class RegistroLiberacao extends Component<Props> {

  state = {
  }

  liberarDocumento = async () => {
    const { navigation } = this.props;

    navigation.navigate({ routeName: 'MenuRDO' })
  }

  render() {

    return (
      <Container>
        <HeaderNav title="Liberação de Documento"/>

        <Content padder>

          <Button
            block
            onPress={() => this.props.navigation.navigate({
              routeName: 'ComentariosRDO',
              params: {tipo:'IT'},
            })}
            style={style.btnStyle}>
            <Text>IT</Text>
          </Button>
          <Button
            block
            onPress={() => this.props.navigation.navigate({
              routeName: 'ComentariosRDO',
              params: {tipo:'OS'},
            })}
            style={style.btnStyle}>
            <Text>OS</Text>
          </Button>
          <Button
            block
            onPress={() => this.props.navigation.navigate({
              routeName: 'ComentariosRDO',
              params: {tipo:'LEM'},
            })}
            style={style.btnStyle}>
            <Text>LEM</Text>
          </Button>
          <Button
            block
            onPress={() => this.props.navigation.navigate({
              routeName: 'ComentariosRDO',
              params: {tipo:'LET'},
            })}
            style={style.btnStyle}>
            <Text>LET</Text>
          </Button>

          <Button
            block
            onPress={() => this.liberarDocumento()}
          >
            <Text>Iniciar RDO</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const style = {
  btnStyle: {
    marginVertical: 5,
  }
}


const mapStateToProps = (state: ApplicationState) => ({
  usuarios: state.usuariosReducer.listaUsuarios,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistroLiberacao)
