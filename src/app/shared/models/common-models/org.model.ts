export interface IOrgModel {
    id?: any;
    // Name of the organization
    name?: string;

    // Description or mission statement of the organization
    description?: string;

    // Address of the organization's headquarters
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;

    // Date when the organization was founded
    foundingDate?: Date;

    // Industry or sector in which the organization operates
    industry?: string;

    // Website URL for the organization
    website?: string;
}