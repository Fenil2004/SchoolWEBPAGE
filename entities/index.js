/**
 * Entity Exports
 * Central export file for all entity classes
 */

export { HeroContent } from './HeroContent';
export { GalleryImage } from './GalleryImage';
export { Testimonial } from './Testimonial';
export { Course } from './Course';
export { Branch } from './Branch';
export { SiteSettings } from './SiteSettings';

// Default export with all entities
export default {
  HeroContent: require('./HeroContent').HeroContent,
  GalleryImage: require('./GalleryImage').GalleryImage,
  Testimonial: require('./Testimonial').Testimonial,
  Course: require('./Course').Course,
  Branch: require('./Branch').Branch,
  SiteSettings: require('./SiteSettings').SiteSettings
};
