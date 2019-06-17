import * as React from 'react';
import { NavPane, NavPaneItem, Text } from 'react-desktop';
import { Home, Clipboard, Settings } from 'react-feather';
import appContext from '../contexts/appContext';
import reactHelmet from 'react-helmet';
import Attendance from '../views/Attendance';
import Settings from '../views/Settings';
import { css } from '@emotion/core';

const iconMap = new Map<string, any>();
iconMap.set('Home', <Home size={16} />);
iconMap.set('Attendance', <Clipboard size={16} />);
iconMap.set('Settings', <Settings size={16} />);

function renderItem(
    title: string,
    content: React.ReactChild,
    selected: string,
    onSelect: (title: string) => void
) {
    const { theme } = React.useContext(appContext);
    return (
        <NavPaneItem
            title={title}
            icon={iconMap.get(title)}
            theme={theme}
            selected={selected === title}
            onSelect={() => onSelect(title)}
            push={true}
        >
            <Helmet title={title !== 'Home' ? title : ''} />
            <Text color={theme === 'light' ? '#000000' : '#ffffff'}>{content}</Text>
        </NavPaneItem>
    );
}

type Props = {
    setTheme: (theme: string) => void;
};

export const Nav: React.FC<Props> = ({ setTheme }) => {
    const [selectedItem, setSelectedItem] = React.useState('Attendance');
    const { theme, colors } = React.useContext(appContext);

    return (
        <div
            css={css`
                > div {
                    overflow: hidden;
                }
                > div > div:first-of-type {
                    background: ${theme === 'light' ? '#dfdfdf' : '#2d2d2d'};

                    > a {
                        cursor: pointer;
                    }
                }
            `}
        >
            <NavPane background={colors.dark} color={colors.base} theme={theme}>
                {renderItem('Attendance', <AttendanceView />, selectedItem, setSelectedItem)}
                {renderItem(
                    'Settings',
                    <SettingsView setTheme={setTheme} />,
                    selectedItem,
                    setSelectedItem
                )}
            </NavPane>
        </div>
    );
};
