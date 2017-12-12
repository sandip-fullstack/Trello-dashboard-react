import { CSSTransition, transit } from 'react-css-transition';
import React from 'react';

export default class FadeInOut extends React.Component {

  render() {
    return (
      <CSSTransition
        {...this.props}
        defaultStyle={{ opacity: 0 }}
        enterStyle={{ opacity: transit(1.0, 500, 'ease-in-out') }}
        leaveStyle={{ opacity: transit(0, 500, 'ease-in-out') }}
        activeStyle={{ opacity: 1.0 }}
      />
    );
  }
}
