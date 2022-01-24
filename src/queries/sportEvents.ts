type SportEventsResponse = {
  popular_event_ids: Array<string>;
};

const fetchSportEvents = async (sportName: string) => {
  const response = await fetch(
    `/.netlify/functions/bypass-cors?url=https://api.smarkets.com/v3/popular/event_ids/sport/${sportName}/`
  );
  const jsonResponse = (await response.json()) as SportEventsResponse;
  return jsonResponse;
};

export default fetchSportEvents;
