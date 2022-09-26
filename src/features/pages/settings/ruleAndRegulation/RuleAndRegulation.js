import React, {useEffect, useState, useContext}  from 'react';
import Paper from "@material-ui/core/Paper";
import MyButton from "../../../common/components/MyButton";
import { makeStyles, Icon, Modal, TextField, FormControl, FormControlLabel, InputLabel, } from "@material-ui/core";
import { MyTable, MyTextInput } from "../../../common/components";
import { userController } from "../../../../controllers/userController";
import { toast } from "react-toastify";
import AppContext from "../../../../context/AppContext"; 
import { MyActivity } from "../../../common/components/MyActivity";
import { withTheme } from '../../../common/hoc/withTheme';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: 3,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    container: {
        height: 500,
    }
}));

const rand = () => {
    return Math.round(Math.random() * 20) - 10;
}
  
const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const columns = [
    {
        id: "no",
        label: "No",
        minWidth: 50, 
        maxWidth: 50,
        align: "left" 
    },
    {
        id: "ruleTitle",
        label: "Rule Title",
        minWidth: 50, 
        maxWidth: 50,
        align: "left" 
    },
    {
        id: "descriptions",
        label: "Descriptions",
        width:100,
        // minWidth: 100, 
        // maxWidth: 150,
        align: "left" 
    },
    {
        id: "edit",
        label: "",
        minWidth: 50, 
        maxWidth: 50,
        align: "center" 
    }
];

export const RuleAndRegulation = withTheme(props => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [modalOpen, setModalOpen] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [edit, setEdit] = useState(false);
    const [oldData, setOldData] = useState(null);
    const { userData } = useContext(AppContext);
    const userInformation = JSON.parse(userData);

    useEffect(() => {
        props.setLoading(true);
        userController.getRuleAndRegulation((data) =>{
            let result = data.map((v,k) => {
                return {
                    no: k+1,
                    id: v.ruleId,
                    ruleTitle: v.ruleTitle,
                    descriptions: v.descriptions,
                    edit: "link"
                }
            })
            setDataList(result);
            props.setLoading(false);
        });
    },[]);

    const handleOpen = () => {
        setModalOpen(true);
    }

    const handleClose = () => {
        setModalOpen(false);
        setEdit(false);
        if(title && description){
            setTitle(null); 
            setDescription(null);
        } 
    }

    const handleSave = () => {
        props.setLoading(true);
        let list = {
            ruleTitle: title,
            descriptions: description
        }
        if(!edit){
            userController.saveRuleAndRegulation(list, (data) => {
                toast.success(data.name, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                window.location.reload();
            })
            let newData = JSON.stringify(list);
            let activityList = {
                newData: newData,
                oldData: null,
                action: "save",
                remark: null,
                newUser: userInformation.userId,
                pageName: "Create Rule and Regulation"
            };
            MyActivity(activityList);
        }else {
            const params = new URLSearchParams(window.location.search);
            let id = params.get('id');
            let updateList = {
                ruleId: parseInt(id),
                ruleTitle: title,
                descriptions: description
            }
            userController.updateRuleAndRegulation(updateList, (data) => {
                toast.success(data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                window.location.reload();
            })
            let newStr = JSON.stringify(updateList);
            let oldStr = JSON.stringify(oldData);
            let activityList = {
                newData: newStr,
                oldData: oldStr,
                action: "update",
                remark: null,
                newUser: userInformation.userId,
                pageName: "Update Rule and Regulation"
            };
            MyActivity(activityList);
        }
        props.setLoading(false);
        
    }

    const handleUpdate = (id) => {
        props.setLoading(true);
        setEdit(true);
        handleOpen();
        let value = dataList.find(v => v.id === id);
        setTitle(value.ruleTitle);
        setDescription(value.descriptions);

        let list = {
            ruleId: parseInt(id),
            ruleTitle: value.ruleTitle,
            descriptions: value.descriptions
        }
        setOldData(list);
        props.setLoading(false);
    }

    return (
        <div className="container">
            <h1>Rule and Regulation</h1>

            <Paper className={classes.root}>
                <div className="d-flex p-2 align-items-end">
                    <MyButton
                        icon={<Icon className="fa fa-plus" color="default" />}
                        onClick={handleOpen}
                        text={"Create New"}
                        fullWidth={false} 
                    />
                    <Modal
                        open={modalOpen}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <div className="row justify-content-between pt-2">
                                <h4> {`${edit ? "Edit Rule and Regulation" : "Create Rule and Regulation"}`}</h4>
                                <div onClick={handleClose}><i className="fa fa-window-close"  aria-hidden="true"></i></div>
                            </div>
                            <hr />
                            <div className="container">
                              <div className="row pb-2 justify-content-center">
                                <TextField 
                                        id="standard-basic" 
                                        label="Title" 
                                        type="text"
                                        fullWidth={true}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                              </div>
                              <div className="row pt-2 justify-content-center">
                                <MyTextInput
                                        label={"Description"}
                                        fullWidth={true}
                                        type={"text"}
                                        disabled={false}
                                        isTextArea={true}
                                        value={description}
                                        rows={5}
                                        onChange={(e) => setDescription(e.target.value)}
                                        />
                              </div>
                            </div>
                                <div className="pt-3 row justify-content-center">
                                <MyButton
                                    onClick={handleSave}
                                    text={"Save"}
                                    fullWidth={false} 
                                />
                            </div>
                        </div>
                    </Modal>
                </div>
                <MyTable
                    columns={columns}
                    rows={dataList}
                    maxWidth={""}
                    btnText="Edit"
                    link={`/settings/rule-and-regulation`}
                    btnAction={handleUpdate} 
                />
            </Paper>
            
        </div>
    );
})