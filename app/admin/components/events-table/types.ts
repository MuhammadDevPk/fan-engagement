export type EventStatus = 'Live' | 'Upcoming' | 'Ended' | 'Draft' | 'Sold Out';

export interface Event {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  categoryColor: 'purple' | 'blue' | 'red' | 'orange' | 'green' | 'gray';
  date: string;
  time: string;
  location: string;
  priceUsd: number;
  priceEth: number;
  ticketsSold: number;
  ticketsTotal: number;
  revenue: number;
  status: EventStatus;
}

export type SortField = 'name' | 'date' | 'price' | 'sold' | 'revenue';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}
