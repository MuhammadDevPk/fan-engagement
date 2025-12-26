# Eureka - NFT Event Ticketing Platform

A production-ready Web3 NFT ticketing platform built with Next.js 15. Users can purchase event tickets as NFTs, manage them in a dashboard, resell on a built-in marketplace, and validate entry with dynamic QR codes—all with gasless transactions.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Solidity](https://img.shields.io/badge/Solidity-0.8.22-363636?style=flat-square&logo=solidity)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)
![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-627EEA?style=flat-square&logo=ethereum)

---

## ✨ Features

### Core Functionality
- **NFT Ticket Minting** - Purchase tickets minted as ERC-721 NFTs with metadata stored on IPFS
- **Gasless Transactions** - Relayer-based minting covers gas fees for users
- **Multi-Wallet Support** - MetaMask + Magic.link (email, phone, Google, Twitter, Discord OAuth)
- **Dynamic QR Codes** - Time-expiring QR codes for secure venue entry (5-minute rotation)
- **Built-in Marketplace** - List tickets for resale with automated profit splitting

### Smart Contracts
- **MyNFT.sol** - ERC-721 with ERC-2981 royalties (5%) and ERC-4906 metadata updates
- **Marketplace.sol** - Non-custodial resale with 40% organizer / 10% platform profit split
- **MysteryBoxV2.sol** - Chainlink VRF v2.5 integration for random prize NFTs

### User Experience
- **Responsive Dashboard** - View owned tickets, purchase history, and active listings
- **AI Intent Parser** - Natural language commands ("Buy 2 tickets for Web3 Festival")
- **Multiple Payment Methods** - Crypto, Credit Card, Alipay, WeChat Pay support
- **Dark Mode UI** - Modern glassmorphism design with Tailwind CSS

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **UI Components** | Radix UI, Lucide Icons, shadcn/ui |
| **Blockchain** | Solidity 0.8.22, Hardhat, ethers.js v6 |
| **Wallet Auth** | Magic.link SDK, MetaMask |
| **Database** | Supabase (PostgreSQL) |
| **Oracles** | Chainlink VRF v2.5 |
| **Storage** | IPFS (Pinata-compatible) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- MetaMask browser extension (for testing)
- Supabase account (free tier works)

### Environment Variables

Create a `.env.local` file with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Magic.link
NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY=your_magic_key

# Blockchain (Sepolia Testnet)
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
RELAYER_PRIVATE_KEY=your_relayer_wallet_private_key
RELAYER_ADDRESS=your_relayer_wallet_address
MYNFT_CONTRACT_ADDRESS=0x791c1B4A7aAfB6Cf1EDcC2404dd58d93080dc2E3

# Optional: OpenAI for intent parsing
OPENAI_API_KEY=your_openai_key
```

### Installation

```bash
# Clone the repository
git clone https://github.com/MuhammadDevPk/fan-engagement.git
cd fan-engagement

# Install dependencies
pnpm install

# Set up database (run in Supabase SQL editor)
# See database/schema.sql and database/seed-events.sql

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Deploy Contracts (Optional)

```bash
# Compile contracts
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Deploy marketplace
npx hardhat run scripts/deploy-marketplace.js --network sepolia

# Link marketplace to NFT contract
npx hardhat run scripts/set-marketplace-on-mynft.js --network sepolia
```

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── mint-ticket/   # Relayer-based NFT minting
│   │   ├── marketplace/   # Listing, cancel, buy endpoints
│   │   ├── events/        # Event CRUD
│   │   └── user/          # User data fetching
│   ├── dashboard/         # User ticket dashboard
│   ├── events/[id]/       # Event detail & purchase pages
│   └── page.tsx           # Home page with event grid
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── ticket-qr.tsx     # Dynamic QR code generator
│   └── connect-wallet-modal.tsx
├── context/              # React context providers
│   └── wallet-context.tsx # Multi-wallet auth logic
├── contracts/            # Solidity smart contracts
│   ├── MyNFT.sol         # ERC-721 ticket NFT
│   ├── Marketplace.sol   # Resale marketplace
│   └── MysteryBoxV2.sol  # Chainlink VRF mystery box
├── lib/                  # Utilities & services
│   ├── database.ts       # Supabase CRUD operations
│   ├── supabase.ts       # Supabase client config
│   └── magic.ts          # Magic.link initialization
├── scripts/              # Hardhat deployment scripts
└── database/             # SQL schema files
```

---

## 🔧 Key APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/events` | GET | Fetch all events from database |
| `/api/events/[id]` | GET | Fetch single event details |
| `/api/mint-ticket` | POST | Mint NFT ticket (relayer covers gas) |
| `/api/user/tickets` | POST | Get user's owned tickets |
| `/api/marketplace/list` | POST | Create resale listing |
| `/api/marketplace/listings` | GET | Get active marketplace listings |
| `/api/assistant/intent` | POST | AI-powered command parsing |

---

## 🎫 User Flow

1. **Connect Wallet** → MetaMask or Magic.link (email/social)
2. **Browse Events** → Home page with dynamic event grid
3. **Purchase Ticket** → Crypto or credit card (gasless minting)
4. **View Dashboard** → See owned tickets with QR codes
5. **Resell Tickets** → List on marketplace (2x price cap enforced)
6. **Validate Entry** → Show time-expiring QR code at venue

---

## 💰 Marketplace Economics

| Party | Share of Profit |
|-------|-----------------|
| Seller | 50% |
| Event Organizer | 40% |
| Platform | 10% |

- **Price Cap:** Resale price cannot exceed 2x the last purchase price
- **Royalties:** 5% ERC-2981 royalty on all secondary sales

---

## 🧪 Testing

```bash
# Run Hardhat contract tests
npx hardhat test

# Run linting
pnpm lint

# Build for production
pnpm build
```

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Contracts (Base Mainnet)
1. Add Base network to `hardhat.config.js`
2. Update contract addresses in `.env`
3. Run deployment scripts with `--network base`

---

## 📝 Database Schema

**Tables:**
- `users` - Wallet addresses, login methods, profiles
- `events` - Event details, pricing, ticket counts
- `tickets` - NFT ownership records, purchase prices
- `marketplace_listings` - Active resale listings
- `purchase_history` - Transaction records

See [`database/schema.sql`](./database/schema.sql) for full schema.

---

## 🔐 Security Features

- **Rate Limiting** - 30-second cooldown between purchases
- **Reentrancy Guards** - OpenZeppelin ReentrancyGuard on all contracts
- **Pausable** - Emergency pause functionality on smart contracts
- **Marketplace Restrictions** - Only authorized marketplace can transfer tickets
- **Dynamic QR Expiry** - QR codes rotate every 5 minutes

---

## 🗺 Roadmap

- [ ] Real payment processing (Stripe integration)
- [ ] Base mainnet deployment
- [ ] Per-event dynamic NFT artwork
- [ ] Mobile app (React Native)
- [ ] Loyalty points / token rewards
- [ ] Fan voting system

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📞 Support

For questions or issues, please open a GitHub issue or contact the development team.
