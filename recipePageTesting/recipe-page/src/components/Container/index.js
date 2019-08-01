import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './Container.css';

export default function FixedContainer(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed className="Container">
          {props.children}
      </Container>
    </React.Fragment>
  );
}