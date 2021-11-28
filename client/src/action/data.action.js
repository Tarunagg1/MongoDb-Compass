import axiosinstance from "../config/axios";
import { DELETE_DATA, GET_DATA, GET_DATA_ERROR } from "../constant/data";
import { toast } from 'react-toastify';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const exportToCSV = (apiData, fileName) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    toast.success("Data exported Successfully")
};

export const getData = () => {
    return async (dispatch) => {
        try {
            const { data: { resp } } = await axiosinstance.get('/');
            dispatch({ type: GET_DATA, payload: resp })

        } catch (error) {
            dispatch({ type: GET_DATA_ERROR, payload: error.response.data.message })
        }

    }
}


export const addDataAction = (userData) => {
    return async (dispatch) => {
        try {
            await axiosinstance.post(`/`, userData);
            dispatch(getData());
            toast.success("Data inserted successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}


export const deleteDataAction = (id) => {
    return async (dispatch) => {
        try {
            await axiosinstance.delete(`/${id}`);
            dispatch({ type: DELETE_DATA, payload: id })
            toast.success("Data deleted")
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}


export const updateDataAction = (id, User) => {
    return async (dispatch) => {
        try {
            await axiosinstance.put(`/${id}`, User);
            dispatch(getData());
            toast.success("Data Updated")
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}
