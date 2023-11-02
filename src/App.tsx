import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useGetEventsQuery } from "./api";
import { useRef } from "react";
import { EventForm } from "./views/event";
import { EventCard } from "./components/event-card";
import { useEventStore } from "./hooks/use-event-store";

function App() {
  const { data, isSuccess } = useGetEventsQuery(undefined);

  const { isOpenDrawer, handleCloseDrawer, handleOpenDrawer } = useEventStore();

  return (
    <>
      <Flex height="80px" align={"center"} justifyContent={"space-between"}>
        <Center h="100%">
          <Heading as="h1" size="2xl">
            Events
          </Heading>
        </Center>

        {/* <LinkRouter to="/event">
          <Button>New Event</Button>
        </LinkRouter> */}
        <EventDrawer
          isOpen={isOpenDrawer}
          onClose={handleCloseDrawer}
          onOpen={handleOpenDrawer}
        />
      </Flex>
      {isSuccess &&
        data.events.length > 0 &&
        data.events.map((event) => <EventCard key={event.id} {...event} />)}
    </>
  );
}

export default App;

function EventDrawer({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const btnRef = useRef();

  const { isEditingEvent } = useEventStore();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Create Event
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {isEditingEvent ? "Edit Event" : "Create a new event"}
          </DrawerHeader>

          <DrawerBody>
            <EventForm />
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}
