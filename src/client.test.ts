import { SarafaClient } from "../src/client";

describe("SarafaClient", () => {
  const sdk = new SarafaClient("test-key");

  it("should have charge, transfer, and getProfile methods", () => {
    expect(typeof sdk.charge).toBe("function");
    expect(typeof sdk.transfer).toBe("function");
    expect(typeof sdk.getProfile).toBe("function");
  });
});
