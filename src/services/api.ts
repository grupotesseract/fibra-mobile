import axios from 'axios';

const api = axios.create({
    baseURL: 'https://stage.fibra.grupotesseract.com.br/api'
})

export const setToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = "Bearer " + token;
}

export const clearToken = () => {
    api.defaults.headers.common['Authorization'] = "";
}

export const login = ({ email, password }) =>
    api.post('login', {
        email,
        password
    })
    .then(response => {
        const data = response.data.data;
        const { id, nome, role } = data.usuario;
        const { token } = data.token;
        return {
            id,
            nome,
            role,
            token
        }
    })
    .catch(error => ({ error }));

export const loginOffline = ({ email, password }) =>
    api.post('login', {
        email,
        password
    })
    .then(response => {
        const data = response.data.data;
        const { id, nome } = data.usuario;
        const { token } = data.token;
        return {
            id,
            nome,
            token
        }
    })
    .catch(error => ({ error }));

export const uploadProgramacao = ({ idProgramacao, programacao }) =>
    api.post('sync/programacoes/'+idProgramacao, programacao)
    .then(response => {
        const data = response.data.data;
        return data;
    })
    .catch(error => ({ error }));

export const uploadFotos = async ({ idProgramacao, idItem, fotos }) => {
  const url = 'sync/programacoes/'+idProgramacao+'/item/'+idItem+'/fotos';

  let formData = new FormData();

  fotos.forEach(foto => {
    const { uri } = foto;

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    const firstPart = uriParts[uriParts.lenght - 2]
    // let filePathAndName = uriParts[uriParts.length - 2].split('/');
    // let fileName = filePathAndName[filePathAndName.length - 1];

    formData.append('fotos[]', {
      uri,
      name: `${firstPart}.${fileType}`,
      type: `image/${fileType}`,
    });
  })


  try {
    const response = await api.post(url, formData);
    const data = response.data.data;
    return data
  }
  catch (error) {
    return ({ error });
  }
}

export default api;
