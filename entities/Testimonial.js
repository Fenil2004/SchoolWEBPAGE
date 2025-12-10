/**
 * Testimonial Entity
 * Represents student/parent testimonials and reviews
 */

export class Testimonial {
  constructor({
    id = null,
    name = '',
    role = 'student',
    batch = '',
    course = '',
    achievement = '',
    testimonialText = '',
    rating = 5,
    imageUrl = '',
    isVerified = false,
    isFeatured = false,
    isPublished = true,
    publishedAt = null,
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.batch = batch;
    this.course = course;
    this.achievement = achievement;
    this.testimonialText = testimonialText;
    this.rating = rating;
    this.imageUrl = imageUrl;
    this.isVerified = isVerified;
    this.isFeatured = isFeatured;
    this.isPublished = isPublished;
    this.publishedAt = publishedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Validation methods
  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Name is required');
    }
    
    if (!this.testimonialText || this.testimonialText.trim().length === 0) {
      errors.push('Testimonial text is required');
    }
    
    if (this.testimonialText.length > 1000) {
      errors.push('Testimonial text must be 1000 characters or less');
    }
    
    const validRoles = ['student', 'parent', 'alumni'];
    if (!validRoles.includes(this.role)) {
      errors.push(`Role must be one of: ${validRoles.join(', ')}`);
    }
    
    if (this.rating < 1 || this.rating > 5) {
      errors.push('Rating must be between 1 and 5');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Helper methods
  getDisplayName() {
    if (this.achievement) {
      return `${this.name} - ${this.achievement}`;
    }
    return this.name;
  }

  getSubtitle() {
    const parts = [];
    if (this.role) parts.push(this.role.charAt(0).toUpperCase() + this.role.slice(1));
    if (this.batch) parts.push(`Batch ${this.batch}`);
    if (this.course) parts.push(this.course);
    return parts.join(' • ');
  }

  // Convert to plain object
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      batch: this.batch,
      course: this.course,
      achievement: this.achievement,
      testimonialText: this.testimonialText,
      rating: this.rating,
      imageUrl: this.imageUrl,
      isVerified: this.isVerified,
      isFeatured: this.isFeatured,
      isPublished: this.isPublished,
      publishedAt: this.publishedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Create from plain object
  static fromJSON(data) {
    return new Testimonial(data);
  }
}

export default Testimonial;
