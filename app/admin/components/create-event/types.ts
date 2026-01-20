export interface TicketTier {
  id: string;
  name: string;
  price: number;
  quantity: number;
  benefits: string[];
}

export interface NFTAttribute {
  id: string;
  traitType: string;
  value: string;
}

export interface EventFormData {
  // Step 1: Basic Info
  name: string;
  category: string;
  description: string;
  tags: string[];

  // Step 2: Date & Location
  startDate: Date | undefined;
  endDate: Date | undefined;
  startTime: string;
  endTime: string;
  duration: number;
  location: string;
  venueName: string;
  venueCapacity: number;
  isVirtual: boolean;
  virtualLink: string;

  // Step 3: Pricing & Tickets
  currency: 'USD' | 'ETH' | 'MATIC';
  basePrice: number;
  totalTickets: number;
  ticketTiers: TicketTier[];

  // Step 4: NFT
  nftImagePreview: string | null;
  bannerImagePreview: string | null;
  collectionName: string;
  tokenSymbol: string;
  royaltyPercentage: number;
  deployContract: 'new' | 'existing';
  contractAddress: string;
  network: string;
  nftAttributes: NFTAttribute[];

  // Step 5: Settings
  earlyBirdDiscount: boolean;
  earlyBirdEndDate: Date | undefined;
  earlyBirdPercentage: number;
  maxPerWallet: number;
  whitelistEnabled: boolean;
  whitelistAddresses: string[];
  resalePermissions: boolean;
  transferRestrictions: boolean;
  requireKYC: boolean;
}

export const initialEventData: EventFormData = {
  name: '',
  category: '',
  description: '',
  tags: [],
  startDate: undefined,
  endDate: undefined,
  startTime: '19:00',
  endTime: '23:00',
  duration: 4,
  location: '',
  venueName: '',
  venueCapacity: 1000,
  isVirtual: false,
  virtualLink: '',
  currency: 'USD',
  basePrice: 50,
  totalTickets: 500,
  ticketTiers: [],
  nftImagePreview: null,
  bannerImagePreview: null,
  collectionName: '',
  tokenSymbol: '',
  royaltyPercentage: 5,
  deployContract: 'new',
  contractAddress: '',
  network: 'Polygon',
  nftAttributes: [],
  earlyBirdDiscount: false,
  earlyBirdEndDate: undefined,
  earlyBirdPercentage: 20,
  maxPerWallet: 5,
  whitelistEnabled: false,
  whitelistAddresses: [],
  resalePermissions: true,
  transferRestrictions: false,
  requireKYC: false,
};

// Mock data for demonstration
export const mockEventData: EventFormData = {
  name: 'Crypto Music Festival 2026',
  category: 'music',
  description: 'Join us for the biggest blockchain-powered music festival of the year! Experience live performances from top DJs while earning exclusive NFT rewards. This groundbreaking event combines the best of EDM with Web3 technology.',
  tags: ['music', 'crypto', 'nft', 'festival', 'web3'],
  startDate: new Date('2026-03-15'),
  endDate: new Date('2026-03-17'),
  startTime: '14:00',
  endTime: '02:00',
  duration: 12,
  location: '123 Blockchain Boulevard, Miami, FL 33101',
  venueName: 'Miami Crypto Arena',
  venueCapacity: 5000,
  isVirtual: false,
  virtualLink: '',
  currency: 'USD',
  basePrice: 150,
  totalTickets: 5000,
  ticketTiers: [
    { id: 'tier-1', name: 'General Admission', price: 150, quantity: 3000, benefits: ['Event Access'] },
    { id: 'tier-2', name: 'VIP Pass', price: 350, quantity: 1500, benefits: ['VIP Access', 'Free Drink', 'Priority Entry'] },
    { id: 'tier-3', name: 'VVIP Experience', price: 750, quantity: 500, benefits: ['VIP Access', 'Free Drink', 'Meet & Greet', 'Backstage Access', 'NFT Airdrop'] },
  ],
  nftImagePreview: null,
  bannerImagePreview: null,
  collectionName: 'Crypto Music Fest 2026',
  tokenSymbol: 'CMF26',
  royaltyPercentage: 7.5,
  deployContract: 'new',
  contractAddress: '',
  network: 'Polygon',
  nftAttributes: [
    { id: 'attr-1', traitType: 'Event Year', value: '2026' },
    { id: 'attr-2', traitType: 'Location', value: 'Miami' },
    { id: 'attr-3', traitType: 'Event Type', value: 'Music Festival' },
  ],
  earlyBirdDiscount: true,
  earlyBirdEndDate: new Date('2026-02-15'),
  earlyBirdPercentage: 25,
  maxPerWallet: 4,
  whitelistEnabled: false,
  whitelistAddresses: [],
  resalePermissions: true,
  transferRestrictions: false,
  requireKYC: false,
};

// Categories
export const EVENT_CATEGORIES = [
  { value: 'music', label: 'Music', icon: '🎵' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'tech', label: 'Tech', icon: '💻' },
  { value: 'art', label: 'Art', icon: '🎨' },
  { value: 'festival', label: 'Festival', icon: '🎪' },
  { value: 'conference', label: 'Conference', icon: '🎤' },
  { value: 'gaming', label: 'Gaming', icon: '🎮' },
  { value: 'networking', label: 'Networking', icon: '🤝' },
];

// Available benefits
export const AVAILABLE_BENEFITS = [
  'Event Access',
  'VIP Access',
  'Priority Entry',
  'Free Drink',
  'Free Merchandise',
  'Meet & Greet',
  'Backstage Access',
  'NFT Airdrop',
  'Exclusive Discord',
  'Early Access Next Event',
];

// Networks
export const BLOCKCHAIN_NETWORKS = [
  { value: 'Ethereum', label: 'Ethereum Mainnet', icon: '🔷', gasEstimate: 'High' },
  { value: 'Polygon', label: 'Polygon (Matic)', icon: '🟣', gasEstimate: 'Low' },
  { value: 'Optimism', label: 'Optimism', icon: '🔴', gasEstimate: 'Low' },
  { value: 'Arbitrum', label: 'Arbitrum', icon: '🔵', gasEstimate: 'Low' },
  { value: 'Base', label: 'Base', icon: '🔵', gasEstimate: 'Low' },
];
