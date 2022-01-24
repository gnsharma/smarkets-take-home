import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
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
        <Sidebar />
        {popularEvents.data.events.map((event) => (
          <div>{event.name}</div>
        ))}
      </>
    );
  }

  return <>An error has occurred</>;
};

export default EventDetails;
