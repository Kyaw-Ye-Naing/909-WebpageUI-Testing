import * as React from 'react';
import ThemeContext from './ThemeContext';

const withTheme = (PureComponent) => {
  return (props) => {
    return (
      <ThemeContext.Consumer>
        { (contexts) => <PureComponent {...props} {...contexts} /> }
      </ThemeContext.Consumer>
    )
  }
}

export { withTheme } 