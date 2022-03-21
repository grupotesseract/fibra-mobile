import { Box, Text, Stack, Divider } from 'native-base'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import { Usuario } from '../../store/ducks/usuarios/types'

interface StateProps {
  usuarios: Usuario[],
}

type Props = StateProps

const Colaboradores = (props: Props) => {

  const { usuarios } = props
  const colaboradores = usuarios.filter(usuario => usuario.role === 'tecnico')

  return (
    <Stack padding={7}>
      {colaboradores.map(colaborador => {
        return (
          <Box key={colaborador.id}>
            <Text paddingY={3} >{colaborador.nome}</Text>
            <Divider />
          </Box>
        )
      })}
    </Stack>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  usuarios: state.usuariosReducer.listaUsuarios,
})

export default connect(mapStateToProps)(Colaboradores)
