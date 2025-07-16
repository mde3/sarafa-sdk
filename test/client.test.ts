import axios from "axios";
import { SarafaSDK } from "../src/client";
import { ChargeRequest, TransferRequest } from "../src/types";

require("dotenv").config();

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SarafaSDK", () => {
  let sdk: SarafaSDK;

  const apiKey = process.env.SARAFA_API_KEY || "test-api-key";
  const baseURL =
    process.env.SARAFA_BASE_URL || "https://api.sarafa.ss/business";
  const callbackURL =
    process.env.SARAFA_CALLBACK_URL || "https://webhook.site/your-callback";

  beforeEach(() => {
    sdk = new SarafaSDK(apiKey);
    mockedAxios.create.mockReturnValue(mockedAxios);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct API key and base URL", () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL,
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
  });

  // Test 1: CHARGE TESTING
  describe("charge", () => {
    it("should successfully make a charge request", async () => {
      const chargeRequest: ChargeRequest = {
        amount: 100,
        currency: "SSP",
        external_id: "123123",
        phone: "+211922123123",
        only_fees: false,
        callback_url: callbackURL,
      };

      const mockResponse = {
        status: true,
        message: "Charge initiated",
        data: {
          tx_id: "charge_123",
          amount: 100,
          currency: "SSP",
          status: "pending",
          created_at: "2025-07-16T14:22:00Z",
        },
      };

      mockedAxios.post.mockResolvedValue({ data: mockResponse });

      const response = await sdk.charge(chargeRequest);

      expect(mockedAxios.post).toHaveBeenCalledWith("/charge", chargeRequest);
      expect(response).toEqual(mockResponse);
    });

    it("should handle charge request errors", async () => {
      const chargeRequest: ChargeRequest = {
        amount: 100,
        currency: "SSP",
        external_id: "123123",
        phone: "+211922123123",
        only_fees: false,
        callback_url: callbackURL,
      };

      const errorResponse = {
        response: {
          status: 400,
          data: { message: "Invalid phone number" },
        },
      };

      mockedAxios.post.mockRejectedValue(errorResponse);

      await expect(sdk.charge(chargeRequest)).rejects.toThrow(
        "API Error: 400 - Invalid phone number"
      );
    });
  });

  // Test 2: TRANSFER TESTING
  describe("transfer", () => {
    it("should successfully make a transfer request", async () => {
      const transferRequest: TransferRequest = {
        amount: 100,
        currency: "SSP",
        external_id: "123123",
        customer: {
          first_name: "John",
          last_name: "Doe",
          phone: "+211922123123",
        },
        only_fees: false,
        callback_url: callbackURL,
      };

      const mockResponse = {
        status: true,
        message: "Transfer initiated",
        data: {
          tx_id: "transfer_123",
          amount: 100,
          currency: "SSP",
          status: "pending",
          created_at: "2025-07-16T14:22:00Z",
        },
      };

      mockedAxios.post.mockResolvedValue({ data: mockResponse });

      const response = await sdk.transfer(transferRequest);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        "/transfer",
        transferRequest
      );
      expect(response).toEqual(mockResponse);
    });

    it("should handle transfer request errors", async () => {
      const transferRequest: TransferRequest = {
        amount: 100,
        currency: "SSP",
        external_id: "123123",
        customer: {
          first_name: "John",
          last_name: "Doe",
          phone: "+211922123123",
        },
        only_fees: false,
        callback_url: callbackURL,
      };

      mockedAxios.post.mockRejectedValue({
        response: {
          status: 401,
          data: { message: "Unauthorized" },
        },
      });

      await expect(sdk.transfer(transferRequest)).rejects.toThrow(
        "API Error: 401 - Unauthorized"
      );
    });
  });

  // Test 3: PROFILE TESTING 'getProfile' call
  describe("getProfile", () => {
    it("should successfully retrieve profile", async () => {
      const mockResponse = {
        status: true,
        message: "Profile retrieved",
        data: {
          name: "Test Business",
          logo: "https://example.com/logo.png",
          sector: "Finance",
          isVerified: true,
          account_no: "123456",
          createdAt: "2025-01-01T00:00:00Z",
        },
      };

      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const response = await sdk.getProfile();

      expect(mockedAxios.get).toHaveBeenCalledWith("/profile");
      expect(response).toEqual(mockResponse);
    });

    it("should handle profile request errors", async () => {
      mockedAxios.get.mockRejectedValue({
        response: {
          status: 500,
          data: { message: "Server error" },
        },
      });

      await expect(sdk.getProfile()).rejects.toThrow(
        "API Error: 500 - Server error"
      );
    });
  });
});
