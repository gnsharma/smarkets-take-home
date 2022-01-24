import { useQuery } from 'react-query';

import Sidebar from '../components/Sidebar';
import fetchEvents from '../queries/events';

const Home = () => {
  const popularEvents = useQuery('/events', fetchEvents);

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

export default Home;
