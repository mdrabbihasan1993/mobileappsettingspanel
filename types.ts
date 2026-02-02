
export type SectionType = 
  | 'business' 
  | 'owner' 
  | 'pickup' 
  | 'payment' 
  | 'bank' 
  | 'mfs'
  | 'ai-assistant';

export interface PickupAddress {
  id: string;
  storeName: string;
  phone: string;
  address: string;
  division: string;
  district: string;
  area: string;
  isDefaultPickup: boolean;
  isDefaultReturn: boolean;
}

export interface BankInfo {
  bankName: string;
  branch: string;
  accHolderName: string;
  accNumber: string;
  routingNumber: string;
}

export interface MFSAccount {
  bkash: string;
  nagad: string;
  rocket: string;
}

export interface BusinessProfile {
  companyName: string;
  ownerName: string;
  ownerMobile: string;
  ownerEmail: string;
  profilePic: string;
  tradeLicense?: string;
  binNumber?: string;
  nidNumber?: string;
}
