import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Nav } from './Nav';
import { Global, css } from '@emotion/core';
import { AppContextProvider } from '../contexts/appContext';
import { Helmet } from 'react-helmet';
import '../../database/store';
import db from '../../database/db';
import { ThemeProvider } from 'emotion-theming';

const Application = () => {
    const [appContextValue, setContextValue] = React.useState({
        theme: db.get('theme').value(),
        colors: {
            lightest: '#F7F9FD',
            light: '#DDEBF7',
            base: '#1070CA',
            dark: '#084B8A',
            danger: '#BF0E08',
            success: '#00783E',
            warning: '#95591E',
            info: '#084B8A'
        }
    });
    return (
        <ThemeProvider theme={appContextValue}>
            <AppContextProvider value={appContextValue}>
                <Global
                    styles={css`
                        html {
                            background: ${appContextValue.theme === 'light'
                                ? '#efefef'
                                : '#1d1d1d'};
                            font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans',
                                'Helvetica Neue', Arial, sans-serif;
                        }
                        body {
                            margin: 0;
                        }
                    `}
                />
                <Helmet
                    defaultTitle="Nativity Attendance"
                    titleTemplate="Nativity Attendance - %s"
                />
                <div
                    css={css`
                        > div > div {
                            height: 100vh;
                        }
                    `}
                >
                    <Nav
                        setTheme={(theme: string) => setContextValue({ ...appContextValue, theme })}
                    />
                </div>
            </AppContextProvider>
        </ThemeProvider>
    );
};

export default hot(Application);
