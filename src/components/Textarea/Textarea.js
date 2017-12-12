import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Textarea.css';

class Textarea extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    styles: PropTypes.array,
    title: PropTypes.string,
    pattern: PropTypes.string,
    inputWaitTime: PropTypes.number,
    onInput: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    look: PropTypes.oneOf(['normal', 'rounded']),
    theme: PropTypes.oneOf(['primary', 'transparent']),
    size: PropTypes.oneOf(['regular', 'large', 'small']),
    value: PropTypes.string,
  };

  static defaultProps = {
    name: 'textarea',
    look: 'normal',
    theme: 'primary',
    size: 'regular',
    inputWaitTime: 0,
    disabled: false,
    value: '',
  };

  onInput = (event) => {
    const { props } = this;
    const { name, value } = event.target;
    if (
      !props.onInput
    ) {
      return false;
    }
    props.onInput(value, name);
  };

  getCssClasses(props) {
    let classNames = classnames(
      'Textarea',
      `Textarea-${props.look}`,
      `Textarea-${props.size}`,
      `Theme-${props.theme}`,
      props.classes
    );

    if (props.styles) {
      classNames = props.styles.reduce(function(prevValue, currentValue, key) {
        return prevValue + ` Textarea-${currentValue}`;
      }, classNames);
    }

    return classNames;
  }

   render() {
    const { props } = this;
    const className = this.getCssClasses(props);

    return (
      <textarea
        placeholder={props.placeholder}
        pattern={props.pattern}
        onInput={this.onInput}
        onBlur={this.onBlur}
        onChange={this.onInput}
        onFocus={props.onFocus}
        name={props.name}
        maxLength={props.maxLength}
        minLength={props.minLength}
        className={className}
        disabled={props.disabled}
        value={props.value}
      />
    );
  }
}

export default Textarea;
