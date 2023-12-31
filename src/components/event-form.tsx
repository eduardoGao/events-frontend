import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import { usePostEventMutation, useUpdateEventMutation } from "../api";
import { useEventStore } from "../hooks/use-event-store";
import { getCombineDateTime, addHours } from "../utils/dates";

type EventCreation = {
  id: string | null;
  title: string;
  notes: string;
  date: string | number | readonly string[];
  time: string | number | readonly string[] | undefined;
  start: Date | undefined;
  end: Date | undefined;
};

export const EventForm = () => {
  const [event, setEvent] = useState<EventCreation>({
    id: null,
    title: "",
    notes: "",
    date: "",
    time: undefined,
    start: undefined,
    end: undefined,
  });

  const { onUpdateEvent, isEditingEvent } = useEventStore();
  useEffect(() => {
    const eventFound = onUpdateEvent();
    if (eventFound) {
      setEvent({ ...event, ...eventFound });
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (event.date && event.time) {
      const combinedDateTime = getCombineDateTime(event.date, event.time);
      setEvent({ ...event, start: combinedDateTime });
    }
  }, [event.date, event.time]);

  useEffect(() => {
    if (event.start) {
      const end = addHours(event.start, 1);
      setEvent({
        ...event,
        end,
      });
    }

    return () => {};
  }, [event.start]);

  const [createEvent, { isLoading }] = usePostEventMutation();
  const [updateEvent, { isLoading: updateLoading }] = useUpdateEventMutation();
  const handleEvent = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!isEditingEvent) {
      createEvent(event);
    } else {
      updateEvent(event);
    }
  };

  return (
    <form onSubmit={handleEvent}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          name="title"
          id="title"
          value={event.title}
          onChange={handleInput}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Notes</FormLabel>
        <FormHelperText>Share some event details.</FormHelperText>
        <Input
          type="text"
          name="notes"
          id="notes"
          value={event.notes}
          onChange={handleInput}
        />
      </FormControl>
      <Wrap>
        <WrapItem>
          <Input
            type="date"
            name="date"
            id="date"
            value={event.date}
            onChange={handleInput}
          />
        </WrapItem>
        <WrapItem>
          <Input
            type="time"
            name="time"
            id="time"
            value={event.time}
            onChange={handleInput}
          />
        </WrapItem>
      </Wrap>

      <Button
        type="submit"
        isLoading={isLoading || updateLoading}
        loadingText="Submitting"
      >
        {!isEditingEvent ? "Create" : "Update"}
      </Button>
    </form>
  );
};
