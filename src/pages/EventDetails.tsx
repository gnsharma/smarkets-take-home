import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { format } from 'date-fns';

import fetchEventDetails from '../queries/eventDetails';

const EventDetails = () => {
  const { eventId } = useParams<{ eventId?: string }>();

  const popularEvents = useQuery(['/events', [eventId]], () =>
    fetchEventDetails([eventId ?? ''])
  );

  if (popularEvents.isLoading) return <>Loading...</>;

  if (popularEvents.error && popularEvents.error instanceof Error)
    return <>An error has occurred: {popularEvents.error.message}</>;

  if (popularEvents.isSuccess) {
    return (
      <>
        {popularEvents.data.events.map((event) => (
          <Row>
            <Col span={24}>
              <Card title={event.name} key={event.id}>
                <div> {event.description}</div>
                <div>
                  Updated:
                  {format(new Date(event.modified), 'do MMMM yyyy, hh:mm aaaa')}
                </div>
                <div>Status: {event.state}</div>
                {event.type && <div>{event.type.domain}</div>}
              </Card>
            </Col>
          </Row>
        ))}
      </>
    );
  }

  return <>An error has occurred</>;
};

export default EventDetails;
