export interface TicketTier {
  id: string;
  name: string;
  price: number;
  quantity: number;
  benefits: string[];
}

export interface EventFormData {
  // Step 1: Basic Info
  name: string;
  category: string;
  description: string;
  tags: string[];

  // Step 2: Date & Location
  startDate: Date | undefined;
  startTime: string;
  duration: number;
  location: string;
  venueName: string;
  venueCapacity: number;

  // Step 3: Pricing & Tickets
  currency: 'USD' | 'ETH' | 'MATIC';
  basePrice: number;
  ticketTiers: TicketTier[];

  // Step 4: NFT
  nftImage: File | null;
  bannerImage: File | null;
  collectionName: string;
  tokenSymbol: string;
  royaltyPercentage: number;
  deployContract: 'new' | 'existing';
  contractAddress?: string;
  network: string;

  // Step 5: Settings
  earlyBirdDiscount: boolean;
  maxPerWallet: number;
  whitelistEnabled: boolean;
  resalePermissions: boolean;
}

export const initialEventData: EventFormData = {
  name: '',
  category: '',
  description: '',
  tags: [],
  startDate: undefined,
  startTime: '19:00',
  duration: 2,
  location: '',
  venueName: '',
  venueCapacity: 100,
  currency: 'USD',
  basePrice: 0,
  ticketTiers: [],
  nftImage: null,
  bannerImage: null,
  collectionName: '',
  tokenSymbol: '',
  royaltyPercentage: 5,
  deployContract: 'new',
  network: 'Ethereum',
  earlyBirdDiscount: false,
  maxPerWallet: 5,
  whitelistEnabled: false,
  resalePermissions: true,
};
