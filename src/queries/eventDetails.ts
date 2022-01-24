type EventDetails = {
  id: string;
  name: string;
  description: string;
  start_datetime: string;
  state: string;
  type: {
    domain: string;
    scope: string;
  };
  modified: string;
};

type EventsDetailsResponse = {
  events: Array<EventDetails>;
};

const fetchEventDetails = async (eventIds: Array<number | string>) => {
  const response = await fetch(
    `/.netlify/functions/bypass-cors?url=https://api.smarkets.com/v3/events/${eventIds.join(
      ','
    )}/?with_new_type=true`
  );
  const jsonResponse = (await response.json()) as EventsDetailsResponse;
  return jsonResponse;
};

export default fetchEventDetails;
