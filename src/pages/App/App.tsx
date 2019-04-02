import * as React from 'react';
import Container from '@material-ui/lab/Container';
import { ThemeProvider } from '@material-ui/styles';
import { Theme, makeStyles, createMuiTheme, CssBaseline } from '@material-ui/core';

import Header from '../../components/Header';

import Boards from '../Boards';

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      paddingTop: 76,
    },
  };
});

const theme = createMuiTheme({
  palette: { type: 'dark', primary: { main: '#2196f3' } },
});

export default function App() {
  const styles = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container className={styles.container}>
        <CssBaseline />
        <Header />

        <Boards />
      </Container>
    </ThemeProvider>
  );
}
