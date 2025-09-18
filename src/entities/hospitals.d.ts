/**
 * Collection ID: hospitals
 * Interface for Hospitals
 */
export interface Hospitals {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  hospitalName?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  hospitalImage?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
}
