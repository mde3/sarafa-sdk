// src/sarafa-sdk.ts
import axios, { AxiosInstance } from "axios";
import {
  ChargeRequest,
  ChargeResponse,
  TransferRequest,
  TransferResponse,
  ProfileResponse,
} from "./types";

export class SarafaClient {
  private api: AxiosInstance;
  private baseUrl: string = "https://api.sarafa.ss/business";

  constructor(apiKey: string) {
    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'api-key': `${apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Initiates a charge request
   * @param chargeData The charge request parameters
   * @returns Promise containing the charge response
   */
  async charge(chargeData: ChargeRequest): Promise<ChargeResponse> {
    try {
      const response = await this.api.post<ChargeResponse>(
        "/charge",
        chargeData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Initiates a transfer request
   * @param transferData The transfer request parameters
   * @returns Promise containing the transfer response
   */
  async transfer(transferData: TransferRequest): Promise<TransferResponse> {
    try {
      const response = await this.api.post<TransferResponse>(
        "/transfer",
        transferData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Retrieves user profile information
   * @returns Promise containing the profile response
   */
  async getProfile(): Promise<ProfileResponse> {
    try {
      const response = await this.api.get<ProfileResponse>("/profile");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      return new Error(
        `API Error: ${error.response.status} - ${
          error.response.data.message || "Unknown error"
        }`
      );
    }
    return new Error(`Network Error: ${error.message}`);
  }
}
