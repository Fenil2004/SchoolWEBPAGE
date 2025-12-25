import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, BookOpen, Loader2, Upload, Link as LinkIcon } from 'lucide-react';

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageSource, setImageSource] = useState('url');
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    image: '',
    features: '',
    syllabus: '',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('Failed to fetch courses');
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      const features = formData.features.split(',').map(f => f.trim()).filter(f => f);

      let imageUrl = formData.image;

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

      const response = await fetch(
        editingId ? `/api/courses/${editingId}` : '/api/courses',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            image: imageUrl,
            features,
            price: 0,
            duration: 'N/A',
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message || 'Course saved successfully!');
        fetchCourses();
        resetForm();
      } else {
        const errorMsg = data.message || data.error || 'Failed to save course';
        console.error('API Error Response:', data);
        alert(`Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error saving course:', error);
      if (error.message && error.message.includes('JSON')) {
        alert('Failed to save course: Image file is too large. Please use a smaller image (max 2MB) or compress it.');
      } else {
        alert(`Failed to save course: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleEdit = (course) => {
    setFormData({
      name: course.name,
      slug: course.slug,
      description: course.description,
      category: course.category,
      image: course.image || '',
      features: course.features.join(', '),
      syllabus: course.syllabus || '',
    });
    setEditingId(course.id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        fetchCourses();
      } else {
        alert(data.message || 'Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      category: '',
      image: '',
      features: '',
      syllabus: '',
    });
    setImageSource('url');
    setImageFile(null);
    setIsAdding(false);
    setEditingId(null);
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Course' : 'Add New Course'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Course Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., NEET Preparation"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug * (URL-friendly)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    placeholder="e.g., neet-preparation"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Course Image</Label>
                <div className="flex gap-4 mt-2 mb-2">
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

                {imageSource === 'url' ? (
                  <div>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Enter image URL"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter full image URL (e.g., https://example.com/image.jpg)
                    </p>
                  </div>
                ) : (
                  <div>
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Select an image file (JPG, PNG, WebP). Min size: 800x600px, Max size: 2MB
                    </p>
                    {imageFile && (
                      <p className="text-xs text-green-600 mt-1">
                        Selected: {imageFile.name}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter course description"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., NEET, JEE"
                  required
                />
              </div>

              <div>
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Expert Faculty, Study Material, Mock Tests"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="syllabus">Syllabus</Label>
                <Textarea
                  id="syllabus"
                  value={formData.syllabus}
                  onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                  placeholder="Enter course syllabus"
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">{editingId ? 'Update Course' : 'Create Course'}</Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {courses.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              No courses found. Click "Add Course" to create one.
            </CardContent>
          </Card>
        ) : (
          courses.map((course) => (
            <Card key={course.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{course.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>Category: {course.category}</span>
                      </div>
                      {course.features && course.features.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {course.features.map((feature, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(course)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(course.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
