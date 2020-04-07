import { LiberacaoDocumento } from "../programacoes/types";
import { Planta } from "../planta/types";

/**
 * Action types
 */

 export enum EletricaOuCivilTypes {
    LIBERAR_DOCUMENTO = '@eletricaoucivil/LIBERAR_DOCUMENTO',
    ARMAZENA_FOTOS = '@eletricaoucivil/ARMAZENA_FOTOS',
    ATUALIZA_COMENTARIOS_ADICIONAIS = '@eletricaoucivil/ATUALIZA_COMENTARIOS_ADICIONAIS',
    ATUALIZA_ATIVIDADE_REALIZADA = '@eletricaoucivil/ATUALIZA_ATIVIDADE_REALIZADA',
    ATUALIZA_PROBLEMAS_ENCONTRADOS = '@eletricaoucivil/ARMAZENA_PROBLEMAS_ENCONTRADOS',
    CONCLUI_MANUTENCAO = '@eletricaoucivil/CONCLUI_MANUTENCAO',
    SET_PLANTA = '@eletricaoucivil/SET_PLANTA',
    DELETE_ALL = '@eletricaoucivil/DELETE_ALL',
 }

/**
 * Data types
*/

export interface ManutencaoEletricaOuCivil {
    plantaSelecionada?: Planta
    liberacaoDocumento?: LiberacaoDocumento
    comentariosAdicionais?: string
    atividadeRealizada?: string
    problemasEncontrados?: string
    fotos: string[]

    fotosEnviadas?: boolean
    dadosEnviados?: boolean
    errorSync?: boolean
}

/**
 * State type
 */
export interface EletricaOuCivilState {
    readonly manutencaoAtual: ManutencaoEletricaOuCivil;
    readonly manutencoesEletricaOuCivil: ManutencaoEletricaOuCivil[]
}
