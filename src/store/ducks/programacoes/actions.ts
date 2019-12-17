import { action } from 'typesafe-actions';
import { ProgramacoesTypes, ProgramacaoRealizada, QuantidadeSubstituida } from './types';

export const updateProgramacao = ({ idProgramacao, programacao }) => action(ProgramacoesTypes.UPDATE_PROGRAMACAO, { idProgramacao, programacao })
export const iniciaItem = ({ idItem, idProgramacao, data}) => action(ProgramacoesTypes.INICIA_ITEM, { idProgramacao, idItem, data })
export const concluiItem = ({ idItem, idProgramacao, data }) => action(ProgramacoesTypes.CONCLUI_ITEM, { idProgramacao, idItem, data })
export const armazenaComentariosGerais = ({ idProgramacao, comentario }) => action(ProgramacoesTypes.ARMAZENA_COMENTARIOS_GERAIS, { idProgramacao, comentario })
export const armazenaComentarioItem = ({ idProgramacao, idItem, comentario }) => action(ProgramacoesTypes.ARMAZENA_COMENTARIO_ITEM, { idProgramacao, idItem, comentario })
export const armazenaQuantidades = (idProgramacao: number, quantidadesSubstituidas: QuantidadeSubstituida[]) => action(ProgramacoesTypes.ARMAZENA_QUANTIDADES, { idProgramacao, quantidadesSubstituidas })
export const armazenaFotos = (idProgramacao: number, idItem: number, fotos) => action(ProgramacoesTypes.ARMAZENA_FOTOS, { idProgramacao, idItem, fotos })
export const addProgramacao = (programacaoRealizada: ProgramacaoRealizada) => action(ProgramacoesTypes.ADD, { programacaoRealizada })
export const liberarDocumentoPlanta = (idProgramacao: number, now: Date, usuarios: number[]) => action(ProgramacoesTypes.LIBERAR_DOCUMENTO, { idProgramacao, now, usuarios })
export const confirmaPeriodoProgramacao = (idProgramacao: number, dataInicioReal: Date) => action(ProgramacoesTypes.CONFIRMA_PERIODO, { idProgramacao, dataInicioReal })
export const deleteProgramacoes = () => action(ProgramacoesTypes.DELETE_ALL)