/**
 * SiteSettings Entity
 * Represents global site configuration and settings
 */

export class SiteSettings {
  constructor({
    id = null,
    siteName = 'Angels School Career Institute',
    tagline = 'Empowering Future Leaders',
    description = '',
    logo = '',
    favicon = '',
    // Contact Information
    primaryPhone = '',
    secondaryPhone = '',
    primaryEmail = '',
    secondaryEmail = '',
    whatsappNumber = '',
    // Address
    headOfficeAddress = '',
    city = 'Bhavnagar',
    state = 'Gujarat',
    country = 'India',
    pincode = '',
    // Social Media
    socialMedia = {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      linkedin: ''
    },
    // Operating Hours
    workingHours = '7:00 AM - 7:00 PM',
    workingDays = 'Monday - Saturday',
    // SEO Settings
    metaTitle = '',
    metaDescription = '',
    metaKeywords = [],
    ogImage = '',
    // Features
    enableEnrollment = true,
    enableBlog = false,
    enableNewsletter = true,
    enableLiveChat = false,
    // Notifications
    announcementBar = {
      enabled: false,
      message: '',
      type: 'info',
      link: ''
    },
    // Theme
    theme = {
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      accentColor: '#3b82f6'
    },
    // Maintenance
    maintenanceMode = false,
    maintenanceMessage = '',
    // Analytics
    googleAnalyticsId = '',
    facebookPixelId = '',
    // Misc
    copyrightText = '',
    termsUrl = '',
    privacyUrl = '',
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.siteName = siteName;
    this.tagline = tagline;
    this.description = description;
    this.logo = logo;
    this.favicon = favicon;
    this.primaryPhone = primaryPhone;
    this.secondaryPhone = secondaryPhone;
    this.primaryEmail = primaryEmail;
    this.secondaryEmail = secondaryEmail;
    this.whatsappNumber = whatsappNumber;
    this.headOfficeAddress = headOfficeAddress;
    this.city = city;
    this.state = state;
    this.country = country;
    this.pincode = pincode;
    this.socialMedia = socialMedia;
    this.workingHours = workingHours;
    this.workingDays = workingDays;
    this.metaTitle = metaTitle || siteName;
    this.metaDescription = metaDescription;
    this.metaKeywords = metaKeywords;
    this.ogImage = ogImage;
    this.enableEnrollment = enableEnrollment;
    this.enableBlog = enableBlog;
    this.enableNewsletter = enableNewsletter;
    this.enableLiveChat = enableLiveChat;
    this.announcementBar = announcementBar;
    this.theme = theme;
    this.maintenanceMode = maintenanceMode;
    this.maintenanceMessage = maintenanceMessage;
    this.googleAnalyticsId = googleAnalyticsId;
    this.facebookPixelId = facebookPixelId;
    this.copyrightText = copyrightText || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`;
    this.termsUrl = termsUrl;
    this.privacyUrl = privacyUrl;
    this.updatedAt = updatedAt;
  }

  // Helper methods
  getFullAddress() {
    const parts = [this.headOfficeAddress, this.city, this.state, this.country, this.pincode]
      .filter(Boolean);
    return parts.join(', ');
  }

  getContactEmail() {
    return this.primaryEmail || this.secondaryEmail || '';
  }

  getContactPhone() {
    return this.primaryPhone || this.secondaryPhone || '';
  }

  getSocialMediaLinks() {
    return Object.entries(this.socialMedia)
      .filter(([_, url]) => url && url.trim().length > 0)
      .map(([platform, url]) => ({ platform, url }));
  }

  hasSocialMedia() {
    return this.getSocialMediaLinks().length > 0;
  }

  isInMaintenanceMode() {
    return this.maintenanceMode;
  }

  hasAnnouncementBar() {
    return this.announcementBar.enabled && this.announcementBar.message;
  }

  // Validation methods
  validate() {
    const errors = [];
    
    if (!this.siteName || this.siteName.trim().length === 0) {
      errors.push('Site name is required');
    }
    
    if (!this.primaryEmail || this.primaryEmail.trim().length === 0) {
      errors.push('Primary email is required');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.primaryEmail && !emailRegex.test(this.primaryEmail)) {
      errors.push('Invalid primary email format');
    }
    
    if (this.secondaryEmail && !emailRegex.test(this.secondaryEmail)) {
      errors.push('Invalid secondary email format');
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (this.primaryPhone && !phoneRegex.test(this.primaryPhone.replace(/\s/g, ''))) {
      errors.push('Invalid primary phone number format');
    }
    
    // Social media URL validation
    Object.entries(this.socialMedia).forEach(([platform, url]) => {
      if (url && url.trim().length > 0) {
        try {
          new URL(url);
        } catch {
          errors.push(`Invalid ${platform} URL`);
        }
      }
    });
    
    // Announcement bar validation
    const validAnnouncementTypes = ['info', 'warning', 'success', 'error'];
    if (this.announcementBar.enabled && !validAnnouncementTypes.includes(this.announcementBar.type)) {
      errors.push(`Announcement type must be one of: ${validAnnouncementTypes.join(', ')}`);
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
      siteName: this.siteName,
      tagline: this.tagline,
      description: this.description,
      logo: this.logo,
      favicon: this.favicon,
      primaryPhone: this.primaryPhone,
      secondaryPhone: this.secondaryPhone,
      primaryEmail: this.primaryEmail,
      secondaryEmail: this.secondaryEmail,
      whatsappNumber: this.whatsappNumber,
      headOfficeAddress: this.headOfficeAddress,
      city: this.city,
      state: this.state,
      country: this.country,
      pincode: this.pincode,
      socialMedia: this.socialMedia,
      workingHours: this.workingHours,
      workingDays: this.workingDays,
      metaTitle: this.metaTitle,
      metaDescription: this.metaDescription,
      metaKeywords: this.metaKeywords,
      ogImage: this.ogImage,
      enableEnrollment: this.enableEnrollment,
      enableBlog: this.enableBlog,
      enableNewsletter: this.enableNewsletter,
      enableLiveChat: this.enableLiveChat,
      announcementBar: this.announcementBar,
      theme: this.theme,
      maintenanceMode: this.maintenanceMode,
      maintenanceMessage: this.maintenanceMessage,
      googleAnalyticsId: this.googleAnalyticsId,
      facebookPixelId: this.facebookPixelId,
      copyrightText: this.copyrightText,
      termsUrl: this.termsUrl,
      privacyUrl: this.privacyUrl,
      updatedAt: this.updatedAt
    };
  }

  // Create from plain object
  static fromJSON(data) {
    return new SiteSettings(data);
  }
}

export default SiteSettings;
