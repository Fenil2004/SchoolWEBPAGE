# Database Setup Guide for Angels School

This guide provides instructions for setting up and managing the database for the Angels School application.

## Database Options

### Option 1: PostgreSQL (Recommended for Production)
- Robust and scalable
- ACID compliant
- Great for complex queries
- Works well with Prisma ORM

### Option 2: MongoDB
- Flexible schema
- Easy to get started
- Good for rapid development
- Works well with Mongoose

### Option 3: MySQL/MariaDB
- Popular and well-supported
- Good for traditional web apps
- Works well with Prisma

## Setup Instructions

## A. PostgreSQL Setup

### 1. Install PostgreSQL

**Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Run installer and follow prompts
3. Remember your password for postgres user
4. Default port: 5432

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# Access PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE angels_school;

# Create user (optional)
CREATE USER angels_admin WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE angels_school TO angels_admin;

# Exit
\q
```

### 3. Install Prisma

```bash
npm install prisma @prisma/client --save-dev
npx prisma init
```

### 4. Configure Prisma Schema

Edit `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User Model (Admin & Students)
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  name          String
  role          Role      @default(STUDENT)
  phone         String?
  studentId     String?   @unique
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  enrollments   Enrollment[]
  
  @@index([email])
  @@index([studentId])
}

enum Role {
  ADMIN
  STUDENT
}

// Course Model
model Course {
  id            String    @id @default(cuid())
  title         String
  slug          String    @unique
  description   String    @db.Text
  longDescription String? @db.Text
  price         Float
  discountPrice Float?
  duration      String
  syllabus      Json      // Array of topics
  targetExams   Json      // Array of exam names
  features      Json?     // Array of features
  seatsTotal    Int
  seatsAvailable Int
  isActive      Boolean   @default(true)
  isFeatured    Boolean   @default(false)
  startDate     DateTime?
  endDate       DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  enrollments   Enrollment[]
  
  @@index([slug])
  @@index([isActive])
}

// Branch Model
model Branch {
  id            String    @id @default(cuid())
  name          String
  slug          String    @unique
  address       String    @db.Text
  city          String
  state         String
  pincode       String
  phone         String
  email         String
  latitude      Float?
  longitude     Float?
  isHeadquarter Boolean   @default(false)
  facilities    Json      // Array of facilities
  achievements  Json?     // Array of achievements
  images        Json?     // Array of image URLs
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([slug])
  @@index([city])
  @@index([isActive])
}

// Testimonial Model
model Testimonial {
  id            String    @id @default(cuid())
  name          String
  role          TestimonialRole
  content       String    @db.Text
  rating        Int       @default(5)
  achievement   String?
  course        String?
  image         String?
  isVerified    Boolean   @default(false)
  isFeatured    Boolean   @default(false)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([isActive])
  @@index([isFeatured])
}

enum TestimonialRole {
  STUDENT
  PARENT
  ALUMNI
}

// Gallery Model
model GalleryImage {
  id            String    @id @default(cuid())
  title         String
  description   String?
  imageUrl      String
  thumbnailUrl  String?
  category      GalleryCategory
  tags          Json?     // Array of tags
  isVideo       Boolean   @default(false)
  videoUrl      String?
  orderIndex    Int       @default(0)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([category])
  @@index([isActive])
}

enum GalleryCategory {
  CAMPUS
  FACILITIES
  STUDENTS
  EVENTS
  ACHIEVEMENTS
}

// Hero Content Model
model HeroContent {
  id            String    @id @default(cuid())
  title         String
  subtitle      String?
  description   String?   @db.Text
  backgroundImage String?
  ctaText       String?
  ctaLink       String?
  page          String    @default("home")
  orderIndex    Int       @default(0)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([page])
  @@index([isActive])
}

// Site Settings Model
model SiteSettings {
  id            String    @id @default(cuid())
  siteName      String    @default("Angels School")
  tagline       String?
  phone         String
  email         String
  address       String    @db.Text
  socialMedia   Json      // {facebook, twitter, instagram, youtube}
  seoSettings   Json?     // {metaTitle, metaDescription, keywords}
  theme         Json?     // {primaryColor, secondaryColor, etc}
  maintenanceMode Boolean @default(false)
  updatedAt     DateTime  @updatedAt
}

