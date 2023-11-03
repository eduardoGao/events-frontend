import { Heading } from "@chakra-ui/react";
import { useGetEventsQuery } from "../api";
import { EventCard } from "../components/event-card";

export const Events = () => {
  const { data, isSuccess } = useGetEventsQuery(undefined);

  return (
    <div>
      <Heading as="h3">All Events</Heading>
      {isSuccess &&
        data.events.length > 0 &&
        data.events.map((event) => (
          <EventCard key={event.id} {...event} isPublicVersion={false} />
        ))}
    </div>
  );
};
