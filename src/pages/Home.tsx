import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { format } from 'date-fns';

import fetchEvents from '../queries/events';

const Home = () => {
  const navigate = useNavigate();

  const popularEvents = useQuery('/events', fetchEvents);

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

export default Home;
