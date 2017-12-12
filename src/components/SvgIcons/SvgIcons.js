import React from "react";
import classnames from "classnames";

import "./SvgIcons.css";

function getWrapper(props, child, extra = {}) {
  const size = props.size || "regular";
  const viewBox = props.viewBox || extra.viewBox || "0 0 24 24";

  let classNames = classnames(
    { [`Theme-${props.theme}`]: props.theme },
    "SvgIcons",
    `SvgIcons-${size}`
  );

  if (props.styles) {
    classNames = props.styles.reduce(function(prevValue, currentValue, key) {
      return prevValue + ` SvgIcons-${currentValue}`;
    }, classNames);
  }

  return (
    <svg
      className={classNames}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {child}
    </svg>
  );
}

export const Edit = (props) => {
  return getWrapper(
    props,
    <g>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </g>
  );
};

export const Wrong = (props) => {
  return getWrapper(
    props,
    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
  );
};

export const Plus = (props) => {
    return getWrapper(
      props,
      <g>
        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </g>
    );
  };
