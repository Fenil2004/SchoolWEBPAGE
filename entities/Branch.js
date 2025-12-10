/**
 * Branch Entity
 * Represents a physical branch/campus location
 */

export class Branch {
  constructor({
    id = null,
    name = '',
    slug = '',
    type = 'branch',
    address = '',
    city = '',
    state = '',
    pincode = '',
    phone = '',
    alternatePhone = '',
    email = '',
    timing = '7:00 AM - 7:00 PM',
    workingDays = 'Monday - Saturday',
    isMain = false,
    established = null,
    students = 0,
    faculty = 0,
    facilities = [],
    achievements = [],
    coordinates = { latitude: null, longitude: null },
    mapEmbedUrl = '',
    imageUrl = '',
    gallery = [],
    isActive = true,
    order = 0,
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.name = name;
    this.slug = slug || this.generateSlug(name);
    this.type = type;
    this.address = address;
    this.city = city;
    this.state = state;
    this.pincode = pincode;
    this.phone = phone;
    this.alternatePhone = alternatePhone;
    this.email = email;
    this.timing = timing;
    this.workingDays = workingDays;
    this.isMain = isMain;
    this.established = established;
    this.students = students;
    this.faculty = faculty;
    this.facilities = facilities;
    this.achievements = achievements;
    this.coordinates = coordinates;
    this.mapEmbedUrl = mapEmbedUrl;
    this.imageUrl = imageUrl;
    this.gallery = gallery;
    this.isActive = isActive;
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

  getFullAddress() {
    const parts = [this.address, this.city, this.state, this.pincode].filter(Boolean);
    return parts.join(', ');
  }

  getDisplayName() {
    if (this.isMain) {
      return `${this.name} (Head Office)`;
    }
    return this.name;
  }

  getTypeLabel() {
    return this.isMain ? 'Head Office' : 'Branch';
  }

  getYearsSinceEstablishment() {
    if (!this.established) return null;
    const currentYear = new Date().getFullYear();
    return currentYear - parseInt(this.established);
  }

  getPhoneNumber() {
    return this.phone || this.alternatePhone || '';
  }

  hasCoordinates() {
    return this.coordinates.latitude !== null && this.coordinates.longitude !== null;
  }

  getGoogleMapsUrl() {
    if (this.hasCoordinates()) {
      return `https://www.google.com/maps?q=${this.coordinates.latitude},${this.coordinates.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.getFullAddress())}`;
  }

  // Validation methods
  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Branch name is required');
    }
    
    if (!this.address || this.address.trim().length === 0) {
      errors.push('Address is required');
    }
    
    if (!this.city || this.city.trim().length === 0) {
      errors.push('City is required');
    }
    
    if (!this.phone || this.phone.trim().length === 0) {
      errors.push('Phone number is required');
    }
    
    if (!this.email || this.email.trim().length === 0) {
      errors.push('Email is required');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.email && !emailRegex.test(this.email)) {
      errors.push('Invalid email format');
    }
    
    // Phone validation (basic Indian format)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (this.phone && !phoneRegex.test(this.phone.replace(/\s/g, ''))) {
      errors.push('Invalid phone number format');
    }
    
    const validTypes = ['branch', 'head-office', 'franchise'];
    if (!validTypes.includes(this.type)) {
      errors.push(`Type must be one of: ${validTypes.join(', ')}`);
    }
    
    if (this.students < 0) {
      errors.push('Number of students cannot be negative');
    }
    
    if (this.faculty < 0) {
      errors.push('Number of faculty cannot be negative');
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
      type: this.type,
      address: this.address,
      city: this.city,
      state: this.state,
      pincode: this.pincode,
      phone: this.phone,
      alternatePhone: this.alternatePhone,
      email: this.email,
      timing: this.timing,
      workingDays: this.workingDays,
      isMain: this.isMain,
      established: this.established,
      students: this.students,
      faculty: this.faculty,
      facilities: this.facilities,
      achievements: this.achievements,
      coordinates: this.coordinates,
      mapEmbedUrl: this.mapEmbedUrl,
      imageUrl: this.imageUrl,
      gallery: this.gallery,
      isActive: this.isActive,
      order: this.order,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Create from plain object
  static fromJSON(data) {
    return new Branch(data);
  }
}

export default Branch;
