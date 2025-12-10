/**
 * Course Entity
 * Represents a course offering at the institute
 */

export class Course {
  constructor({
    id = null,
    name = '',
    slug = '',
    description = '',
    category = '',
    level = 'intermediate',
    duration = '',
    durationInMonths = 12,
    price = 0,
    discountedPrice = null,
    features = [],
    highlights = [],
    syllabus = [],
    prerequisites = [],
    targetExams = [],
    batchSize = 30,
    availableSeats = 0,
    startDate = null,
    endDate = null,
    schedule = '',
    instructors = [],
    imageUrl = '',
    isActive = true,
    isFeatured = false,
    order = 0,
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.name = name;
    this.slug = slug || this.generateSlug(name);
    this.description = description;
    this.category = category;
    this.level = level;
    this.duration = duration;
    this.durationInMonths = durationInMonths;
    this.price = price;
    this.discountedPrice = discountedPrice;
    this.features = features;
    this.highlights = highlights;
    this.syllabus = syllabus;
    this.prerequisites = prerequisites;
    this.targetExams = targetExams;
    this.batchSize = batchSize;
    this.availableSeats = availableSeats;
    this.startDate = startDate;
    this.endDate = endDate;
    this.schedule = schedule;
    this.instructors = instructors;
    this.imageUrl = imageUrl;
    this.isActive = isActive;
    this.isFeatured = isFeatured;
    this.order = order;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Helper methods
  generateSlug(name) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  getEffectivePrice() {
    return this.discountedPrice !== null ? this.discountedPrice : this.price;
  }

  getDiscountPercentage() {
    if (this.discountedPrice === null || this.price === 0) {
      return 0;
    }
    return Math.round(((this.price - this.discountedPrice) / this.price) * 100);
  }

  hasDiscount() {
    return this.discountedPrice !== null && this.discountedPrice < this.price;
  }

  hasAvailableSeats() {
    return this.availableSeats > 0;
  }

  getEnrollmentStatus() {
    if (this.availableSeats === 0) return 'full';
    if (this.availableSeats <= 5) return 'limited';
    return 'available';
  }

  // Validation methods
  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Course name is required');
    }
    
    if (!this.description || this.description.trim().length === 0) {
      errors.push('Description is required');
    }
    
    if (!this.category || this.category.trim().length === 0) {
      errors.push('Category is required');
    }
    
    const validLevels = ['beginner', 'intermediate', 'advanced'];
    if (!validLevels.includes(this.level)) {
      errors.push(`Level must be one of: ${validLevels.join(', ')}`);
    }
    
    if (this.price < 0) {
      errors.push('Price cannot be negative');
    }
    
    if (this.discountedPrice !== null && this.discountedPrice > this.price) {
      errors.push('Discounted price cannot be greater than regular price');
    }
    
    if (this.batchSize <= 0) {
      errors.push('Batch size must be greater than 0');
    }
    
    if (this.availableSeats < 0) {
      errors.push('Available seats cannot be negative');
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
      name: this.name,
      slug: this.slug,
      description: this.description,
      category: this.category,
      level: this.level,
      duration: this.duration,
      durationInMonths: this.durationInMonths,
      price: this.price,
      discountedPrice: this.discountedPrice,
      features: this.features,
      highlights: this.highlights,
      syllabus: this.syllabus,
      prerequisites: this.prerequisites,
      targetExams: this.targetExams,
      batchSize: this.batchSize,
      availableSeats: this.availableSeats,
      startDate: this.startDate,
      endDate: this.endDate,
      schedule: this.schedule,
      instructors: this.instructors,
      imageUrl: this.imageUrl,
      isActive: this.isActive,
      isFeatured: this.isFeatured,
      order: this.order,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Create from plain object
  static fromJSON(data) {
    return new Course(data);
  }
}

export default Course;
