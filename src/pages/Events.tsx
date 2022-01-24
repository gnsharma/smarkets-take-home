import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import Sidebar from '../components/Sidebar';
import fetchSportEvents from '../queries/sportEvents';
import fetchEventDetails from '../queries/eventDetails';

const Events = () => {
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
      <>
        <Sidebar />
        {popularEvents.data.events.map((event) => (
          <>
            <Link to={`/events/${event.id}`}>
              <div>{event.id}</div>
            </Link>
            <div>{event.name}</div>
          </>
        ))}
      </>
    );
  }

  return <>An error has occurred</>;
};

export default Events;
