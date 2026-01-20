import { Attendee } from './types';

export const attendeesData: Attendee[] = [
  {
    id: 'att-1',
    walletAddress: '0x7a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p',
    email: 'john.doe@example.com',
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    joinDate: '2025-11-15',
    isBlocked: false,
    isVip: true,
    checkInStatus: 'CHECKED_IN',
    checkInTime: '2026-01-25T19:45:00',
    totalSpent: '$350.00',
    totalTickets: 7,
    engagementScore: 'HIGH',
    lastActivity: '2 days ago',
    emailOpened: true,
    marketingOptIn: true,
    tickets: [
      {
        id: 'TKT-00234',
        eventName: 'Jazz Night Under Stars',
        eventThumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop',
        type: 'VIP',
        purchaseDate: '2026-01-20T14:30:00',
        price: '$50.00',
        priceEth: '0.02',
        quantity: 1,
        tokenId: '4582',
        network: 'Ethereum',
        contractAddress: '0x123...abc'
      }
    ],
    transactions: [
      {
        hash: '0xabc...def',
        date: '2026-01-20',
        amount: '0.02 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
        { id: '1', action: 'Ticket Purchased', timestamp: '2026-01-20 14:30', type: 'PURCHASE' },
        { id: '2', action: 'Email Opened', timestamp: '2026-01-21 09:15', type: 'EMAIL' }
    ]
  },
  {
    id: 'att-2',
    walletAddress: '0x9f3e1a7b2c8d3e4f5g6h7i8j9k0l1m2n',
    name: 'Anonymous',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Anon',
    joinDate: '2026-02-01',
    isBlocked: false,
    isVip: false,
    checkInStatus: 'PENDING',
    totalSpent: '$240.00',
    totalTickets: 2,
    engagementScore: 'MEDIUM',
    lastActivity: '5 hours ago',
    emailOpened: false,
    marketingOptIn: false,
    tickets: [
      {
        id: 'TKT-00567',
        eventName: 'Web3 Summit 2026',
        eventThumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
        type: 'GENERAL',
        purchaseDate: '2026-02-08T09:15:00',
        price: '$240.00',
        priceEth: '0.096',
        quantity: 2,
        tokenId: '9921',
        network: 'Polygon',
        contractAddress: '0xdef...456'
      }
    ],
    transactions: [],
    activityLog: []
  },
  {
    id: 'att-3',
    walletAddress: '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r',
    email: 'sarah.smith@crypto.com',
    name: 'Sarah Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    joinDate: '2025-12-10',
    isBlocked: false,
    isVip: false,
    checkInStatus: 'NO_SHOW',
    totalSpent: '$45.00',
    totalTickets: 1,
    engagementScore: 'LOW',
    lastActivity: '1 month ago',
    emailOpened: false,
    marketingOptIn: true,
    tickets: [
        {
            id: 'TKT-00890',
            eventName: 'NFT Art Gallery',
            eventThumbnail: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop',
            type: 'EARLY_BIRD',
            purchaseDate: '2025-12-12T10:00:00',
            price: '$45.00',
            priceEth: '0.018',
            quantity: 1,
            tokenId: '101',
            network: 'Ethereum',
            contractAddress: '0x789...xyz'
        }
    ],
    transactions: [],
    activityLog: []
  },
  {
    id: 'att-4',
    walletAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p',
    email: 'mike.miner@eth.eth',
    name: 'Mike Miner',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    joinDate: '2025-10-05',
    isBlocked: true,
    isVip: false,
    checkInStatus: 'PENDING',
    totalSpent: '$600.00',
    totalTickets: 12,
    engagementScore: 'HIGH',
    lastActivity: '1 day ago',
    emailOpened: true,
    marketingOptIn: true,
     tickets: [],
    transactions: [],
    activityLog: []
  },
   {
    id: 'att-5',
    walletAddress: '0xb2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q',
    email: 'alice.active@web3.com',
    name: 'Alice Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    joinDate: '2026-01-01',
    isBlocked: false,
    isVip: true,
    checkInStatus: 'PARTIAL',
    totalSpent: '$120.00',
    totalTickets: 3,
    engagementScore: 'MEDIUM',
    lastActivity: 'Active now',
    emailOpened: true,
    marketingOptIn: true,
     tickets: [],
    transactions: [],
    activityLog: []
  }
];
