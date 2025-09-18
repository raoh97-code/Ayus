/**
 * Collection ID: treatments
 * Interface for Treatments
 */
export interface Treatments {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  treatmentName?: string;
  /** @wixFieldType text */
  cardDescription?: string;
  /** @wixFieldType text */
  detailedExplanation?: string;
  /** @wixFieldType image */
  cardImage?: string;
  /** @wixFieldType text */
  slug?: string;
}
