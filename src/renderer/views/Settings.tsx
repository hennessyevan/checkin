import * as React from 'react';
import { Button, Label } from 'react-desktop/windows';
import appContext from '../contexts/appContext';
import { ViewWrapper } from '../components/shared/View';
import db from '../../database/db';

type Props = {
    setTheme: (theme: string) => void;
};

const Settings: React.FC<Props> = ({ setTheme }) => {
    const { theme } = React.useContext(appContext);
    return (
        <ViewWrapper>
            <Label color={theme === 'light' ? '#000' : '#FFF'} theme={theme}>
                Change Theme
            </Label>
            <Button
                push={true}
                theme={theme}
                onClick={() => {
                    db.update('theme', theme => (theme === 'light' ? 'dark' : 'light')).write();
                    setTheme(theme === 'light' ? 'dark' : 'light');
                }}
            >
                {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
        </ViewWrapper>
    );
};

export default Settings;
