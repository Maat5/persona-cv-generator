# Persona - Free CV Builder 📄

Create a professional resume in minutes with Persona - a free, privacy-focused CV builder. No sign-up required, all data stays in your browser.

[![Deploy to GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://maat5.github.io)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 **Live Preview** - See your resume update in real-time as you type
- 🖨️ **Print to PDF** - Export your resume using your browser's print function
- 🔒 **Privacy First** - All data is stored locally in your browser
- 🚀 **No Sign-up** - Start building immediately, no account required
- 💾 **Auto-save** - Your work is automatically saved as you type
- 📱 **Responsive** - Works on all devices
- 🎯 **Professional Design** - Clean, modern resume template

## 🚀 Quick Start

Visit [https://maat5.github.io](https://maat5.github.io) and start building your resume!

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Build for GitHub Pages
npm run build:gh-pages
```

## 🏗️ Built With

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **CSS Modules** - Scoped styling
- **DM Sans Font** - Clean, professional typography

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── editor/                   # Resume editor page
│   │   ├── components/           # Editor-specific components
│   │   │   ├── CoursesSection.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── LanguagesSection.tsx
│   │   │   ├── PersonalInfoSection.tsx
│   │   │   ├── PreviewPanel.tsx
│   │   │   ├── ProgressCard.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   └── TopNavigationBar.tsx
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── useResumeData.ts
│   │   │   └── useResumeStrength.ts
│   │   └── page.tsx              # Editor page component
│   ├── print/                    # Print/preview page
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout with SEO metadata
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── robots.ts                 # Robots.txt configuration
│   └── icon.svg                  # App icon/favicon
├── components/                   # Shared components
│   ├── icons/                    # Reusable icon components
│   ├── ContactInfo/
│   ├── Container/
│   ├── Experience/
│   ├── Footer/
│   ├── Heading/
│   ├── knowledgeAndTools/
│   ├── Skill/
│   ├── UserInfo/
│   └── StructuredData.tsx        # SEO structured data
└── utils/                        # Utility functions
```

## 🔍 SEO Features

This project is optimized for search engines with:

- ✅ Comprehensive meta tags (title, description, keywords)
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card support
- ✅ JSON-LD structured data (WebApplication schema)
- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ PWA manifest
- ✅ Semantic HTML structure
- ✅ Fast loading times with Next.js optimization

## 📊 SEO Keywords

Primary keywords: cv builder, resume builder, free cv maker, online resume, professional resume

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📝 License

This project is open source and available under the MIT License.

## ☕ Support

If you find this tool helpful, consider [buying me a coffee](https://buymeacoffee.com)!

## 🔗 Links

- **Live Demo**: [https://maat5.github.io](https://maat5.github.io)
- **GitHub**: [https://github.com/Maat5](https://github.com/Maat5)

---

Made with ❤️ by [Maat5](https://github.com/Maat5)

