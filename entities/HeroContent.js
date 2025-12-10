/**
 * HeroContent Entity
 * Represents hero/banner section content for pages
 */

export class HeroContent {
  constructor({
    id = null,
    title = '',
    subtitle = '',
    description = '',
    backgroundImage = '',
    ctaText = '',
    ctaLink = '',
    isActive = true,
    page = 'home',
    order = 0,
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.backgroundImage = backgroundImage;
    this.ctaText = ctaText;
    this.ctaLink = ctaLink;
    this.isActive = isActive;
    this.page = page;
    this.order = order;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Validation methods
  validate() {
    const errors = [];
    
    if (!this.title || this.title.trim().length === 0) {
      errors.push('Title is required');
    }
    
    if (this.title.length > 200) {
      errors.push('Title must be 200 characters or less');
    }
    
    if (this.description && this.description.length > 500) {
      errors.push('Description must be 500 characters or less');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Convert to plain object
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      description: this.description,
      backgroundImage: this.backgroundImage,
      ctaText: this.ctaText,
      ctaLink: this.ctaLink,
      isActive: this.isActive,
      page: this.page,
      order: this.order,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Create from plain object
  static fromJSON(data) {
    return new HeroContent(data);
  }
}

export default HeroContent;
