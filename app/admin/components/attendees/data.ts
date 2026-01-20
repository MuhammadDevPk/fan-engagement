import { Attendee, Ticket, Transaction, ActivityLog } from './types';

// Realistic mock wallet addresses
const wallets = [
  '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  '0x3B2d8A1B37aA3F3cC6234FC80d8BEc2A1d5847C1',
  '0x8a90CAb2b38dba80C64b7734e58Ee1dB38B8992e',
  '0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73',
  '0x95cED938F7991cd0dFc1C2B04C38F71A48d69c76',
  '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
  '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69',
  '0x1efF47bC3a10a45D4B230B5d10e37751FE6AA718',
  '0xe1AB8145F7E55DC933d51a18c793F901A3A0b276',
  '0xd03ea8624C8C5987235048901fB614fDcA89b117',
  '0x95cED938F7991cd0dFcE2B04C38f71107d99d767',
  '0xaB7C8803962c0f2F5BBBe3FA8bf41cd82AA1923C',
];

// Realistic mock transaction hashes
const txHashes = [
  '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  '0xdeadbeef1234567890abcdef1234567890abcdef1234567890abcdef12345678',
  '0xcafebabe1234567890abcdef1234567890abcdef1234567890abcdef12345678',
];

export const attendeesData: Attendee[] = [
  {
    id: 'att-1',
    walletAddress: wallets[0],
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
    lastActivity: '2 hours ago',
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
        contractAddress: '0x1234...abcd'
      },
      {
        id: 'TKT-00235',
        eventName: 'Web3 Summit 2026',
        eventThumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
        type: 'VIP',
        purchaseDate: '2026-01-18T10:00:00',
        price: '$300.00',
        priceEth: '0.12',
        quantity: 1,
        tokenId: '8821',
        network: 'Polygon',
        contractAddress: '0x5678...efgh'
      }
    ],
    transactions: [
      {
        hash: txHashes[0],
        date: '2026-01-20',
        amount: '0.02 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      },
      {
        hash: txHashes[1],
        date: '2026-01-18',
        amount: '0.12 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Checked in at Jazz Night Under Stars', timestamp: '2026-01-25 19:45', type: 'CHECK_IN' },
      { id: '2', action: 'Opened event reminder email', timestamp: '2026-01-24 09:15', type: 'EMAIL' },
      { id: '3', action: 'Purchased VIP ticket for Jazz Night', timestamp: '2026-01-20 14:30', type: 'PURCHASE' },
      { id: '4', action: 'Purchased VIP ticket for Web3 Summit', timestamp: '2026-01-18 10:00', type: 'PURCHASE' },
      { id: '5', action: 'NFT minted on Ethereum', timestamp: '2026-01-18 10:01', type: 'BLOCKCHAIN' }
    ]
  },
  {
    id: 'att-2',
    walletAddress: wallets[1],
    name: 'CryptoWhale.eth',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Whale',
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
        contractAddress: '0xdef1...4567'
      }
    ],
    transactions: [
      {
        hash: txHashes[2],
        date: '2026-02-08',
        amount: '0.096 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Purchased 2x General tickets for Web3 Summit', timestamp: '2026-02-08 09:15', type: 'PURCHASE' },
      { id: '2', action: 'Wallet connected via WalletConnect', timestamp: '2026-02-08 09:10', type: 'SYSTEM' }
    ]
  },
  {
    id: 'att-3',
    walletAddress: wallets[2],
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
        contractAddress: '0x789a...bcde'
      }
    ],
    transactions: [
      {
        hash: txHashes[3],
        date: '2025-12-12',
        amount: '0.018 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Marked as No Show for NFT Art Gallery', timestamp: '2026-01-15 22:00', type: 'CHECK_IN' },
      { id: '2', action: 'Purchased Early Bird ticket', timestamp: '2025-12-12 10:00', type: 'PURCHASE' }
    ]
  },
  {
    id: 'att-4',
    walletAddress: wallets[3],
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
    tickets: [
      {
        id: 'TKT-01200',
        eventName: 'Blockchain Gaming Tournament',
        eventThumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop',
        type: 'GENERAL',
        purchaseDate: '2026-01-28T16:00:00',
        price: '$75.00',
        priceEth: '0.03',
        quantity: 1,
        tokenId: '5544',
        network: 'BSC',
        contractAddress: '0xaaaa...bbbb'
      }
    ],
    transactions: [
      {
        hash: '0xblock1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        date: '2026-01-28',
        amount: '0.03 BNB',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Account blocked by admin', timestamp: '2026-01-29 11:00', type: 'SYSTEM', details: 'Suspicious activity detected' },
      { id: '2', action: 'Purchased ticket for Gaming Tournament', timestamp: '2026-01-28 16:00', type: 'PURCHASE' }
    ]
  },
  {
    id: 'att-5',
    walletAddress: wallets[4],
    email: 'alice.active@web3.com',
    name: 'Alice Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    joinDate: '2026-01-01',
    isBlocked: false,
    isVip: true,
    checkInStatus: 'PARTIAL',
    totalSpent: '$1,250.00',
    totalTickets: 8,
    engagementScore: 'HIGH',
    lastActivity: 'Active now',
    emailOpened: true,
    marketingOptIn: true,
    tickets: [
      {
        id: 'TKT-01500',
        eventName: 'Electronic Music Festival',
        eventThumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop',
        type: 'VIP',
        purchaseDate: '2026-01-15T20:00:00',
        price: '$350.00',
        priceEth: '0.14',
        quantity: 2,
        tokenId: '7788',
        network: 'Ethereum',
        contractAddress: '0xcccc...dddd'
      },
      {
        id: 'TKT-01501',
        eventName: 'Crypto Art Exhibition',
        eventThumbnail: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop',
        type: 'VIP',
        purchaseDate: '2026-01-10T14:00:00',
        price: '$200.00',
        priceEth: '0.08',
        quantity: 1,
        tokenId: '3344',
        network: 'Polygon',
        contractAddress: '0xeeee...ffff'
      }
    ],
    transactions: [
      {
        hash: '0xalice1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        date: '2026-01-15',
        amount: '0.14 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      },
      {
        hash: '0xalice2234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        date: '2026-01-10',
        amount: '0.08 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Partial check-in (1 of 2 companions)', timestamp: '2026-01-25 18:30', type: 'CHECK_IN' },
      { id: '2', action: 'Viewed NFT ticket details', timestamp: '2026-01-20 15:00', type: 'SYSTEM' },
      { id: '3', action: 'Purchased VIP Festival tickets', timestamp: '2026-01-15 20:00', type: 'PURCHASE' },
      { id: '4', action: 'Purchased VIP Art Exhibition ticket', timestamp: '2026-01-10 14:00', type: 'PURCHASE' }
    ]
  },
  {
    id: 'att-6',
    walletAddress: wallets[5],
    email: 'bob.builder@dao.xyz',
    name: 'Bob Builder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    joinDate: '2025-09-20',
    isBlocked: false,
    isVip: false,
    checkInStatus: 'CHECKED_IN',
    checkInTime: '2026-01-26T14:00:00',
    totalSpent: '$180.00',
    totalTickets: 3,
    engagementScore: 'MEDIUM',
    lastActivity: '3 hours ago',
    emailOpened: true,
    marketingOptIn: false,
    tickets: [
      {
        id: 'TKT-01800',
        eventName: 'DAO Governance Summit',
        eventThumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop',
        type: 'GENERAL',
        purchaseDate: '2026-01-22T11:00:00',
        price: '$180.00',
        priceEth: '0.072',
        quantity: 1,
        tokenId: '2233',
        network: 'Ethereum',
        contractAddress: '0x1111...2222'
      }
    ],
    transactions: [
      {
        hash: '0xbob12345678901234567890123456789012345678901234567890123456789012',
        date: '2026-01-22',
        amount: '0.072 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Checked in at DAO Governance Summit', timestamp: '2026-01-26 14:00', type: 'CHECK_IN' },
      { id: '2', action: 'Purchased General ticket', timestamp: '2026-01-22 11:00', type: 'PURCHASE' }
    ]
  },
  {
    id: 'att-7',
    walletAddress: wallets[6],
    email: 'emma.eth@proton.me',
    name: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    joinDate: '2026-01-05',
    isBlocked: false,
    isVip: true,
    checkInStatus: 'PENDING',
    totalSpent: '$500.00',
    totalTickets: 2,
    engagementScore: 'HIGH',
    lastActivity: '30 min ago',
    emailOpened: true,
    marketingOptIn: true,
    tickets: [
      {
        id: 'TKT-02100',
        eventName: 'DeFi Conference 2026',
        eventThumbnail: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&auto=format&fit=crop',
        type: 'VIP',
        purchaseDate: '2026-01-25T08:00:00',
        price: '$500.00',
        priceEth: '0.2',
        quantity: 1,
        tokenId: '9988',
        network: 'Ethereum',
        contractAddress: '0x3333...4444'
      }
    ],
    transactions: [
      {
        hash: '0xemma1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        date: '2026-01-25',
        amount: '0.2 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Downloaded event calendar', timestamp: '2026-01-26 10:00', type: 'SYSTEM' },
      { id: '2', action: 'Purchased VIP ticket for DeFi Conference', timestamp: '2026-01-25 08:00', type: 'PURCHASE' },
      { id: '3', action: 'Account created', timestamp: '2026-01-05 12:00', type: 'SYSTEM' }
    ]
  },
  {
    id: 'att-8',
    walletAddress: wallets[7],
    name: 'NFTCollector.eth',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Collector',
    joinDate: '2025-08-15',
    isBlocked: false,
    isVip: false,
    checkInStatus: 'CHECKED_IN',
    checkInTime: '2026-01-24T20:30:00',
    totalSpent: '$95.00',
    totalTickets: 1,
    engagementScore: 'LOW',
    lastActivity: '2 days ago',
    emailOpened: false,
    marketingOptIn: false,
    tickets: [
      {
        id: 'TKT-02400',
        eventName: 'NFT Art Gallery',
        eventThumbnail: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop',
        type: 'GENERAL',
        purchaseDate: '2025-12-20T15:30:00',
        price: '$95.00',
        priceEth: '0.038',
        quantity: 1,
        tokenId: '555',
        network: 'Polygon',
        contractAddress: '0x5555...6666'
      }
    ],
    transactions: [
      {
        hash: '0xnft12345678901234567890123456789012345678901234567890123456789012',
        date: '2025-12-20',
        amount: '0.038 MATIC',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Checked in at NFT Art Gallery', timestamp: '2026-01-24 20:30', type: 'CHECK_IN' },
      { id: '2', action: 'Purchased ticket', timestamp: '2025-12-20 15:30', type: 'PURCHASE' }
    ]
  },
  {
    id: 'att-9',
    walletAddress: wallets[8],
    email: 'david.dev@github.io',
    name: 'David Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    joinDate: '2026-01-10',
    isBlocked: false,
    isVip: false,
    checkInStatus: 'PENDING',
    totalSpent: '$120.00',
    totalTickets: 1,
    engagementScore: 'MEDIUM',
    lastActivity: '1 hour ago',
    emailOpened: true,
    marketingOptIn: true,
    tickets: [
      {
        id: 'TKT-02700',
        eventName: 'Web3 Summit 2026',
        eventThumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
        type: 'EARLY_BIRD',
        purchaseDate: '2026-01-12T09:00:00',
        price: '$120.00',
        priceEth: '0.048',
        quantity: 1,
        tokenId: '1122',
        network: 'Polygon',
        contractAddress: '0x7777...8888'
      }
    ],
    transactions: [
      {
        hash: '0xdavid234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        date: '2026-01-12',
        amount: '0.048 MATIC',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Opened event reminder email', timestamp: '2026-01-26 08:00', type: 'EMAIL' },
      { id: '2', action: 'Purchased Early Bird ticket', timestamp: '2026-01-12 09:00', type: 'PURCHASE' }
    ]
  },
  {
    id: 'att-10',
    walletAddress: wallets[9],
    email: 'lisa.crypto@defi.com',
    name: 'Lisa Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    joinDate: '2025-11-01',
    isBlocked: false,
    isVip: true,
    checkInStatus: 'CHECKED_IN',
    checkInTime: '2026-01-26T10:15:00',
    totalSpent: '$750.00',
    totalTickets: 5,
    engagementScore: 'HIGH',
    lastActivity: '15 min ago',
    emailOpened: true,
    marketingOptIn: true,
    tickets: [
      {
        id: 'TKT-03000',
        eventName: 'DeFi Conference 2026',
        eventThumbnail: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&auto=format&fit=crop',
        type: 'VIP',
        purchaseDate: '2026-01-20T12:00:00',
        price: '$500.00',
        priceEth: '0.2',
        quantity: 1,
        tokenId: '6677',
        network: 'Ethereum',
        contractAddress: '0x9999...aaaa'
      },
      {
        id: 'TKT-03001',
        eventName: 'Jazz Night Under Stars',
        eventThumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop',
        type: 'VIP',
        purchaseDate: '2026-01-18T16:00:00',
        price: '$250.00',
        priceEth: '0.1',
        quantity: 2,
        tokenId: '4455',
        network: 'Ethereum',
        contractAddress: '0xbbbb...cccc'
      }
    ],
    transactions: [
      {
        hash: '0xlisa1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        date: '2026-01-20',
        amount: '0.2 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      },
      {
        hash: '0xlisa2234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        date: '2026-01-18',
        amount: '0.1 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Checked in at DeFi Conference', timestamp: '2026-01-26 10:15', type: 'CHECK_IN' },
      { id: '2', action: 'Viewed NFT ticket in wallet', timestamp: '2026-01-25 20:00', type: 'SYSTEM' },
      { id: '3', action: 'Purchased VIP DeFi Conference ticket', timestamp: '2026-01-20 12:00', type: 'PURCHASE' },
      { id: '4', action: 'Purchased VIP Jazz Night tickets', timestamp: '2026-01-18 16:00', type: 'PURCHASE' }
    ]
  },
  {
    id: 'att-11',
    walletAddress: wallets[10],
    email: 'james.hodl@btc.org',
    name: 'James Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    joinDate: '2025-12-25',
    isBlocked: false,
    isVip: false,
    checkInStatus: 'PENDING',
    totalSpent: '$85.00',
    totalTickets: 1,
    engagementScore: 'LOW',
    lastActivity: '4 hours ago',
    emailOpened: false,
    marketingOptIn: true,
    tickets: [
      {
        id: 'TKT-03300',
        eventName: 'Crypto Trading Masterclass',
        eventThumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
        type: 'GENERAL',
        purchaseDate: '2026-01-23T14:00:00',
        price: '$85.00',
        priceEth: '0.034',
        quantity: 1,
        tokenId: '8899',
        network: 'BSC',
        contractAddress: '0xdddd...eeee'
      }
    ],
    transactions: [
      {
        hash: '0xjames234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        date: '2026-01-23',
        amount: '0.034 BNB',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Purchased General ticket', timestamp: '2026-01-23 14:00', type: 'PURCHASE' }
    ]
  },
  {
    id: 'att-12',
    walletAddress: wallets[11],
    email: 'zoe.nft@art.io',
    name: 'Zoe Anderson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
    joinDate: '2026-01-02',
    isBlocked: false,
    isVip: true,
    checkInStatus: 'PENDING',
    totalSpent: '$420.00',
    totalTickets: 3,
    engagementScore: 'HIGH',
    lastActivity: '45 min ago',
    emailOpened: true,
    marketingOptIn: true,
    tickets: [
      {
        id: 'TKT-03600',
        eventName: 'Crypto Art Exhibition',
        eventThumbnail: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop',
        type: 'VIP',
        purchaseDate: '2026-01-24T11:00:00',
        price: '$220.00',
        priceEth: '0.088',
        quantity: 1,
        tokenId: '1234',
        network: 'Ethereum',
        contractAddress: '0xffff...0000'
      },
      {
        id: 'TKT-03601',
        eventName: 'NFT Art Gallery',
        eventThumbnail: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop',
        type: 'VIP',
        purchaseDate: '2026-01-20T15:00:00',
        price: '$200.00',
        priceEth: '0.08',
        quantity: 1,
        tokenId: '5678',
        network: 'Polygon',
        contractAddress: '0x0000...1111'
      }
    ],
    transactions: [
      {
        hash: '0xzoe12345678901234567890123456789012345678901234567890123456789012',
        date: '2026-01-24',
        amount: '0.088 ETH',
        type: 'PURCHASE',
        status: 'COMPLETED'
      },
      {
        hash: '0xzoe22345678901234567890123456789012345678901234567890123456789012',
        date: '2026-01-20',
        amount: '0.08 MATIC',
        type: 'PURCHASE',
        status: 'COMPLETED'
      }
    ],
    activityLog: [
      { id: '1', action: 'Clicked event reminder link', timestamp: '2026-01-26 11:30', type: 'EMAIL' },
      { id: '2', action: 'Purchased VIP Crypto Art Exhibition ticket', timestamp: '2026-01-24 11:00', type: 'PURCHASE' },
      { id: '3', action: 'Purchased VIP NFT Art Gallery ticket', timestamp: '2026-01-20 15:00', type: 'PURCHASE' },
      { id: '4', action: 'Account created via MetaMask', timestamp: '2026-01-02 10:00', type: 'SYSTEM' }
    ]
  }
];
