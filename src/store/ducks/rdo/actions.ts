import { action } from 'typesafe-actions';
import { RDOTypes } from './types';

export const selecionarPlanta = ({ plantaSelecionadaId, obraAtividade }) => action(RDOTypes.SELECIONAR_PLANTA, { plantaSelecionadaId, obraAtividade })
export const selecionarEquipe = ({ colaboradores, equipeFiscalizacao }) => action(RDOTypes.SELECIONAR_EQUIPE, { colaboradores, equipeFiscalizacao })
export const atualizaComentario = ({ comentario, tipoComentario }) => action(RDOTypes.ATUALIZA_COMENTARIO, { comentario, tipoComentario })
export const adicionaAtividade = () => action(RDOTypes.ADICIONA_ATIVIDADE);
export const atualizaAtividade = ({ id, descricao, concluido }) => action(RDOTypes.ATUALIZA_ATIVIDADE, { id, descricao, concluido })
export const deleteAtividade = ({ id }) => action(RDOTypes.DELETE_ATIVIDADE, { id })
export const armazenaFotos = ({ fotos }) => action(RDOTypes.ARMAZENA_FOTOS, { fotos })
export const salvaHoraEntrada = () => action(RDOTypes.SALVA_HORA, { tipo: 'entrada'});
export const salvaHoraSaida = () => action(RDOTypes.SALVA_HORA, { tipo: 'saida'});
export const salvaHoraInicioAtividades = () => action(RDOTypes.SALVA_HORA, { tipo: 'inicioatividades'});
export const salvaHoraInicioLEM = () => action(RDOTypes.SALVA_HORA, { tipo: 'inicioLEM'});
export const salvaHoraInicioLET = () => action(RDOTypes.SALVA_HORA, { tipo: 'inicioLET'});
export const salvaHoraFinalLEM = () => action(RDOTypes.SALVA_HORA, { tipo: 'finalLEM'});
export const salvaHoraFinalLET = () => action(RDOTypes.SALVA_HORA, { tipo: 'finalLET'});
export const salvaRDO = () => action(RDOTypes.SALVA_RDO)
export const deleteRDOAtual = () => action(RDOTypes.DELETE_ATUAL)
export const deleteRDOs = () => action(RDOTypes.DELETE_ALL)

