import React,{ useState } from "react";
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import MyColor from '../../../config/color'
import { withTheme } from '../hoc/withTheme'


// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  z-Index: 1000
`;

const LoadingComponent= props => {
 
  let [color, setColor] = useState(MyColor.secondarySelected);

  return (
    <div className="sweet-loading h-100 w-100" style={{position: "fixed", left: 0, right: 0, top: 0, bottom: 0,  zIndex: 1000, }}>
      <div className="d-flex justify-content-center align-items-center" style={{height:"100%"}}>
      <PropagateLoader color={color} loading={props.loading} css={override} size={20} />
      </div>
    </div>
  );
}

export default withTheme(LoadingComponent);