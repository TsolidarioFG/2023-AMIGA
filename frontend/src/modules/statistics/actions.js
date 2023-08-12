import axios from "axios";
import * as actionTypes from "./actionTypes";

export const exportExcel = (startDate, endDate) => {
    axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/participant/downloadExcel?startDate=${startDate}&endDate=${endDate}`,
        method: 'get',
        responseType: 'blob',
        headers: {
             Authorization: 'Bearer ' + sessionStorage.getItem('serviceToken')
        },
    }).then((response) => {
        // create a Blob object from the response data
        const blob = new Blob([response.data], {
            type: response.headers['content-type'],
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Estadisticas' + startDate.split("-")[0] + "-" + endDate.split("-")[0] + '.xlsx';
        link.click();
    });
};

const getStatisticsCompleted = statistics => ({
    type: actionTypes.FIND_STATISTICS_COMPLETED,
    statistics
});

export const getStatistics = (startDate, endDate) => (dispatch) => {
    axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/participant/statistics?startDate=${startDate}&endDate=${endDate}`,
        method: 'get',
        headers: {
             Authorization: 'Bearer ' + sessionStorage.getItem('serviceToken')
        },
    }).then((response) => {
        dispatch(getStatisticsCompleted(response.data));
    });
}