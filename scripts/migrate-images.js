// Load environment variables from .env file
require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verify credentials are loaded
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ ERROR: Cloudinary credentials not found in .env file!');
    console.error('Please make sure you have added:');
    console.error('  CLOUDINARY_CLOUD_NAME');
    console.error('  CLOUDINARY_API_KEY');
    console.error('  CLOUDINARY_API_SECRET');
    process.exit(1);
}

// Image folder mapping - maps filename to category
const imageMapping = {
    // Gallery images
    'gall1.avif': 'gallery',
    'gall2.avif': 'gallery',
    'gall3.avif': 'gallery',
    'gall4.avif': 'gallery',
    'gall5.avif': 'gallery',
    'gall6.avif': 'gallery',
    'gallery1.avif': 'gallery',
    'gallery2.avif': 'gallery',

    // Course images
    'course1.avif': 'courses',
    'course2.avif': 'courses',

    // Admin/About images
    'admin1.avif': 'about',
    'admin2.avif': 'about',
    'admin3.avif': 'about',
    'admin4.avif': 'about',

    // Publications
    'phy.avif': 'publications',
    'chem.avif': 'publications',
    'bio.avif': 'publications',

    // About section
    'as.avif': 'about',
};

async function uploadImages() {
    console.log('🚀 Starting image migration to Cloudinary...\n');

    const imageDir = path.join(__dirname, '../Image');
    const results = {
        success: [],
        failed: [],
    };

    // Get all files from Image directory
    const files = fs.readdirSync(imageDir);

    for (const file of files) {
        const filePath = path.join(imageDir, file);
        const category = imageMapping[file] || 'general';

        try {
            console.log(`📤 Uploading ${file} to category: ${category}...`);

            const result = await cloudinary.uploader.upload(filePath, {
                folder: `school/${category}`,
                public_id: path.parse(file).name, // Use filename without extension
                resource_type: 'auto',
                transformation: [
                    { quality: 'auto:good' },
                    { fetch_format: 'auto' },
                ],
            });

            results.success.push({
                file: file,
                url: result.secure_url,
                publicId: result.public_id,
                category: category,
            });

            console.log(`   ✅ Success: ${result.secure_url}\n`);

        } catch (error) {
            console.error(`   ❌ Failed: ${error.message}\n`);
            results.failed.push({
                file: file,
                error: error.message,
            });
        }
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully uploaded: ${results.success.length} images`);
    console.log(`❌ Failed: ${results.failed.length} images\n`);

    if (results.success.length > 0) {
        console.log('📋 Uploaded Images:');
        console.log('='.repeat(60));
        results.success.forEach(item => {
            console.log(`${item.file} → ${item.category}`);
            console.log(`   URL: ${item.url}`);
            console.log('');
        });
    }

    if (results.failed.length > 0) {
        console.log('⚠️  Failed Images:');
        console.log('='.repeat(60));
        results.failed.forEach(item => {
            console.log(`${item.file}: ${item.error}`);
        });
    }

    // Save results to file for reference
    const outputPath = path.join(__dirname, 'migration-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Results saved to: ${outputPath}`);

    console.log('\n✨ Migration complete!');
    console.log('Next steps:');
    console.log('1. Check your Cloudinary dashboard to see the uploaded images');
    console.log('2. Update your database records with the new URLs');
    console.log('3. Deploy to Netlify\n');
}

// Run the migration
uploadImages().catch(console.error);
