# Sarafa SDK

A TypeScript SDK for interacting with the Sarafa API, providing easy access to charge, transfer, and profile endpoints.

## Installation

```bash
npm install sarafa-sdk
```

## Usage

```typescript
import { SarafaSDK } from "sarafa-sdk";

const sdk = new SarafaSDK("your-api-key");

async function example() {
  try {
    // Charge example
    const charge = await sdk.charge({
      amount: 1000,
      currency: "USD",
      customer: {
        email: "user@example.com",
      },
    });
    console.log("Charge:", charge);

    // Transfer example
    const transfer = await sdk.transfer({
      amount: 500,
      currency: "USD",
      recipient: {
        account_number: "1234567890",
        bank_code: "BANK001",
      },
    });
    console.log("Transfer:", transfer);

    // Profile example
    const profile = await sdk.getProfile();
    console.log("Profile:", profile);
  } catch (error) {
    console.error("Error:", error);
  }
}

example();
```

## API Reference

### `SarafaSDK(apiKey: string)`

Creates a new instance of the Sarafa SDK.

### `charge(chargeData: ChargeRequest): Promise<ChargeResponse>`

Initiates a payment charge.

### `transfer(transferData: TransferRequest): Promise<TransferResponse>`

Initiates a transfer to a recipient.

### `getProfile(): Promise<ProfileResponse>`

Retrieves the authenticated user's profile information.

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Run tests: `npm test`

## License

MIT
