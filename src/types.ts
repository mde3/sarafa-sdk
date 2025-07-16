export interface ChargeRequest {
  amount: number;
  currency: "SSP" | "UGX";
  external_id: string;
  phone: string;
  only_fees: false;
  callback_url: string;
}

export interface ChargeResponse {
  status: boolean;
  message: string;
  data: {
    tx_id: string;
    amount: number;
    currency: "SSP" | "UGX";
    status: "completed" | "pending" | "failed";
    created_at: string;
  };
}

export interface TransferRequest {
  amount: number;
  currency: "SSP" | "UGX";
  external_id: string;
  customer: {
    first_name: string;
    last_name: string;
    phone: string;
  };
  only_fees: boolean;
  callback_url: string;
}

export interface TransferResponse {
  status: boolean;
  message: string;
  data: {
    tx_id: string;
    amount: number;
    currency: "SSP" | "UGX";
    status: "completed" | "pending" | "failed";
    created_at: string;
  };
}

export interface ProfileResponse {
  status: boolean;
  message: string;
  data: {
    name: string;
    logo: string;
    sector: string;
    isVerified: boolean;
    account_no: string;
    createdAt: string;
  };
}
