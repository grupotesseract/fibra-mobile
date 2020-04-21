import { action } from 'typesafe-actions';
import { RDOTypes } from './types';

export const selecionarPlanta = ({ plantaSelecionadaId, obraAtividade }) => action(RDOTypes.SELECIONAR_PLANTA, { plantaSelecionadaId, obraAtividade })
export const selecionarEquipe = ({ colaboradores, equipeFiscalizacao }) => action(RDOTypes.SELECIONAR_EQUIPE, { colaboradores, equipeFiscalizacao })
export const atualizaComentario = ({ comentario, tipoComentario }) => action(RDOTypes.ATUALIZA_COMENTARIO, { comentario, tipoComentario })
export const adicionaAtividade = () => action(RDOTypes.ADICIONA_ATIVIDADE);
export const atualizaAtividade = ({ id, descricao, concluido }) => action(RDOTypes.ATUALIZA_ATIVIDADE, { id, descricao, concluido })
export const deleteAtividade = ({ id }) => action(RDOTypes.DELETE_ATIVIDADE, { id })
export const armazenaFotos = (fotos) => action(RDOTypes.ARMAZENA_FOTOS, { fotos })
export const salvaRDO = () => action(RDOTypes.SALVA_RDO)
export const deleteRDOAtual = () => action(RDOTypes.DELETE_ATUAL)
export const deleteRDOs = () => action(RDOTypes.DELETE_ALL)

