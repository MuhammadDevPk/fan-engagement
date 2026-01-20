export type CheckInStatus = 'CHECKED_IN' | 'PENDING' | 'NO_SHOW' | 'PARTIAL';
export type TicketType = 'VIP' | 'GENERAL' | 'EARLY_BIRD';
export type EngagementScore = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Ticket {
  id: string;
  eventName: string;
  eventThumbnail: string; // URL
  type: TicketType;
  purchaseDate: string;
  price: string;
  priceEth: string;
  quantity: number;
  tokenId: string; // NFT Token ID
  network: string;
  contractAddress: string;
}

export interface Transaction {
  hash: string;
  date: string;
  amount: string;
  type: 'PURCHASE' | 'REFUND' | 'TRANSFER';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  details?: string;
  type: 'PURCHASE' | 'EMAIL' | 'CHECK_IN' | 'SYSTEM' | 'BLOCKCHAIN';
}

export interface Attendee {
  id: string;
  walletAddress: string;
  email?: string;
  name?: string;
  avatar: string; // Generated avatar URL or hash
  joinDate: string;
  
  // Statuses
  isBlocked: boolean;
  isVip: boolean;
  checkInStatus: CheckInStatus;
  checkInTime?: string;
  
  // Metrics
  totalSpent: string;
  totalTickets: number;
  engagementScore: EngagementScore;
  lastActivity: string;
  
  // Relations
  tickets: Ticket[];
  transactions: Transaction[];
  activityLog: ActivityLog[];
  
  // Communication
  emailOpened: boolean;
  marketingOptIn: boolean;
}
