import * as React from 'react';
import Modal from 'react-modal';
import { Button } from 'react-desktop/windows';
import appContext from '../contexts/appContext';

type Props = {
    primaryButtonLabel?: string;
    secondaryButtonLabel?: string;
    isOpen?: boolean;
    intent?: 'danger' | 'info' | 'success' | 'warning';
    onClose?: () => void;
    primaryAction?: () => void;
};

const DialogCSS = (theme: string = 'light') => ({
    overlay: {
        background: theme === 'light' ? 'rgba(255,255,255, 0.75)' : 'rgba(0,0,0,0.75)'
    },

    content: {
        padding: '24px 32px',
        borderRadius: 0,
        background: theme === 'light' ? '#efefef' : '#2d2d2d',
        borderColor: theme === 'light' ? '#ccc' : '#000',
        width: '40%',
        maxWidth: 500,
        maxHeight: 500,
        minHeight: 125,
        top: '50%',
        left: '50%',
        height: 0,
        transform: 'translateX(-50%) translateY(-50%)'
    }
});

const Dialog: React.FC<Props> = ({
    isOpen = false,
    intent = 'info',
    onClose = () => {},
    primaryButtonLabel = 'Confirm',
    secondaryButtonLabel = 'Cancel',
    primaryAction = () => {},
    children
}) => {
    const { theme, colors } = React.useContext(appContext);
    return (
        <Modal style={DialogCSS(theme)} isOpen={isOpen} onRequestClose={onClose}>
            {children}
            <div
                css={{
                    position: 'absolute',
                    bottom: 24,
                    right: 24,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridGap: 8,
                    justifyContent: 'flex-end'
                }}
            >
                <Button onClick={onClose}>{secondaryButtonLabel}</Button>
                <Button color={colors[intent]} onClick={primaryAction}>
                    {primaryButtonLabel}
                </Button>
            </div>
        </Modal>
    );
};

export default Dialog;
