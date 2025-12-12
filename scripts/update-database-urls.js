// Load environment variables from .env file
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Read the migration results
const resultsPath = path.join(__dirname, 'migration-results.json');
const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

// Create a URL mapping from the uploaded results
const urlMapping = {};
results.success.forEach(item => {
    urlMapping[item.file.replace('.avif', '')] = item.url;
});

console.log('📋 Available URLs from Cloudinary:');
Object.entries(urlMapping).forEach(([key, url]) => {
    console.log(`  ${key}: ${url}`);
});
console.log('\n');

async function updateDatabaseRecords() {
    console.log('🚀 Updating database records with Cloudinary URLs...\n');

    try {
        // 1. Update existing Gallery records that don't have Cloudinary URLs
        console.log('📸 Checking Gallery records...');
        const galleryRecords = await prisma.galleryImage.findMany();
        let galleryUpdated = 0;

        for (const record of galleryRecords) {
            // Only update if the image URL is not a Cloudinary URL
            if (record.imageUrl && !record.imageUrl.includes('cloudinary.com')) {
                // Try to match with a gallery image
                const galleryOptions = [
                    urlMapping['gallery1'],
                    urlMapping['gallery2'],
                    urlMapping['gall1'],
                    urlMapping['gall2'],
                    urlMapping['gall3'],
                    urlMapping['gall4'],
                    urlMapping['gall5'],
                    urlMapping['gall6'],
                ];

                // Use a random gallery image as replacement
                const newUrl = galleryOptions[galleryUpdated % galleryOptions.length];

                if (newUrl) {
                    await prisma.galleryImage.update({
                        where: { id: record.id },
                        data: { imageUrl: newUrl },
                    });
                    console.log(`   ✅ Updated gallery: ${record.title || record.id}`);
                    galleryUpdated++;
                }
            }
        }
        console.log(`   Total gallery records updated: ${galleryUpdated}\n`);

        // 2. Update Course records that don't have Cloudinary URLs
        console.log('📚 Checking Course records...');
        const courseRecords = await prisma.course.findMany();
        let coursesUpdated = 0;

        for (const record of courseRecords) {
            if (!record.image || !record.image.includes('cloudinary.com')) {
                // Use course images
                const courseOptions = [urlMapping['course1'], urlMapping['course2']];
                const newUrl = courseOptions[coursesUpdated % courseOptions.length];

                if (newUrl) {
                    await prisma.course.update({
                        where: { id: record.id },
                        data: { image: newUrl },
                    });
                    console.log(`   ✅ Updated course: ${record.name}`);
                    coursesUpdated++;
                }
            }
        }
        console.log(`   Total course records updated: ${coursesUpdated}\n`);

        // 3. Update Branch records that don't have Cloudinary URLs
        console.log('🏢 Checking Branch records...');
        const branchRecords = await prisma.branch.findMany();
        let branchesUpdated = 0;

        for (const record of branchRecords) {
            if (!record.image || !record.image.includes('cloudinary.com')) {
                // Use gallery images for branches
                const branchOptions = [
                    urlMapping['gall6'],
                    urlMapping['gall1'],
                    urlMapping['gall2'],
                    urlMapping['gall3'],
                ];
                const newUrl = branchOptions[branchesUpdated % branchOptions.length];

                if (newUrl) {
                    await prisma.branch.update({
                        where: { id: record.id },
                        data: { image: newUrl },
                    });
                    console.log(`   ✅ Updated branch: ${record.name}`);
                    branchesUpdated++;
                }
            }
        }
        console.log(`   Total branch records updated: ${branchesUpdated}\n`);

        // 4. Update Hero content that doesn't have Cloudinary URLs
        console.log('🖼️ Checking Hero content...');
        const heroRecords = await prisma.heroContent.findMany();
        let heroUpdated = 0;

        for (const record of heroRecords) {
            if (!record.imageUrl || !record.imageUrl.includes('cloudinary.com')) {
                const newUrl = urlMapping['gallery1'] || urlMapping['gall6'];

                if (newUrl) {
                    await prisma.heroContent.update({
                        where: { id: record.id },
                        data: { imageUrl: newUrl },
                    });
                    console.log(`   ✅ Updated hero: ${record.title}`);
                    heroUpdated++;
                }
            }
        }
        console.log(`   Total hero records updated: ${heroUpdated}\n`);

        // 5. Update Testimonial records that don't have Cloudinary URLs
        console.log('💬 Checking Testimonial records...');
        const testimonialRecords = await prisma.testimonial.findMany();
        let testimonialsUpdated = 0;

        for (const record of testimonialRecords) {
            if (!record.image || !record.image.includes('cloudinary.com')) {
                // Use admin images for testimonials
                const testimonialOptions = [
                    urlMapping['admin1'],
                    urlMapping['admin2'],
                    urlMapping['admin3'],
                    urlMapping['admin4'],
                ];
                const newUrl = testimonialOptions[testimonialsUpdated % testimonialOptions.length];

                if (newUrl) {
                    await prisma.testimonial.update({
                        where: { id: record.id },
                        data: { image: newUrl },
                    });
                    console.log(`   ✅ Updated testimonial: ${record.name}`);
                    testimonialsUpdated++;
                }
            }
        }
        console.log(`   Total testimonial records updated: ${testimonialsUpdated}\n`);

        // Print summary
        console.log('='.repeat(60));
        console.log('📊 DATABASE UPDATE SUMMARY');
        console.log('='.repeat(60));
        console.log(`✅ Gallery images updated: ${galleryUpdated}`);
        console.log(`✅ Courses updated: ${coursesUpdated}`);
        console.log(`✅ Branches updated: ${branchesUpdated}`);
        console.log(`✅ Hero content updated: ${heroUpdated}`);
        console.log(`✅ Testimonials updated: ${testimonialsUpdated}`);
        console.log('='.repeat(60));
        console.log('\n✨ Database update complete!');

    } catch (error) {
        console.error('❌ Error updating database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the update
updateDatabaseRecords().catch(console.error);
