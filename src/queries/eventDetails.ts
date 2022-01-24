type EventDetails = {
  id: string;
  name: string;
};

type EventsDetailsResponse = {
  events: Array<EventDetails>;
};

const fetchEventDetails = async (eventIds: Array<number | string>) => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/api.smarkets.com/v3/events/${eventIds.join(
      ','
    )}/`
  );
  const jsonResponse = (await response.json()) as EventsDetailsResponse;
  return jsonResponse;
};

export default fetchEventDetails;
