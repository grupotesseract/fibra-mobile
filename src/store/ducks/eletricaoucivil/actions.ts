import { action } from 'typesafe-actions';
import { EletricaOuCivilTypes } from './types';

export const liberarDocumentoManutencao = (now: string, usuarios: number[]) => action(EletricaOuCivilTypes.LIBERAR_DOCUMENTO, { now, usuarios })
export const armazenaFotos = (fotos) => action(EletricaOuCivilTypes.ARMAZENA_FOTOS, { fotos })
export const atualizaComentariosAdicionais = ({ comentario }) => action(EletricaOuCivilTypes.ATUALIZA_COMENTARIOS_ADICIONAIS, { comentario })
export const atualizaAtividaddeRealizada = ({ comentario }) => action(EletricaOuCivilTypes.ATUALIZA_ATIVIDADE_REALIZADA, { comentario })
export const atualizaProblemasEncontrados = ({ comentario }) => action(EletricaOuCivilTypes.ATUALIZA_PROBLEMAS_ENCONTRADOS, { comentario })
export const deleteProgramacoes = () => action(EletricaOuCivilTypes.DELETE_ALL)

export const concluiManutencao = () => action(EletricaOuCivilTypes.CONCLUI_MANUTENCAO)
export const setPlantaManutencaoEletrica = () => action(EletricaOuCivilTypes.SET_PLANTA)
