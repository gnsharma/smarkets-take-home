import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Card } from 'antd';
import { format } from 'date-fns';

import fetchSportEvents from '../queries/sportEvents';
import fetchEventDetails from '../queries/eventDetails';

const Events = () => {
  const navigate = useNavigate();

  const { sportName } = useParams<{ sportName?: string }>();

  const popularEvents = useQuery(['/sport/events', sportName], async () => {
    const sportEventsResponse = await fetchSportEvents(sportName ?? '');
    return fetchEventDetails(sportEventsResponse.popular_event_ids);
  });

  if (popularEvents.isLoading) return <>Loading...</>;

  if (popularEvents.error && popularEvents.error instanceof Error)
    return <>An error has occurred: {popularEvents.error.message}</>;

  if (popularEvents.isSuccess) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr)',
          gap: '20px',
        }}
      >
        {popularEvents.data.events.map((event) => (
          <Card
            title={event.name}
            key={event.id}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <div> {event.description}</div>
            <div>
              Starting:
              {format(
                new Date(event.start_datetime),
                'do MMMM yyyy, hh:mm aaaa'
              )}
            </div>
            <div>Status: {event.state}</div>
          </Card>
        ))}
      </div>
    );
  }

  return <>An error has occurred</>;
};

export default Events;
