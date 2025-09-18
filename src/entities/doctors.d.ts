/**
 * Collection ID: doctors
 * Interface for Doctors
 */
export interface Doctors {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  specialization?: string;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType text */
  contactEmail?: string;
  /** @wixFieldType number */
  yearsOfExperience?: number;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType text */
  hospitalAffiliation?: string;
}
