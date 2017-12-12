import {CSSTransitionGroup} from 'react-css-transition';
import FadeInOut from './FadeInOut';
import React from 'react';

export default class FadeInOutGroup extends React.Component {

  render() {
    return (
      <CSSTransitionGroup {...this.props}>
        {
          React.Children.map(
            this.props.children,
            (child) => <FadeInOut>{child}</FadeInOut>,
          )
        }
      </CSSTransitionGroup>
    );
  }
}

