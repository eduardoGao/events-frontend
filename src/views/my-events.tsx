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
  IconButton,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useGetEventsByUserQuery } from "../api";
import { useRef } from "react";

import { EventCard } from "../components/event-card";
import { useEventStore } from "../hooks/use-event-store";
import { EventForm } from "../components/event-form";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { LinkRouter } from "../components/LinkRouter";

export function MyEvents() {
  const { data, isSuccess } = useGetEventsByUserQuery(undefined);

  const { isOpenDrawer, handleCloseDrawer, handleOpenDrawer } = useEventStore();

  return (
    <>
      <Flex height="80px" align={"center"} justifyContent={"space-between"}>
        <Wrap>
          <WrapItem>
            <Center h="100%">
              <LinkRouter to="/">
                <IconButton
                  aria-label="Back to all events"
                  icon={<ArrowBackIcon />}
                  bg="transparent"
                  _hover={{ bg: "gray.800" }}
                />
              </LinkRouter>
            </Center>
          </WrapItem>
          <WrapItem>
            <Center h="100%">
              <Heading as="h1" size="2xl">
                My Events
              </Heading>
            </Center>
          </WrapItem>
        </Wrap>

        <EventDrawer
          isOpen={isOpenDrawer}
          onClose={handleCloseDrawer}
          onOpen={handleOpenDrawer}
        />
      </Flex>
      {isSuccess &&
        data.events.length > 0 &&
        data.events.map((event) => (
          <EventCard key={event.id} {...event} isPublicVersion />
        ))}
    </>
  );
}

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
      <Button ref={btnRef} onClick={onOpen}>
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
          <DrawerHeader bg="gray.700">
            {isEditingEvent ? "Edit Event" : "Create a new event"}
          </DrawerHeader>

          <DrawerBody bg="gray.700">
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
