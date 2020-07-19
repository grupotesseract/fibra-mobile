import axios from 'axios';
import { ManutencaoRDO } from '../store/ducks/rdo/types';

const api = axios.create({
    baseURL: 'https://fibra.grupotesseract.com.br/api'
})

export const setToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = "Bearer " + token;
}

export const clearToken = () => {
    api.defaults.headers.common['Authorization'] = "";
}

export const login = async ({ email, password }) => {

  try {
    const res = await api.post("login", {
      email,
      password
    });
    const data = res.data.data;
    console.log("data no login", data);
    const { id, nome, role } = data.usuario;
    const { token } = data.token;
    return {
      id,
      nome,
      role,
      token
    };
  } catch (error) {
    console.log("erro no login", error);
    return { error };
  }
};

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

export const uploadProgramacao = ({ idProgramacao, programacao }) => {

  const { itensAlterados } = programacao;
  if(itensAlterados) {
    let itensArrayUnico = [];
    itensAlterados.forEach(item => {
      const materiais = item.materiais || [];
      const materiaisArray = materiais.map(material => ({
        material_id: material.id,
        item_id: item.item_id,
        quantidade_instalada: material.quantidadeInstalada,
        quantidade_base: material.quantidadeBase,
      }))
      itensArrayUnico.push(...materiaisArray);
    });
    programacao.itensAlterados = itensArrayUnico;
  }
  return api.post('sync/programacoes/'+idProgramacao, programacao)
    .then(response => {
        const data = response.data.data;
        return data;
    })
    .catch(error => ({ error }));
  }

export const uploadFotos = async ({ idProgramacao, idItem, fotos }) => {
  const url = 'sync/programacoes/'+idProgramacao+'/item/'+idItem+'/fotos';

  let formData = new FormData();

  fotos.forEach(foto => {
    const { uri } = foto;

    if (uri) {
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
    }

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

    if (uri) {
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
      const firstPart = uriParts[uriParts.lenght - 2]

      formData.append('fotos[]', {
        uri,
        name: `${firstPart}.${fileType}`,
        type: `image/${fileType}`,
      });
    }

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
