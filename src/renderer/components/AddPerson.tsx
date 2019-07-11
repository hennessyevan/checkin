import * as React from 'react';
import { Button } from 'react-desktop/windows';
import { Formik, Form } from 'formik';
import { useGlobal } from 'reactn';
import { TextInput } from './react-desktop/TextInput';
import Modal from 'react-modal';
import appContext from '../contexts/appContext';
import * as Yup from 'yup';
import PhotoField from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Global } from '@emotion/core';
import { X } from 'react-feather';

const cameraCSS = {
    borderRadius: '50%',
    width: 300,
    height: 300,
    'object-fit': 'cover'
};

const PersonSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is Required'),
    lastName: Yup.string().required('Last Name is Required'),
    email: Yup.string().email('Invalid email'),
    photo: Yup.string()
});

export function AddPerson() {
    const addPerson: any = useGlobal('addPerson');
    const [modalIsOpen, openModal] = React.useState(false);
    const { theme, colors } = React.useContext(appContext);

    return (
        <div>
            <Button color={colors.dark} push={true} onClick={() => openModal(true)}>
                Add Person
            </Button>
            <Modal
                style={{
                    overlay: {
                        background:
                            theme === 'light' ? 'rgba(255,255,255, 0.75)' : 'rgba(0,0,0,0.75)'
                    },
                    content: {
                        color: theme === 'light' ? '#000' : '#FFF',
                        padding: '12px 32px',
                        borderRadius: 0,
                        background: theme === 'light' ? '#efefef' : '#2d2d2d',
                        borderColor: theme === 'light' ? '#ccc' : '#000',
                        width: '100%',
                        boxSizing: 'border-box',
                        left: 0,
                        right: 0,
                        borderWidth: '1px 0'
                    }
                }}
                onRequestClose={() => openModal(false)}
                isOpen={modalIsOpen}
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
                    onClick={() => openModal(false)}
                >
                    <X />
                </div>
                <h4>Add a new Person</h4>
                <Formik
                    validationSchema={PersonSchema}
                    initialValues={{ firstName: '', lastName: '', email: '', photo: undefined }}
                    onSubmit={(values, actions) => {
                        addPerson(values);
                        openModal(false);
                        actions.setSubmitting(false);
                    }}
                    render={props => {
                        return (
                            <Form css={{ display: 'flex', width: '100%' }}>
                                <div css={{ flexBasis: '50%' }}>
                                    <TextInput
                                        label="First Name"
                                        name="firstName"
                                        required={true}
                                        placeholder="Kateri"
                                        error={props.touched.firstName && props.errors.firstName}
                                    />
                                    <TextInput
                                        label="Last Name"
                                        name="lastName"
                                        required={true}
                                        placeholder="Tekakwitha"
                                        error={props.touched.lastName && props.errors.lastName}
                                    />
                                    <TextInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="kateri@tekakwitha.com"
                                        error={props.touched.email && props.errors.email}
                                    />
                                    <div
                                        css={{
                                            position: 'absolute',
                                            bottom: 24,
                                            right: 24,
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gridGap: 8
                                        }}
                                    >
                                        <Button onClick={props.submitForm} type="submit">
                                            Add
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                props.resetForm();
                                                openModal(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                                <Global
                                    styles={{
                                        '.react-html5-camera-photo video': cameraCSS
                                    }}
                                />
                                {props.values.photo ? (
                                    <div css={{ display: 'grid', gridGap: 16 }}>
                                        <img css={cameraCSS} src={props.values.photo} />
                                        <Button
                                            onClick={() => props.setFieldValue('photo', undefined)}
                                        >
                                            Retake
                                        </Button>
                                    </div>
                                ) : (
                                    <PhotoField
                                        onTakePhoto={(dataURI: string) =>
                                            props.setFieldValue('photo', dataURI)
                                        }
                                    />
                                )}
                            </Form>
                        );
                    }}
                />
            </Modal>
        </div>
    );
}
