export type TicketInfo = {
  id: number;
  name: string;
  major: string;
  studentId: string;
  issued: boolean;
  turn: number;
  code: string;
  eventId: number;
};

export type MyTicketInfo = {
  id: number;
  name: string;
  major: string;
  studentId: string;
  issued: boolean;
  turn: number;
  event: {
    name: string;
    startAt: string;
    endAt: string;
    totalTickets: number;
  };
};

export type FestivalEvent = {
  id: number;
  name: string;
  from: string;
  to: string;
};

export type FestivalDate =
  | 'FIRST_DAY'
  | 'SECOND_DAY'
  | 'THIRD_DAY'
  | 'FOURTH_DAY';
