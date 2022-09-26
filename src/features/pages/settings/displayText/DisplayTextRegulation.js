import React, { useEffect, useState, useContext } from 'react';
import { Paper, makeStyles, Modal} from "@material-ui/core";
import { toast } from "react-toastify";
import MyButton from "../../../common/components/MyButton";
import { MyTextInput } from "../../../common/components";
import { userController } from "../../../../controllers/userController";
import AppContext from "../../../../context/AppContext";
import { MyActivity } from "../../../common/components/MyActivity";
import { withTheme } from '../../../common/hoc/withTheme';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: 5,
        height: "auto"
    },
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
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

export const DisplayTextRegulation = withTheme(props => {
    const [regulationText, setRegulationText] = useState(null);
    const [displayId, setDisplayId] = useState(null);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [oldData, setOldData] = useState(null);
    const { userData } = useContext(AppContext);
    const userInformation = JSON.parse(userData);

    useEffect(() => {
        getRegulationText();
    },[]);

    const getRegulationText = () => {
        props.setLoading(true);
        userController.getRegulationText((data) => {
            let value = data[0].displayText;
            let id = data[0].displayId;
            setRegulationText(value); 
            setDisplayId(id);
            let list = {
                displayId: id,
                displayText: value
            }
            setOldData(list);
            props.setLoading(false);
        });
    }

    const handleUpdate = () => {
        props.setLoading(true);
        setOpen(true);
        let textData = { 
            displayId: displayId, 
            displayText: regulationText
        };
        userController.updateRegulationText(textData, (data) => {
            toast.success(data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            getRegulationText();
        })
        let newStr = JSON.stringify(textData);
        let oldStr = JSON.stringify(oldData);
        let activityList = {
            newData: newStr,
            oldData: oldStr,
            action: "update",
            remark: null,
            newUser: userInformation.userId,
            pageName: "Update display text"
        }
        MyActivity(activityList);
        props.setLoading(false);
    }

    return (
        <div className="container">
           <h1>Display Text for Mobile</h1>
           <Paper className={classes.root}>
                <div className="row h-100 p-3">
                    <div className="col-lg-2 col-md-2 col-sm-3">
                        Text:
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-9">
                        {regulationText}
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-12">
                        <MyButton 
                        onClick={() => setOpen(true)}
                        text={"Edit"}
                        fullWidth={false} 
                        />
                    </div>
                </div>
                <Modal
                    open={open}
                    onClose={() => setOpen(true)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paper}>
                        <div className="row justify-content-end pt-2">
                            <div onClick={() => setOpen(false)}><i className="fa fa-window-close"  aria-hidden="true"></i></div>
                        </div>
                        <div className="row pb-2">
                        <MyTextInput
                            //label={"Description"}
                            fullWidth={true}
                            type={"text"}
                            disabled={false}
                            isTextArea={true}
                            value={regulationText}
                            rows={6}
                            onChange={(e) => setRegulationText(e.target.value)}
                        />
                        </div>
                        <div className="row justify-content-center">
                            <MyButton 
                            onClick={handleUpdate}
                            text={"Save"}
                            fullWidth={false} 
                            />
                        </div>
                    </div>
                </Modal>
           </Paper>
        </div>
    );
})