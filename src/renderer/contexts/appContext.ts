import { createContext } from 'react';

const appContext = createContext({
    theme: 'light',
    colors: {
        lightest: '#F1FBFC',
        light: '#D2EEF3',
        base: '#14B5D0',
        dark: '#007489',
        danger: '#BF0E08',
        success: '#00783E',
        warning: '#95591E',
        info: '#084B8A'
    }
});

const { Provider: AppContextProvider, Consumer: AppContextConsumer } = appContext;

export { AppContextConsumer, AppContextProvider };
export default appContext;
