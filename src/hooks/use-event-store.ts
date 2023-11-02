import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetEventsQuery } from "../api";
import { formatDateToYYYYMMDD, formatTimeToHHMM } from "../utils/dates";
import { onCloseDrawer, onOpenDrawer } from "../redux/event-slice";

export const useEventStore = () => {
  const dispatch = useAppDispatch();

  const { isOpenDrawer, selectedEvent } = useAppSelector(
    (state) => state.event
  );

  const handleCloseDrawer = () => dispatch(onCloseDrawer());
  const handleOpenDrawer = () => dispatch(onOpenDrawer());

  const isEditingEvent = Boolean(selectedEvent);

  const { data } = useGetEventsQuery(undefined);
  const onUpdateEvent = () => {
    if (isOpenDrawer && selectedEvent) {
      const findEvent = data?.events.find(
        (event) => event.id === selectedEvent
      );
      if (findEvent) {
        const { id, title, notes } = findEvent;
        const date = formatDateToYYYYMMDD(findEvent.start);
        const time = formatTimeToHHMM(findEvent.start);

        return {
          id,
          title,
          notes,
          date,
          time,
        };
      }
    }
  };

  return {
    isOpenDrawer,
    selectedEvent,
    onUpdateEvent,
    handleCloseDrawer,
    handleOpenDrawer,
    isEditingEvent,
  };
};
