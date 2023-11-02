export type User = {
  token: string;
  uid: string;
  name: string;
};

export type Event = {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user_id: {
    _id: string;
    name: string;
  };
  id: string;
};

export type Events = {
  ok: boolean;
  events: Event[];
};
