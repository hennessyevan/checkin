import * as React from 'react';
import { useGlobal } from 'reactn';

const EventId: React.FC = () => {
    const event: any = useGlobal('event');

    return <div>{event}</div>;
};

export default EventId;
