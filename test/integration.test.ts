import { SarafaSDK } from "../src/client";
import { ChargeRequest, TransferRequest } from "../src/types";

require("dotenv").config();

describe("SarafaSDK Integration Tests", () => {
  const apiKey = process.env.SARAFA_API_KEY || "your-test-api-key";
  const sdk = new SarafaSDK(apiKey);
  const callbackURL =
    process.env.SARAFA_CALLBACK_URL || "https://webhook.site/your-callback";

  it("should perform a charge request", async () => {
    const chargeRequest: ChargeRequest = {
      amount: 100,
      currency: "SSP",
      external_id: `test_${Date.now()}`,
      phone: "+211922123123", // Use a test phone number
      only_fees: false,
      callback_url: callbackURL,
    };

    const response = await sdk.charge(chargeRequest);
    expect(response.status).toBe(true);
    expect(response.data).toHaveProperty("tx_id");
  });

  it("should perform a transfer request", async () => {
    const transferRequest: TransferRequest = {
      amount: 100,
      currency: "SSP",
      external_id: `test_${Date.now()}`,
      customer: {
        first_name: "John",
        last_name: "Doe",
        phone: "+211922123123", // Use a test phone number
      },
      only_fees: false,
      callback_url: callbackURL,
    };

    const response = await sdk.transfer(transferRequest);
    expect(response.status).toBe(true);
    expect(response.data).toHaveProperty("tx_id");
  });

  it("should retrieve profile", async () => {
    const response = await sdk.getProfile();
    expect(response.status).toBe(true);
    expect(response.data).toHaveProperty("name");
  });
});
