import { Box, Text, Stack } from 'native-base'
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

    <Box padding={7}>
      <Stack >
        {colaboradores.map(colaborador => {
          return (
            <Box key={colaborador.id}>
              <Text>{colaborador.nome}</Text>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  usuarios: state.usuariosReducer.listaUsuarios,
})

export default connect(mapStateToProps)(Colaboradores)
