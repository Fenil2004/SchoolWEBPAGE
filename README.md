# Angels School - Educational Institute Management System

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue?style=flat&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, full-featured web application for managing educational institutes, built with Next.js, React, and TailwindCSS. Features include course management, branch administration, student portal, gallery management, and testimonials.

## 🌟 Features

### Public Features
- 🏠 **Dynamic Homepage** - Hero section, featured courses, testimonials
- 📚 **Courses Catalog** - Browse all available courses with detailed information
- 🏢 **Multi-Branch Support** - View all institute branches with locations and facilities
- 🖼️ **Gallery** - Image gallery with categories (Campus, Events, Students, Achievements)
- 💬 **Testimonials** - Student and parent reviews with ratings
- 📞 **Contact Form** - Get in touch with the institute
- 📱 **Responsive Design** - Works perfectly on all devices

### Admin Dashboard
- 🎨 **Hero Section Management** - Manage homepage banners and CTAs
- 📖 **Course Management** - Create, edit, and delete courses
- 🏛️ **Branch Management** - Manage branch information and locations
- 🖼️ **Gallery Management** - Upload and organize images
- 💭 **Testimonial Management** - Moderate and publish testimonials
- ⚙️ **Site Settings** - Configure site-wide settings and social media

### Student Portal
- 🔐 **Student Login** - Secure authentication for students
- 📊 **Dashboard** - View enrolled courses and progress (coming soon)
- 📝 **Course Enrollment** - Register for courses online (coming soon)

### Technical Features
- ⚡ **Server-Side Rendering** - Fast page loads with Next.js
- 🎨 **Modern UI** - Beautiful interface with Radix UI components
- 🔒 **Secure Authentication** - JWT-based authentication system
- 📱 **Mobile-First** - Responsive design that works on all devices
- 🚀 **Optimized Performance** - Fast loading and smooth animations
- 🎯 **SEO Friendly** - Optimized for search engines

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- PostgreSQL or MongoDB (for database)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/angels-school.git
cd angels-school
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/angels_school"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Admin Credentials (Initial Setup) - CHANGE THESE!
ADMIN_EMAIL="your-admin-email@example.com"
ADMIN_PASSWORD="your-secure-password"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

4. **Set up the database**

```bash
# Install Prisma CLI
npm install -g prisma

# Initialize Prisma
npx prisma init

# Run migrations
npx prisma migrate dev --name init

# Seed initial data
npx prisma db seed
```

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## School Website Project | Deployment Status: Fixing CSS
## 📁 Project Structure

```
angels-school/
├── Components/           # React components
│   ├── admin/           # Admin dashboard components
│   │   ├── HeroManagement.jsx
│   │   ├── CourseManagement.jsx
│   │   ├── BranchManagement.jsx
│   │   ├── GalleryManagement.jsx
│   │   ├── TestimonialManagement.jsx
│   │   └── SettingsManagement.jsx
│   ├── home/            # Homepage sections
│   │   ├── HeroSection.jsx
│   │   ├── CoursesSection.jsx
│   │   ├── BranchesSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   └── ...
│   ├── layout/          # Layout components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages-content/   # Page-specific components
│   │   ├── About.jsx
│   │   ├── Courses.jsx
│   │   ├── Branches.jsx
│   │   ├── Gallery.jsx
│   │   ├── Contact.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── StudentLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── branches/        # Branch detail components
│   │   ├── BranchSidebar.jsx
│   │   ├── BranchBhavnagar.jsx
│   │   └── BranchAhmedabad.jsx
│   └── ui/              # Reusable UI components
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       └── ...
├── pages/               # Next.js pages (routing)
│   ├── api/            # API routes
│   │   ├── auth/       # Authentication endpoints
│   │   ├── admin/      # Admin API endpoints
│   │   └── public/     # Public API endpoints
│   ├── admin/          # Admin pages
│   │   └── dashboard.js
│   ├── branches/       # Branch pages
│   │   ├── bhavnagar.js
│   │   └── ahmedabad.js
│   ├── index.js        # Homepage
│   ├── about.js
│   ├── courses.js
│   ├── branches.js
│   ├── gallery.js
│   ├── contact.js
│   ├── admin-login.js
│   └── student-login.js
├── lib/                # Utility functions
│   ├── db.js          # Database connection
│   ├── auth.js        # Authentication helpers
│   └── apiClient.js   # API client
├── models/            # Database models (if using MongoDB)
├── entities/          # Entity classes
│   ├── Course.js
│   ├── Branch.js
│   ├── Testimonial.js
│   ├── GalleryImage.js
│   ├── HeroContent.js
│   └── SiteSettings.js
├── prisma/            # Prisma ORM
│   ├── schema.prisma  # Database schema
│   └── seed.js        # Seed data
├── public/            # Static assets
│   ├── images/
│   └── icons/
├── styles/            # Global styles
│   └── globals.css
├── .env.local         # Environment variables (not committed)
├── .gitignore
├── package.json
├── tailwind.config.js
├── next.config.js
├── README.md
├── BACKEND_SETUP.md   # Backend setup guide
└── DATABASE_SETUP.md  # Database setup guide
```

## 🔧 Configuration

### Database Setup

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed database configuration instructions.

### Backend Setup

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for backend API configuration and setup.

### Tailwind Configuration

Customize colors, fonts, and design tokens in `tailwind.config.js`.

## 📖 Usage

### Default Admin Login
- **Email:** Set via `ADMIN_EMAIL` in `.env.local`
- **Password:** Set via `ADMIN_PASSWORD` in `.env.local`

### Adding New Pages

1. Create component in `Components/pages-content/`
2. Create route in `pages/`
3. Add navigation link in `Header.jsx`

### Adding New API Endpoints

1. Create file in `pages/api/`
2. Implement handler function
3. Add authentication middleware if needed

## 🎨 Customization

### Branding

Update the following:
- Site name in `Components/layout/Header.jsx`
- Logo and colors in `tailwind.config.js`
- Meta tags in page components
- Site settings via Admin Dashboard

### Styling

- Global styles: `styles/globals.css`
- Component styles: Tailwind utility classes
- Theme colors: `tailwind.config.js`

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

- **Netlify:** Connect GitHub repo and configure build settings
- **AWS:** Use Amplify or EC2
- **Docker:** Use the included Dockerfile (coming soon)

### Environment Variables for Production

Set these in your hosting platform:
- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use ESLint configuration
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Environment details

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Radix UI for accessible components
- Tailwind CSS for utility-first styling
- Prisma for database ORM
- Vercel for hosting platform

## 📞 Support

For support and queries:
- 📧 Email: info@angelsschool.co.in
- 📱 Phone: +91 90810 44496
- 🌐 Website: [https://angelsschool.co.in](https://angelsschool.co.in)
- 💬 Issues: [GitHub Issues](https://github.com/yourusername/angels-school/issues)

## 🗺️ Roadmap

- [ ] Student enrollment system
- [ ] Online payment integration
- [ ] Student dashboard with progress tracking
- [ ] Email notifications
- [ ] SMS integration
- [ ] Mobile app (React Native)
- [ ] Video lectures platform
- [ ] Online examination system
- [ ] Results management
- [ ] Fee management system
- [ ] Attendance tracking
- [ ] Parent portal
- [ ] Real-time chat support
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/angels-school)
![GitHub stars](https://img.shields.io/github/stars/yourusername/angels-school?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/angels-school?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/angels-school)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/angels-school)

---

Made with ❤️ by the Angels School Team
