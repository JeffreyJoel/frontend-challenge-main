# NextJS Frontend Challenge - Ongrid Protocol

This repository contains a frontend challenge based on a typical NextJS project at Ongrid Protocol.

## Project Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and configured with:

1. ESLint and Prettier
2. Git hooks set up with [Husky](https://typicode.github.io/husky/)
3. NextJS and React specific folders
4. TypeScript
5. Tailwind CSS

## Challenge Description

You'll be building user profile cards that fetch and display user information, demonstrating your ability to work with React, TypeScript, and modern data fetching practices.

### Tech Stack

- Next.js
- TypeScript
- React Query (preferred) / any data fetching library
- shadcn/ui (preferred) / any UI component library
- Tailwind CSS

## Project Structure

The app has the following structure:

```
src/
├── components/   # React components used across the app
├── pages/        # NextJS specific pages (page-specific logic only)
├── layouts/      # Presentation elements for pages
├── utils/        # Helper functions
│   ├── client/   # Client-side utils
│   ├── server/   # Server-side only
│   └── common/   # Shared types and utils
└── hooks/        # Custom React hooks
```

## API Specification

A NextJS API route is available to fetch user details:

- Endpoint: `api/user?person={Person.PersonA}`
- Available users:
  - Person A (responds in 1 second)
  - Person B (responds in 3 seconds)
  - Person C (always fails - use for error handling)

Response type:
```typescript
type User = {
  backgroundImageUrl: string;
  profilePictureUrl: string;
  name: string;
  title: string;
  followers: number;
  following: number;
};
```

## Requirements

### Base Requirements

1. **User Card Component**
   - Create a reusable card component that displays:
     - Profile picture
     - Background image
     - Name
     - Title
     - Follower/Following counts
   - Implement proper loading and error states
   - Use shadcn/ui Card component or equivalent

2. **Data Fetching**
   - Implement data fetching using React Query
   - Create a custom `useUserProfile` hook
   - Handle loading and error states efficiently

3. **User Selection**
   - Allow switching between users (A, B, C) using buttons
   - Highlight currently selected user
   - Handle loading states during user switches

4. **Error Handling**
   - Display error state for Person C
   - Add retry functionality
   - Show appropriate error messages

5. **Web3 Integration**
   - Implement wallet connection using wagmi/ethers.js
   - Display connected wallet address
   - Handle connection states (connecting/connected/disconnected)
   - Support network switching
   - Implement disconnect functionality


### Nice to Have Features

1. **Enhanced User Experience**
   - Add loading skeletons
   - Implement smooth transitions
   - Add hover states on cards

2. **Data Management**
   - Cache previously fetched user data
   - Implement prefetching
   - Handle concurrent requests

3. **Smart Contract Integration**
   - Implement ERC20 token interactions using OpenZeppelin contract
   - Read functions:
     - Get token balance
     - Get total supply
   - Write functions:
     - Transfer tokens
     - Approve spending
   - Handle transaction states
   - Display transaction history

## Getting Started

### Prerequisites

1. Node.js installed
2. npm or yarn
3. Git

### Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup (Optional)

If you're only doing the frontend tasks, you don't need these steps. However, if you want to work with the backend:

1. Copy `.env.example` into `.env` (Note: Prisma requires `.env` specifically)
2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. Run services: `docker compose up`
4. Apply migrations: `prisma migrate dev`

## Resources

### Core Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [shadcn/ui Components](https://ui.shadcn.com)

### Web3 Resources
- [wagmi Documentation](https://wagmi.sh)
- [ethers.js Documentation](https://docs.ethers.org/v6/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)
- [OpenZeppelin ERC20](https://docs.openzeppelin.com/contracts/5.x/erc20)

## Evaluation Criteria

- **Code Quality**
  - TypeScript usage
  - Component structure
  - Custom hooks implementation
  - Error handling

- **Functionality**
  - User card display
  - Data fetching implementation
  - Loading/error states
  - User switching

- **Technical Implementation**
  - React Query usage
  - Component reusability
  - State management
  - Type safety

## Submission Guidelines

1. Create a new branch for your implementation
2. Submit a pull request with:
   - Implementation overview
   - Technical decisions explanation
   - Known limitations
   - Setup instructions

## Note to Candidates

- Focus on functionality over styling
- Use the provided UI library components
- Prioritize proper data fetching and error handling
- Document any assumptions made

## Bonus Challenges

- Add unit tests for custom hooks
- Implement SSR with React Query
- Add keyboard navigation between users
- Implement advanced error recovery strategies