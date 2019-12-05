import { StyleSheet } from 'react-native'

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 40,
    paddingTop: 0,
  },
  form: {
    marginTop: 40,
  },
  buttonLogin: {
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: 40,
  },
  h1: {
    fontWeight: '300',
    fontSize: 24,
    opacity: 0.75,
  },
  p: {
    fontSize: 16,
    opacity: 0.75,
  },
  label: {
    fontSize: 12.5,
    opacity: 0.5,
  }
})

export default loginStyles
