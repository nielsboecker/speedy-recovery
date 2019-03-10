export function dataIsReady(user, events) {
  return (
    user && events && getNextEvent(events).patient && getNextEvent(events).start
  );
}

export function getNextEvent(events) {
  if (events.length > 0) {
    const event = events
      .filter(event => new Date(event.start) - new Date() > 0)
      .sort((a, b) => new Date(a.start) - new Date(b.start))[0];
    return event ? event : { start: [], patient: [] };
  } else {
    return "No event";
  }
}
