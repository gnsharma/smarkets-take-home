type EventResponse = {
  id: string;
  name: string;
  description: string;
  start_datetime: string;
  state: string;
};

type EventsResponse = {
  events: Array<EventResponse>;
};

const fetchEvents = async () => {
  const response = await fetch(
    `/.netlify/functions/bypass-cors?url=https://api.smarkets.com/v3/events/?state=new&state=upcoming&state=live&with_new_type=true&limit=20&include_hidden=false`
  );
  const jsonResponse = (await response.json()) as Promise<EventsResponse>;
  return jsonResponse;
};

export default fetchEvents;
