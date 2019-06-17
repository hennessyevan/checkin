import * as React from 'react';
import { ViewWrapper } from '../components/shared/View';
import Person from '../components/shared/Person';
import { useGlobal } from 'reactn';
import { AddPerson } from '../components/AddPerson';
import styled from '@emotion/styled';
import EventId from '../components/EventId';

const PeopleWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 16px;
`;

const ActionBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    background: ${({ theme }) => theme.colors.base};
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 24px;
`;

const Home: React.FC = () => {
    const [people]: any = useGlobal('people');

    return (
        <ViewWrapper>
            <PeopleWrapper>
                {people && people.map((person: any) => <Person key={person.id} person={person} />)}
            </PeopleWrapper>
            <ActionBar>
                <AddPerson />
                <EventId />
            </ActionBar>
        </ViewWrapper>
    );
};

export default Home;
