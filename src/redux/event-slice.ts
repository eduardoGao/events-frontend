import { createSlice } from "@reduxjs/toolkit";

type EventState = {
  selectedEvent: string | null;
  isOpenDrawer: boolean;
};

const initialState = {
  selectedEvent: null,
  isOpenDrawer: false,
} as EventState;

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setSelectedEvent: (state, { payload }: { payload: string }) => {
      state.selectedEvent = payload;
      // state.isOpenDrawer = true;
    },
    onOpenDrawer: (state) => {
      state.isOpenDrawer = true;
    },
    onCloseDrawer: (state) => {
      state.selectedEvent = null;
      state.isOpenDrawer = false;
    },
  },
});

export const { setSelectedEvent, onCloseDrawer, onOpenDrawer } =
  eventSlice.actions;

export default eventSlice.reducer;
