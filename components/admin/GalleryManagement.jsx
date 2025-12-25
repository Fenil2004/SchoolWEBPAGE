import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Image as ImageIcon, Loader2, Upload, Link as LinkIcon } from 'lucide-react';

export default function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [imageSource, setImageSource] = useState('url'); // 'url' or 'upload'
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'campus',
    imageUrl: '',
    isActive: true
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setImages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch images:', error);
      alert('Failed to load gallery images');
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('Please login to continue');
      return;
    }

    try {
      let imageUrl = formData.imageUrl;

      // If uploading a file, validate and convert to base64
      if (imageSource === 'upload' && imageFile) {
        // Validate file size (2MB max to prevent payload errors)
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (imageFile.size > maxSize) {
          alert(`Image is too large (${(imageFile.size / (1024 * 1024)).toFixed(2)}MB). Maximum size is 2MB. Please compress or resize the image before uploading.`);
          return;
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(imageFile.type)) {
          alert(`Invalid file type: ${imageFile.type}. Please use JPG, PNG, or WebP format.`);
          return;
        }

        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(imageFile);
        });
      }

      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          ...formData,
          imageUrl
        })
      });

      if (response.ok) {
        alert('Image added successfully!');
        resetForm();
        fetchImages();
      } else {
        const error = await response.json();
        const errorMsg = error.message || error.error || 'Failed to add image';
        console.error('API Error Response:', error);
        alert(`Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Failed to add image:', error);
      if (error.message && error.message.includes('JSON')) {
        alert('Failed to add image: Image file is too large. Please use a smaller image (max 2MB) or compress it.');
      } else {
        alert(`Failed to add image: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('Please login to continue');
      return;
    }

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        alert('Image deleted successfully!');
        fetchImages();
      } else {
        const error = await response.json();
        alert(error.message || error.error || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
      alert('Failed to delete image');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'campus',
      imageUrl: '',
      isActive: true
    });
    setImageSource('url');
    setImageFile(null);
    setIsAdding(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Image</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter image title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="campus">Campus</option>
                  <option value="facilities">Facilities</option>
                  <option value="students">Students</option>
                  <option value="events">Events</option>
                  <option value="achievements">Achievements</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <Label>Image Source</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="url"
                      checked={imageSource === 'url'}
                      onChange={(e) => setImageSource(e.target.value)}
                      className="w-4 h-4"
                    />
                    <LinkIcon className="w-4 h-4" />
                    <span>Image URL</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="upload"
                      checked={imageSource === 'upload'}
                      onChange={(e) => setImageSource(e.target.value)}
                      className="w-4 h-4"
                    />
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                  </label>
                </div>
              </div>

              {imageSource === 'url' ? (
                <div>
                  <Label htmlFor="imageUrl">Image URL *</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Enter image URL"
                    required={imageSource === 'url'}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter full image URL (e.g., https://example.com/image.jpg)
                  </p>
                </div>
              ) : (
                <div>
                  <Label htmlFor="imageFile">Upload Image *</Label>
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    required={imageSource === 'upload'}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Select an image file (JPG, PNG, WebP). Min size: 1200x800px, Max size: 2MB
                  </p>
                  {imageFile && (
                    <p className="text-xs text-green-600 mt-1">
                      Selected: {imageFile.name}
                    </p>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="isActive">Active (visible on website)</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Save Image</Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {images.length === 0 ? (
          <Card className="col-span-3">
            <CardContent className="py-8 text-center text-gray-500">
              No images found. Click "Add Image" to upload one.
            </CardContent>
          </Card>
        ) : (
          images.map((image) => (
            <Card key={image.id}>
              <CardContent className="pt-6">
                <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  {image.imageUrl ? (
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <h3 className="font-semibold mb-1">{image.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-sm text-gray-500 capitalize">{image.category}</p>
                  {!image.isActive && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Inactive</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(image.id)}
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
