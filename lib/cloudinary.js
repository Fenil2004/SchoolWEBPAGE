import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

/**
 * Upload image to Cloudinary
 * @param {string} filePath - Local file path to upload
 * @param {string} folder - Cloudinary folder (e.g., 'gallery', 'courses', 'branches')
 * @param {object} options - Additional Cloudinary upload options
 * @returns {Promise<object>} Upload result with secure_url
 */
export async function uploadToCloudinary(filePath, folder = 'uploads', options = {}) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: `school/${folder}`, // Organize by school/category
            resource_type: 'auto',
            transformation: [
                { quality: 'auto:good' }, // Automatic quality optimization
                { fetch_format: 'auto' }, // Automatic format selection (WebP, etc.)
            ],
            ...options,
        });

        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
    }
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<object>} Deletion result
 */
export async function deleteFromCloudinary(publicId) {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return {
            success: result.result === 'ok',
            result: result.result,
        };
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error(`Failed to delete from Cloudinary: ${error.message}`);
    }
}

/**
 * Get optimized image URL with transformations
 * @param {string} publicId - Cloudinary public ID
 * @param {object} transformations - Transformation options
 * @returns {string} Transformed image URL
 */
export function getOptimizedImageUrl(publicId, transformations = {}) {
    return cloudinary.url(publicId, {
        secure: true,
        transformation: [
            { quality: 'auto:good' },
            { fetch_format: 'auto' },
            ...transformations,
        ],
    });
}

export default cloudinary;
