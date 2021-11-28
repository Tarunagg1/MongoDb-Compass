import React, { useEffect, useState } from 'react'
import LeftSidebar from './LeftSidebar';
import './css/dashboard.css';
import { getData, deleteDataAction, exportToCSV, addDataAction, updateDataAction } from '../action/data.action';
import { useDispatch, useSelector } from 'react-redux';
import ModelPopup from '../container/Model';



export default function Dashboard() {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.data);
    const [isEditedMode, setisEditedMode] = useState(null);
    const [WhyOpenModel, setWhyOpenModel] = useState(null);
    const [dataTab, setdataTab] = useState(false);
    const [inputFields, setinputFields] = useState([])

    const [open, setOpen] = React.useState(false);


    const toggleModal = () => {
        setOpen((val) => !val);
    };


    useEffect(() => {
        dispatch(getData());
    }, [])

    const modelOpen = (data, val) => {
        setinputFields([]);
        let arr = [];
        if (data) {
            setisEditedMode(data.uid);
            for (const [key, value] of Object.entries(data)) {
                if (key !== "_id" && key !== "uid") {
                    arr.push({ key, value });
                }
            }
            console.log(arr);
            setinputFields(arr);
        }
        toggleModal();
        setWhyOpenModel(val);
    }

    const submitFields = () => {

        let finalObj = {};
        inputFields.forEach(element => {
            if (element.key !== "_id" && element.value !== "uid") {
                finalObj[element.key] = element.value;
            }
        })

        if (isEditedMode) {
            dispatch(updateDataAction(isEditedMode, finalObj))
            setisEditedMode(null);
        } else {
            dispatch(addDataAction(finalObj));
        }

        toggleModal();
        setinputFields([]);
        setWhyOpenModel(null);
    }

    const addContent = (e, index) => {
        const values = [...inputFields];
        values[index][e.target.name] = e.target.value;
        setinputFields(values);
    }

    const addFields = () => {
        setinputFields((val) => [...val, { key: "", value: "" }])
    }

    const deleteField = (ind) => {
        const values = [...inputFields];
        values.splice(ind, 1);
        setinputFields(values);
    }


    const toggleTab = () => {
        setdataTab((val) => !val)
    }

    const deleteData = (id) => {
        dispatch(deleteDataAction(id));
    }

    // Edit Update model code
    const returnModel = () => {
        return (
            <ModelPopup open={open} toggleModal={toggleModal}>
                <div className="model-container">
                    <div className="container">
                        {
                            inputFields.length > 0 && (
                                inputFields.map((ele, i) => (
                                    <div key={i} className="form-group">
                                        <input type="text" value={inputFields[i].key} onChange={(e) => addContent(e, i)} placeholder="Enter key.." name="key" />
                                        <input type="text" value={inputFields[i].value} onChange={(e) => addContent(e, i)} placeholder="Enter Value.." name="value" />
                                        <button onClick={() => deleteField(i)}><i className="fas fa-trash-alt"></i></button>
                                    </div>
                                ))
                            )
                        }

                    </div>
                    <div className="footer">
                        <button onClick={addFields}>Add Fields</button>
                        <button onClick={submitFields}>{isEditedMode ? "Update" : "Insert"}</button>
                    </div>
                </div>
            </ModelPopup>
        )
    }

    // Import file code

    return (
        <div className="dashboard">
            <LeftSidebar />
            <div className="dashboardmain">
                {returnModel()}
                <div className="dashboardheader">
                    <div className="top">
                        <div className="left">
                            <p>Dodument</p>

                        </div>
                        <div className="right">
                            <h5>Document 7</h5>
                        </div>
                    </div>

                    <div className="mid">
                        <ul>
                            <li>Documents</li>
                            <li>Aggregations</li>
                            <li>Schema</li>
                            <li>Explain</li>
                            <li>Indexes</li>
                            <li>Validations</li>
                        </ul>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <button onClick={toggleTab} className="adddata"><i className="fas fa-download"></i> Add Data <i className="fas fa-sort-down"></i></button>
                            <div className={`listadddata ${dataTab ? "" : "hidden"}`}>
                                <ul>
                                    <li onClick={() => modelOpen(null, "insertField")}>Import File</li>
                                    <li onClick={() => modelOpen(null, "insertField")}>Insert Document</li>
                                </ul>
                            </div>
                            <button className="uploaddata" onClick={() => exportToCSV(data, new Date().getTime() + "data")}><i className="fas fa-upload"></i></button>
                            <p>View</p>
                            <div className="icons">
                                <button><i className="far fa-calendar-alt"></i></button>
                                <button><i className="far fa-calendar-alt"></i></button>
                                <button><i className="far fa-calendar-alt"></i></button>
                            </div>
                        </div>
                        <div className="right">
                            <p>Displaying documents 1 - 7 of 7</p>
                        </div>
                    </div>
                </div>
                <div className="dashboardbody">
                    {
                        data.length > 0 ? (
                            data.map((ele) => (
                                <div className="card">
                                    {
                                        <pre>{JSON.stringify(ele, null, 2)}</pre>
                                    }
                                    <div className="actionicons">
                                        <div className="icon">
                                            <button onClick={() => modelOpen(ele, "insertfile")}><i className="fas fa-edit"></i></button>
                                            <button onClick={() => deleteData(ele.uid)}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : ""
                    }

                </div>
            </div>
        </div>
    )
}
