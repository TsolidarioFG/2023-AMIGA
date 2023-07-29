import * as actionTypes from "./actionTypes";
import backend from "../../backend";

export const findParticipantCompleted = participant => ({
    type: actionTypes.FIND_PARTICIPANT_DATA_COMPLETED,
    participant
});

export const findParticipant = (id, year) => (dispatch) => {
    backend.participant.getParticipantData(id, year,
        (participant) => {
            dispatch(findParticipantCompleted(participant));
        }
    );
}
const clearObservationSearch = () => ({
    type: actionTypes.CLEAR_OBSERVATIONS
});
const findObservationsCompleted = observations => ({
    type: actionTypes.FIND_OBSERVATIONS_COMPLETED,
    observations
});

export const findObservations = criteria => dispatch => {

    dispatch(clearObservationSearch());
    backend.observation.getObservation(criteria.id, criteria.page,
        result => dispatch(findObservationsCompleted({criteria, result})));

}

export const previousFindProductsResultPage = criteria =>
    findObservations({...criteria, page: criteria.page-1});

export const nextFindProductsResultPage = criteria =>
    findObservations({...criteria, page: criteria.page+1});

export const addNewObservation = observations => ({
    type: actionTypes.FIND_OBSERVATIONS_COMPLETED,
    observations
});

export function validarFormatoDNI(dni) {
    // Eliminar espacios en blanco al principio y al final del DNI
    dni = dni.trim();

    // Expresión regular para validar el formato del DNI
    const formatoDNI = /^\d{8}[A-HJ-NP-TV-Z]$/;

    // Comprobar si el DNI cumple con el formato
    if (formatoDNI.test(dni)) {
        // Obtener el número y la letra del DNI
        const numero = dni.substr(0, 8);
        const letra = dni.substr(8, 1).toUpperCase();

        // Calcular la letra correspondiente al número del DNI
        const letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const letraCalculada = letrasValidas.charAt(numero % 23);

        // Comprobar si la letra del DNI es correcta
        return letra === letraCalculada;
    } else {
        return false; // El formato del DNI es incorrecto
    }
}

export function validarFormatoNIE(nie) {
    // Eliminar espacios en blanco al principio y al final del NIE
    nie = nie.trim();

    // Expresión regular para validar el formato del NIE
    const formatoNIE = /^[XYZ]\d{7}[A-HJ-NP-TV-Z]$/;

    // Comprobar si el NIE cumple con el formato
    if (formatoNIE.test(nie)) {
        // Obtener la letra inicial y el número del NIE
        const letraInicial = nie.substr(0, 1).toUpperCase();
        const numero = nie.substr(1, 7);

        // Mapear la letra inicial del NIE a un número
        const mapaLetras = {
            X: 0,
            Y: 1,
            Z: 2,
        };
        const numeroInicial = mapaLetras[letraInicial];

        // Calcular la letra de control del NIE
        const letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const posicionInicial = numeroInicial * 9;
        const posicionFinal = posicionInicial + parseInt(numero);
        const letraCalculada = letrasValidas.charAt(posicionFinal % 23);

        // Comprobar si la letra de control del NIE es correcta
        return letraCalculada === nie.substr(8, 1).toUpperCase();
    } else {
        return false; // El formato del NIE es incorrecto
    }
}
