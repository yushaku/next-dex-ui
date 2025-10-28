# AI DevKit Rules

## Project Context

**Yushaku DEX** - A decentralized exchange (DEX) platform built with Next.js 15 and React 19, featuring:

- Modern DeFi trading interface with orderbook functionality
- Cross-chain bridge integration via Squid Router
- NFT marketplace and studio
- Liquidity pool management
- YSK token staking system
- Multi-chain support (Ethereum, BSC, Base, Arbitrum)

This project uses ai-devkit for structured AI-assisted development. Phase documentation is located in `docs/ai/`.

## Technology Stack

**Frontend:**

- Next.js 15 with React 19
- TypeScript for type safety
- Tailwind CSS 4.x for styling
- Radix UI for component primitives

**Blockchain Integration:**

- Wagmi v2 + Viem for Ethereum interactions
- Alchemy Account Kit for smart account management
- Multi-chain support (Ethereum, BSC, Base, Arbitrum)

**State Management:**

- Zustand for global state
- React Query for server state

**Key Features:**

- Orderbook DEX trading interface
- Cross-chain bridge (Squid Router)
- NFT marketplace and studio
- YSK token staking system
- Liquidity pool management

## Documentation Structure

- `docs/ai/requirements/` - DeFi requirements, trading features, and user stories
- `docs/ai/design/` - DEX architecture, smart contract interactions, and UI/UX design (include mermaid diagrams)
- `docs/ai/planning/` - Feature roadmap, trading module development, and integration tasks
- `docs/ai/implementation/` - Web3 integration guides, component development, and blockchain interactions
- `docs/ai/testing/` - Trading functionality tests, smart contract testing, and DeFi protocol validation
- `docs/ai/deployment/` - Vercel deployment, blockchain network configuration, and production setup
- `docs/ai/monitoring/` - Trading analytics, transaction monitoring, and performance tracking

## Code Style & Standards

- Follow Next.js 15 and React 19 best practices
- Use TypeScript for type safety across all components
- Implement Tailwind CSS 4.x for consistent styling
- Follow the established component structure in `src/components/`
- Use Wagmi v2 patterns for blockchain interactions
- Implement proper error handling for Web3 operations
- Write clear, self-documenting code with meaningful variable names
- Add comments for complex DeFi logic or smart contract interactions

## Development Workflow

- Review phase documentation in `docs/ai/` before implementing features
- Follow the established project structure: `src/app/` for pages, `src/components/` for UI
- Use pnpm as the package manager (configured in project)
- Keep requirements, design, and implementation docs updated as the project evolves
- Reference the planning doc for task breakdown and priorities
- Copy the testing template (`docs/ai/testing/README.md`) before creating feature-specific testing docs

## AI Interaction Guidelines

- When implementing features, first check relevant phase documentation
- For new DeFi features, start with requirements clarification and smart contract analysis
- Update phase docs when significant changes or decisions are made
- Consider blockchain security implications for all Web3 integrations
- Validate smart contract interactions before implementation

## Testing & Quality

- Write tests alongside implementation, especially for trading and staking functionality
- Follow the testing strategy defined in `docs/ai/testing/`
- Use `/writing-test` to generate unit and integration tests targeting 100% coverage
- Test Web3 interactions with proper mocking
- Ensure code passes all tests before considering it complete
- Validate cross-chain functionality thoroughly

## Documentation

- Update phase documentation when requirements or design changes
- Keep inline code comments focused and relevant, especially for blockchain interactions
- Document architectural decisions and their rationale
- Use mermaid diagrams for DeFi protocol flows, smart contract interactions, and data architecture
- Record test coverage results and outstanding gaps in `docs/ai/testing/`
- Document wallet integration patterns and chain configurations

## Key Commands

When working on this project, you can run commands to:

- Understand project requirements and goals (`review-requirements`)
- Review architectural decisions (`review-design`)
- Plan and execute tasks (`execute-plan`)
- Verify implementation against design (`check-implementation`)
- Suggest missing tests (`suggest-tests`)
- Perform structured code reviews (`code-review`)
