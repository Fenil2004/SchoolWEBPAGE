/**
 * GalleryImage Entity
 * Represents an image in the gallery with metadata
 */

export class GalleryImage {
  constructor({
    id = null,
    title = '',
    description = '',
    imageUrl = '',
    thumbnailUrl = '',
    category = 'general',
    tags = [],
    isVideo = false,
    videoUrl = '',
    order = 0,
    uploadedBy = '',
    isPublished = true,
    publishedAt = null,
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.thumbnailUrl = thumbnailUrl || imageUrl;
    this.category = category;
    this.tags = tags;
    this.isVideo = isVideo;
    this.videoUrl = videoUrl;
    this.order = order;
    this.uploadedBy = uploadedBy;
    this.isPublished = isPublished;
    this.publishedAt = publishedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Validation methods
  validate() {
    const errors = [];
    
    if (!this.title || this.title.trim().length === 0) {
      errors.push('Title is required');
    }
    
    if (!this.imageUrl || this.imageUrl.trim().length === 0) {
      errors.push('Image URL is required');
    }
    
    if (this.isVideo && (!this.videoUrl || this.videoUrl.trim().length === 0)) {
      errors.push('Video URL is required for video items');
    }
    
    const validCategories = ['campus', 'events', 'students', 'achievements', 'facilities', 'general'];
    if (!validCategories.includes(this.category)) {
      errors.push(`Category must be one of: ${validCategories.join(', ')}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Helper methods
  getDisplayUrl() {
    return this.thumbnailUrl || this.imageUrl;
  }

  hasVideo() {
    return this.isVideo && this.videoUrl;
  }

  // Convert to plain object
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      imageUrl: this.imageUrl,
      thumbnailUrl: this.thumbnailUrl,
      category: this.category,
      tags: this.tags,
      isVideo: this.isVideo,
      videoUrl: this.videoUrl,
      order: this.order,
      uploadedBy: this.uploadedBy,
      isPublished: this.isPublished,
      publishedAt: this.publishedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Create from plain object
  static fromJSON(data) {
    return new GalleryImage(data);
  }
}

export default GalleryImage;
