import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useGetEventsQuery } from "../api";
import { EventCard } from "../components/event-card";

export const Events = () => {
  const { data, isSuccess } = useGetEventsQuery(undefined);

  return (
    <div>
      <Heading as="h3" mb={4}>
        Upcoming Events
      </Heading>
      {isSuccess && data.events.length > 0 && (
        <SimpleGrid minChildWidth={"320px"} spacing={8}>
          {data.events.map((event) => (
            <EventCard key={event.id} {...event} isPublicVersion={false} />
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};
