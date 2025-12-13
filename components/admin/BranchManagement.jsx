import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, MapPin, Loader2, Upload, Link as LinkIcon } from 'lucide-react';

export default function BranchManagement() {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageSource, setImageSource] = useState('url');
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    image: '',
    locationType: 'coordinates',
    latitude: '',
    longitude: '',
    mapUrl: '',
    facilities: '',
    isHeadquarters: false
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch('/api/branches');
      const data = await response.json();
      setBranches(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch branches:', error);
      alert('Failed to load branches');
      setBranches([]);
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

    const branchData = {
      name: formData.name,
      slug: formData.slug,
      address: formData.address,
      city: formData.city,
      phone: formData.phone,
      email: formData.email,
      image: imageUrl,
      latitude: formData.locationType === 'coordinates' && formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.locationType === 'coordinates' && formData.longitude ? parseFloat(formData.longitude) : null,
      mapUrl: formData.locationType === 'mapUrl' ? formData.mapUrl : null,
      facilities: formData.facilities ? formData.facilities.split(',').map(f => f.trim()) : [],
      isHeadquarters: formData.isHeadquarters
    };

    try {
      const url = editingId ? `/api/branches/${editingId}` : '/api/branches';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(branchData)
      });

      if (response.ok) {
        alert(editingId ? 'Branch updated successfully!' : 'Branch created successfully!');
        resetForm();
        fetchBranches();
      } else {
        const error = await response.json();
        const errorMsg = error.message || error.error || 'Failed to save branch';
        console.error('API Error Response:', error);
        alert(`Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Failed to save branch:', error);
      if (error.message && error.message.includes('JSON')) {
        alert('Failed to save branch: Image file is too large. Please use a smaller image (max 2MB) or compress it.');
      } else {
        alert(`Failed to save branch: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleEdit = (branch) => {
    setFormData({
      name: branch.name,
      slug: branch.slug,
      address: branch.address || '',
      city: branch.city || '',
      phone: branch.phone || '',
      email: branch.email || '',
      image: branch.image || '',
      locationType: branch.mapUrl ? 'mapUrl' : 'coordinates',
      latitude: branch.latitude?.toString() || '',
      longitude: branch.longitude?.toString() || '',
      mapUrl: branch.mapUrl || '',
      facilities: branch.facilities?.join(', ') || '',
      isHeadquarters: branch.isHeadquarters || false
    });
    setEditingId(branch.id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this branch?')) return;

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('Please login to continue');
      return;
    }

    try {
      const response = await fetch(`/api/branches/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        alert('Branch deleted successfully!');
        fetchBranches();
      } else {
        const error = await response.json();
        alert(error.message || error.error || 'Failed to delete branch');
      }
    } catch (error) {
      console.error('Failed to delete branch:', error);
      alert('Failed to delete branch');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      address: '',
      city: '',
      phone: '',
      email: '',
      image: '',
      locationType: 'coordinates',
      latitude: '',
      longitude: '',
      mapUrl: '',
      facilities: '',
      isHeadquarters: false
    });
    setImageSource('url');
    setImageFile(null);
    setEditingId(null);
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
        <h2 className="text-2xl font-bold">Branch Management</h2>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Branch
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Branch' : 'Add New Branch'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Branch Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Rajkot"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug * (URL-friendly)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    placeholder="e.g., rajkot"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Branch Image</Label>
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
                      Select a branch image (JPG, PNG, WebP). Min size: 800x600px, Max size: 2MB
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
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g., Mumbai, Ahmedabad, Rajkot"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="branch@angelsschool.co.in"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Location Information</Label>
                <div className="flex gap-4 mt-2 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="coordinates"
                      checked={formData.locationType === 'coordinates'}
                      onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
                      className="w-4 h-4"
                    />
                    <MapPin className="w-4 h-4" />
                    <span>Latitude & Longitude</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="mapUrl"
                      checked={formData.locationType === 'mapUrl'}
                      onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
                      className="w-4 h-4"
                    />
                    <LinkIcon className="w-4 h-4" />
                    <span>Google Maps URL</span>
                  </label>
                </div>
                
                {formData.locationType === 'coordinates' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="any"
                        value={formData.latitude}
                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                        placeholder="e.g., 21.7645"
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="any"
                        value={formData.longitude}
                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                        placeholder="e.g., 72.1519"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="mapUrl">Google Maps URL</Label>
                    <Input
                      id="mapUrl"
                      value={formData.mapUrl}
                      onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                      placeholder="Paste Google Maps share link or embed URL"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Right-click on Google Maps, select 'Share' and paste the link here
                    </p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="facilities">Facilities (comma-separated)</Label>
                <Input
                  id="facilities"
                  value={formData.facilities}
                  onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
                  placeholder="Library, Computer Lab, AC Classrooms..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isHeadquarters"
                  checked={formData.isHeadquarters}
                  onChange={(e) => setFormData({ ...formData, isHeadquarters: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="isHeadquarters">Mark as Headquarters</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">{editingId ? 'Update Branch' : 'Create Branch'}</Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {branches.length === 0 ? (
          <Card className="col-span-2">
            <CardContent className="py-8 text-center text-gray-500">
              No branches found. Click "Add Branch" to create one.
            </CardContent>
          </Card>
        ) : (
          branches.map((branch) => (
            <Card key={branch.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">
                      {branch.name}
                      {branch.isHeadquarters && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">HQ</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{branch.address}</p>
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>Phone: {branch.phone}</p>
                      <p>Email: {branch.email}</p>
                    </div>
                    {branch.facilities && branch.facilities.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {branch.facilities.map((facility, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">
                            {facility}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(branch)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(branch.id)}>
                    <Trash2 className="w-4 h-4" />
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
