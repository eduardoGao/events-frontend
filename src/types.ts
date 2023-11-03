export type User = {
  token: string;
  uid: string;
  name: string;
};

export type Event = {
  id: string;
  title: string;
  notes: string;
  start: Date;
  user_id: {
    _id: string;
    name: string;
  };
  assistants: {
    _id: string;
    name: string;
  }[];
};

export type Events = {
  ok: boolean;
  events: Event[];
};
