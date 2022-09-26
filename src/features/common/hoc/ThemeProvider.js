import * as React from 'react';
import ThemeContext from './ThemeContext';
import { withRouter } from "react-router-dom"

class ThemeProvider extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         theme : null,
         loading: false,
         setLoading: this.setLoading,
         
        };
    }
    setLoading = show => {
      this.setState({ loading: show ? show : false })
    }
   
  
    render() {
      return (
        <ThemeContext.Provider
            value={{
                theme: this.state.theme,
                loading: this.state.loading,
                setLoading: this.setLoading,
            }}
        >
            {this.props.children}
        </ThemeContext.Provider>
      );
    }
  }
  export default withRouter(ThemeProvider)