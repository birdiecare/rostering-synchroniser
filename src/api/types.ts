export interface Address {
  formatted_address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  access_details?: string;
}
export interface User {
  id: string;
  firstname: string;
  lastname: string;
  image_url?: string;
}

export type CareRecipient = User & {
  agency_id: string;
  gender: string | null;
  is_activated: boolean;
  date_of_birth: string | null;
  allergies: string | null;
  gp_name: string | null;
  gp_phone: string | null;
  pharmacy_name: string | null;
  pharmacy_street_address: string | null;
  pharmacy_post_code: string | null;
  primary_phone_number?: string;
  email?: string;
  timezone: string;
  has_capacity?: boolean;
  has_poa?: boolean;
  has_dnar?: boolean;
  sensors: boolean;
  self_administer: boolean;
  family_involvement?: number;
  religion?: string;
  ethnicity?: string;
  likes?: string;
  dislikes?: string;
  hobbies?: string;
  general_notes: string | null;
  disability_notes: string | null;
  updated_at?: string;
  address?: Address;
  nhs_number?: string | null;
};

export type Caregiver = User & {
  agency_id: string;
  country_code?: number;
  email?: string;
  is_active: boolean;
  phone_number?: string;
  username: string;
  address?: string;
};

export interface CaregiverInVisit {
  user: Pick<
    Caregiver,
    'id' | 'firstname' | 'lastname' | 'country_code' | 'phone_number'
  >;
  actual_start_at?: string;
  actual_end_at?: string;
}

export interface Visit {
  id: string;
  careRecipient: CareRecipient;
  caregivers: CaregiverInVisit[];
  start_at: string;
  end_at: string;
}
