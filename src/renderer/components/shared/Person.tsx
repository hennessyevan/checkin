import styled from '@emotion/styled';
import * as React from 'react';
import { User } from 'react-feather';
import { useGlobal } from 'reactn';
import reactModal from 'react-modal';
import { Button } from 'react-desktop/windows';
import appContext from '../../contexts/appContext';
import Dialog from '../Dialog';
import { X } from 'react-feather';
import Label from '../react-desktop/Label';

type Props = {
    person: {
        firstName: string;
        lastName: string;
        email: string;
        id: string;
        photo: string;
    };
};

const PersonPhoto = styled.img`
    border-radius: 50%;
    width: 125px;
    height: 125px;
    margin-bottom: 16px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PhotoDummy = PersonPhoto.withComponent('div');

const PersonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px 8px;
    transition: 100ms;
    cursor: pointer;

    :hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;

const ModalCSS = (theme: string) => ({
    overlay: {
        background: theme === 'light' ? 'rgba(255,255,255, 0.75)' : 'rgba(0,0,0,0.75)'
    },
    content: {
        color: theme === 'light' ? '#000' : '#FFF',
        padding: '12px 32px',
        borderRadius: 0,
        background: theme === 'light' ? '#efefef' : '#2d2d2d',
        borderColor: theme === 'light' ? '#ccc' : '#000',
        width: '100%',
        maxWidth: 350,
        right: 0
    }
});

const PersonModal: React.FC<Props & { isOpen: boolean; closeModal: () => void }> = ({
    person,
    isOpen,
    closeModal
}) => {
    const dbDeletePerson: any = useGlobal('deletePerson');
    const [confirmDelete, setConfirmDelete] = React.useState(false);
    const { theme } = React.useContext(appContext);

    const deletePerson = (id: string) => {
        dbDeletePerson(id);
        closeModal();
    };

    return (
        <Modal
            style={ModalCSS(theme)}
            shouldCloseOnOverlayClick={true}
            isOpen={isOpen}
            onRequestClose={closeModal}
        >
            <div
                css={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    height: 24,
                    width: 24,
                    padding: 8,
                    cursor: 'pointer',
                    ':hover': {
                        background: 'rgba(0,0,0,0.1)'
                    }
                }}
                onClick={closeModal}
            >
                <X />
            </div>
            <div
                css={{
                    marginTop: 64,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {person.photo ? (
                    <PersonPhoto
                        css={{ width: 200, height: 200 }}
                        src={person.photo}
                        alt={`${person.firstName} ${person.lastName}`}
                    />
                ) : (
                    <PhotoDummy css={{ width: 200, height: 200 }}>
                        <User size={50} stroke-width="1.5px" />
                    </PhotoDummy>
                )}
                <h2>
                    {person.firstName} {person.lastName}
                </h2>
                <Label>EMAIL</Label>
                <span>{person.email}</span>
            </div>
            <div css={{ position: 'absolute', bottom: 24, right: 24 }}>
                <Button onClick={() => setConfirmDelete(true)}>Delete</Button>
            </div>
            <Dialog
                intent="danger"
                primaryAction={() => deletePerson(person.id)}
                primaryButtonLabel="Delete"
                onClose={() => setConfirmDelete(false)}
                isOpen={confirmDelete}
            >
                Are you sure you want to delete {person.firstName}?
            </Dialog>
        </Modal>
    );
};

const Person: React.FC<Props> = ({ person }) => {
    const [isModalOpen, setModalIsOpen] = React.useState(false);

    const closeModal = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    return (
        <>
            <PersonWrapper onClick={openModal}>
                {person.photo ? (
                    <PersonPhoto
                        src={person.photo}
                        alt={`${person.firstName} ${person.lastName}`}
                    />
                ) : (
                    <PhotoDummy>
                        <User size={50} stroke-width="1.5px" />
                    </PhotoDummy>
                )}
                <span>{person.firstName}</span>
                <strong>{person.lastName}</strong>
            </PersonWrapper>
            <PersonModal person={person} isOpen={isModalOpen} closeModal={closeModal} />
        </>
    );
};

export default Person;
