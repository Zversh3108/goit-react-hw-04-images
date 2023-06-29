import React, { Component } from 'react';
import css from './Error.module.css';
import PropTypes from 'prop-types';

export function Error(props) {
  return (
    <div className={css.Error}>
      <p>{props.children}</p>
    </div>
  );
}
Error.propTypes = {
  children: PropTypes.node.isRequired,
};