// Enrollment Model (Student enrollments in courses)
model Enrollment {
  id            String    @id @default(cuid())
  studentId     String
  courseId      String
  status        EnrollmentStatus @default(PENDING)
  paymentStatus PaymentStatus @default(PENDING)
  amountPaid    Float?
  enrollmentDate DateTime @default(now())
  completionDate DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  student       User      @relation(fields: [studentId], references: [id])
  course        Course    @relation(fields: [courseId], references: [id])
  
  @@index([studentId])
  @@index([courseId])
  @@index([status])
}

enum EnrollmentStatus {
  PENDING
  ACTIVE
  COMPLETED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PAID
  PARTIALLY_PAID
  REFUNDED
}

// Contact Form Submissions
model ContactSubmission {
  id            String    @id @default(cuid())
  name          String
  email         String
  phone         String?
  subject       String?
  message       String    @db.Text
  isRead        Boolean   @default(false)
  isResolved    Boolean   @default(false)
  createdAt     DateTime  @default(now())
  
  @@index([isRead])
  @@index([createdAt])
}
```

### 5. Run Migrations

```bash
# Create migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 6. Seed Initial Data

Create `prisma/seed.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Get admin credentials from environment variables
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('ERROR: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local');
    process.exit(1);
  }

  // Create Admin User
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'System Admin',
      role: 'ADMIN',
      phone: '+919081044496',
    },
  });
  console.log('Created admin:', admin);

  // Create Sample Courses
  const neetCourse = await prisma.course.create({
    data: {
      title: 'NEET Preparation',
      slug: 'neet-preparation',
      description: 'Complete NEET coaching with expert faculty',
      longDescription: 'Comprehensive NEET preparation program covering Physics, Chemistry, and Biology with regular tests and doubt sessions.',
      price: 50000,
      discountPrice: 45000,
      duration: '12 months',
      syllabus: ['Physics', 'Chemistry', 'Biology', 'Mock Tests', 'Doubt Sessions'],
      targetExams: ['NEET'],
      seatsTotal: 30,
      seatsAvailable: 30,
      isActive: true,
      isFeatured: true,
    },
  });

  const jeeCourse = await prisma.course.create({
    data: {
      title: 'JEE Main & Advanced',
      slug: 'jee-main-advanced',
      description: 'Comprehensive JEE preparation program',
      longDescription: 'Complete preparation for JEE Main and Advanced with experienced faculty and regular test series.',
      price: 55000,
      discountPrice: 50000,
      duration: '12 months',
      syllabus: ['Mathematics', 'Physics', 'Chemistry', 'Problem Solving', 'Test Series'],
      targetExams: ['JEE Main', 'JEE Advanced'],
      seatsTotal: 25,
      seatsAvailable: 25,
      isActive: true,
      isFeatured: true,
    },
  });

  console.log('Created courses:', { neetCourse, jeeCourse });

  // Create Branches
  const bhavnagarBranch = await prisma.branch.create({
    data: {
      name: 'Bhavnagar (HQ)',
      slug: 'bhavnagar',
      address: 'Near Krishna Park, Bhavnagar, Gujarat',
      city: 'Bhavnagar',
      state: 'Gujarat',
      pincode: '364001',
      phone: '+919081044496',
      email: 'bhavnagar@angelsschool.co.in',
      latitude: 21.7645,
      longitude: 72.1519,
      isHeadquarter: true,
      facilities: ['Library', 'Computer Lab', 'AC Classrooms', 'Cafeteria', 'Sports Ground'],
      achievements: ['Top Results 2024', '100+ Selections'],
      isActive: true,
    },
  });

  const ahmedabadBranch = await prisma.branch.create({
    data: {
      name: 'Ahmedabad',
      slug: 'ahmedabad',
      address: 'SG Highway, Ahmedabad, Gujarat',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015',
      phone: '+919081044497',
      email: 'ahmedabad@angelsschool.co.in',
      latitude: 23.0225,
      longitude: 72.5714,
      isHeadquarter: false,
      facilities: ['Smart Classrooms', 'Digital Library', 'Test Center'],
      isActive: true,
    },
  });

  console.log('Created branches:', { bhavnagarBranch, ahmedabadBranch });

  // Create Site Settings
  const settings = await prisma.siteSettings.create({
    data: {
      siteName: 'Angels School',
      tagline: 'Where Dreams To Be Realities',
      phone: '+919081044496',
      email: 'info@angelsschool.co.in',
      address: 'Bhavnagar, Gujarat, India',
      socialMedia: {
        facebook: 'https://facebook.com/angelsschool',
        twitter: 'https://twitter.com/angelsschool',
        instagram: 'https://instagram.com/angelsschool',
        youtube: 'https://youtube.com/angelsschool',
      },
      seoSettings: {
        metaTitle: 'Angels School - Best Coaching Institute in Gujarat',
        metaDescription: 'Leading coaching institute for NEET, JEE, and competitive exams',
        keywords: 'NEET coaching, JEE coaching, Gujarat, Bhavnagar',
      },
    },
  });

  console.log('Created site settings:', settings);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:
```json
{
  "prisma": {
    "seed": "node prisma/seed.js"
  }
}
```

Run seed:
```bash
npx prisma db seed
```

### 7. Prisma Studio (GUI)

View and edit your database:
```bash
npx prisma studio
```

Opens at http://localhost:5555

## B. MongoDB Setup

### 1. Install MongoDB

**Using MongoDB Atlas (Cloud - Recommended):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string

**Local Installation:**

**Windows:**
- Download from https://www.mongodb.com/try/download/community

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install mongodb-org
sudo systemctl start mongod
```

