import styled from '@emotion/styled';
import * as React from 'react';
import { Plus } from 'react-feather';

export const FloatingButtonWrapper = styled.div`
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.base};
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
    width: 50px;
    height: 50px;
    color: white;
`;

type Props = {
    icon?: React.ReactChild;
};

export const FloatingButton: React.FC<Props> = ({ children, icon: Icon = Plus }) => (
    <FloatingButtonWrapper>
        <Icon />
        {children}
    </FloatingButtonWrapper>
);
