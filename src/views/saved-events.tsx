import { useGetEventsSubscriptionsQuery } from "../api";
import { SimpleGrid } from "@chakra-ui/react";
import { EventCard } from "../components/event-card";

export const SavedEvents = () => {
  const { data, isSuccess } = useGetEventsSubscriptionsQuery(undefined);

  return isSuccess && data.events.length > 0 ? (
    <SimpleGrid minChildWidth={"320px"} spacing={8}>
      {data.events.map((event) => (
        <EventCard key={event.id} {...event} isPublicVersion={false} />
      ))}
    </SimpleGrid>
  ) : (
    "No events saved :("
  );
};
