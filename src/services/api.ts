import axios from 'axios';
import { ManutencaoRDO } from '../store/ducks/rdo/types';

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


export const uploadInfosRDO = async (rdo: ManutencaoRDO) => {
  try {
    const {
      plantaSelecionadaId,
      problemasEncontrados,
      infosAdicionais,
      observacoes,
      obraAtividade,
      equipeFiscalizacao,
      colaboradores,
      dataHoraEntrada,
      dataHoraSaida,
      dataHoraFinalLEM,
      dataHoraFinalLET,
      dataHoraInicioLEM,
      dataHoraInicioLET,
      dataHoraInicioAtividades,
      liberacaoIT,
      liberacaoLEM,
      liberacaoLET,
      liberacaoOS,
      atividadesRealizadas,
    } = rdo;

    const objetoManutencao = {
      manutencao_civil_eletrica: {
        problemas_encontrados: problemasEncontrados,
        informacoes_adicionais: infosAdicionais,
        observacoes: observacoes,
        obra_atividade: obraAtividade,
        equipe_cliente: equipeFiscalizacao,
        data_hora_entrada: dataHoraEntrada,
        data_hora_saida: dataHoraSaida,
        data_hora_inicio_lem: dataHoraInicioLEM,
        data_hora_inicio_let: dataHoraInicioLET,
        data_hora_final_lem: dataHoraFinalLEM,
        data_hora_final_let: dataHoraFinalLET,
        data_hora_inicio_atividades: dataHoraInicioAtividades,
        it: liberacaoIT,
        lem: liberacaoLEM,
        let: liberacaoLET,
        os: liberacaoOS,
      },
      atividades_realizadas: atividadesRealizadas.map(atividade =>
        ({
          texto: atividade.descricao,
          status: atividade.concluido,
        })
      ),
      usuarios_manutencao: colaboradores.map(colaboradorId => ({
        usuario_id: colaboradorId
      })),
    };
    console.log("objeto Manutenção", objetoManutencao);
    const res = await api.post('sync/plantas/rdo/'+plantaSelecionadaId, objetoManutencao)

    return res.data.data;
  } catch(error) {
    console.log("error", error);
    return { error };
  }
}

export const uploadFotosRDO = async ({ idRDO, fotos }) => {
  const url = 'sync/plantas/rdo/'+idRDO+'/fotos';

  let formData = new FormData();

  fotos.forEach(foto => {
    const { uri } = foto;

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    const firstPart = uriParts[uriParts.lenght - 2]

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