### 2. Install Mongoose

```bash
npm install mongoose
```

### 3. Create Models

Create `models/User.js`:
```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'STUDENT'], default: 'STUDENT' },
  phone: String,
  studentId: { type: String, unique: true, sparse: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
```

## Database Management

### Backup Database (PostgreSQL)

```bash
# Backup
pg_dump -U postgres angels_school > backup.sql

# Restore
psql -U postgres angels_school < backup.sql
```

### Backup Database (MongoDB)

```bash
# Backup
mongodump --db=angels_school --out=/backup/

# Restore
mongorestore --db=angels_school /backup/angels_school
```

### Common Prisma Commands

```bash
# Reset database
npx prisma migrate reset

# View database in browser
npx prisma studio

# Generate client after schema changes
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Deploy migrations to production
npx prisma migrate deploy

# Format schema
npx prisma format
```

### Database Indexes

Already defined in schema, but important ones:
- User: email, studentId
- Course: slug, isActive
- Branch: slug, city
- Testimonial: isActive, isFeatured
- Gallery: category, isActive

## Performance Optimization

1. **Use Indexes** - Already defined in schema
2. **Connection Pooling** - Prisma handles this automatically
3. **Query Optimization** - Use `select` to fetch only needed fields
4. **Caching** - Implement Redis for frequently accessed data
5. **Pagination** - Always paginate large datasets

## Security Best Practices

1. **Encryption at Rest** - Enable in production database
2. **SSL/TLS** - Always use encrypted connections
3. **Least Privilege** - Database users should have minimal permissions
4. **Regular Backups** - Automate daily backups
5. **Audit Logging** - Enable database audit logs
6. **Input Validation** - Prisma provides protection against SQL injection
7. **Secrets Management** - Never commit database credentials

## Monitoring

### Enable Query Logging

In `.env.local`:
```env
DATABASE_URL="postgresql://...?schema=public&connection_limit=5&pool_timeout=10"
```

### Check Database Health

```javascript
// In your API
const isDatabaseHealthy = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
};
```

## Troubleshooting

### Connection Issues
- Check database is running: `systemctl status postgresql`
- Verify DATABASE_URL in .env.local
- Check firewall settings
- Verify credentials

### Migration Errors
- Reset database: `npx prisma migrate reset`
- Check schema syntax
- Verify database permissions

### Performance Issues
- Check query performance with Prisma's query logging
- Add missing indexes
- Implement caching
- Optimize N+1 queries

## Production Checklist

- [ ] Set up production database (managed service recommended)
- [ ] Enable SSL connections
- [ ] Configure connection pooling
- [ ] Set up automated backups
- [ ] Enable monitoring and alerts
- [ ] Configure read replicas (if needed)
- [ ] Set up database user with limited permissions
- [ ] Enable audit logging
- [ ] Document disaster recovery plan
- [ ] Test backup restoration process

## Resources

- Prisma Documentation: https://www.prisma.io/docs
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- MongoDB Documentation: https://docs.mongodb.com/
- Mongoose Documentation: https://mongoosejs.com/docs/
