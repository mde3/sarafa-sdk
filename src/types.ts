export interface ChargeRequest {
  amount: number;
  currency: string;
  customer: {
    email: string;
    phone?: string;
    name?: string;
  };
  description?: string;
  reference?: string;
}

export interface ChargeResponse {
  status: string;
  transaction_id: string;
  amount: number;
  currency: string;
  created_at: string;
  message?: string;
}

export interface TransferRequest {
  amount: number;
  currency: string;
  recipient: {
    account_number: string;
    bank_code: string;
  };
  description?: string;
  reference?: string;
}

export interface TransferResponse {
  status: string;
  transfer_id: string;
  amount: number;
  currency: string;
  created_at: string;
  message?: string;
}

export interface ProfileResponse {
  user_id: string;
  email: string;
  name?: string;
  phone?: string;
  created_at: string;
  status: string;
}
