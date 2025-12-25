import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Users, Loader2, Upload, Link as LinkIcon } from 'lucide-react';

export default function TeamManagement() {
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [imageSource, setImageSource] = useState('url');
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        subtitle: '',
        image: '',
        type: 'principal',
        displayOrder: 0,
        isActive: true,
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch('/api/team');
            const data = await response.json();
            setMembers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch team members:', error);
            setMembers([]);
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
            let imageUrl = formData.image;

            // Handle image upload
            if (imageSource === 'upload' && imageFile) {
                const maxSize = 2 * 1024 * 1024;
                if (imageFile.size > maxSize) {
                    alert(`Image is too large (${(imageFile.size / (1024 * 1024)).toFixed(2)}MB). Maximum size is 2MB.`);
                    return;
                }

                const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                if (!validTypes.includes(imageFile.type)) {
                    alert(`Invalid file type. Please use JPG, PNG, or WebP format.`);
                    return;
                }

                const reader = new FileReader();
                imageUrl = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject(new Error('Failed to read file'));
                    reader.readAsDataURL(imageFile);
                });
            }

            const url = editingId ? `/api/team/${editingId}` : '/api/team';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    ...formData,
                    image: imageUrl,
                }),
            });

            if (response.ok) {
                alert(editingId ? 'Team member updated!' : 'Team member added!');
                resetForm();
                fetchMembers();
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to save team member');
            }
        } catch (error) {
            console.error('Failed to save team member:', error);
            alert('Failed to save team member');
        }
    };

    const handleEdit = (member) => {
        setFormData({
            name: member.name || '',
            role: member.role || '',
            subtitle: member.subtitle || '',
            image: member.image || '',
            type: member.type || 'principal',
            displayOrder: member.displayOrder || 0,
            isActive: member.isActive !== false,
        });
        setImageSource('url');
        setImageFile(null);
        setEditingId(member.id);
        setIsAdding(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            alert('Please login to continue');
            return;
        }

        try {
            const response = await fetch(`/api/team/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                alert('Team member deleted!');
                fetchMembers();
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to delete team member');
            }
        } catch (error) {
            console.error('Failed to delete team member:', error);
            alert('Failed to delete team member');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            role: '',
            subtitle: '',
            image: '',
            type: 'principal',
            displayOrder: 0,
            isActive: true,
        });
        setImageSource('url');
        setImageFile(null);
        setEditingId(null);
        setIsAdding(false);
    };

    const principals = members.filter(m => m.type === 'principal');
    const trustees = members.filter(m => m.type === 'trustee');

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
                <h2 className="text-2xl font-bold">Team Management</h2>
                <Button onClick={() => setIsAdding(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                </Button>
            </div>

            {isAdding && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingId ? 'Edit Team Member' : 'Add New Team Member'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="role">Role *</Label>
                                    <Input
                                        id="role"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        placeholder="e.g., Principal, Trustee"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="type">Type *</Label>
                                    <select
                                        id="type"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full border rounded-md p-2"
                                        required
                                    >
                                        <option value="principal">Principal (Leadership Team)</option>
                                        <option value="trustee">Trustee</option>
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="subtitle">Subtitle (Optional)</Label>
                                    <Input
                                        id="subtitle"
                                        value={formData.subtitle}
                                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                        placeholder="e.g., Academics, M.Sc Chemistry"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Profile Image</Label>
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
                                    <Input
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="Enter image URL"
                                    />
                                ) : (
                                    <div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                            className="cursor-pointer"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Square image recommended (350×350px). Max 2MB.
                                        </p>
                                        {imageFile && (
                                            <p className="text-xs text-green-600 mt-1">
                                                Selected: {imageFile.name}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="displayOrder">Display Order</Label>
                                    <Input
                                        id="displayOrder"
                                        type="number"
                                        value={formData.displayOrder}
                                        onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                                        placeholder="0"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                                </div>
                                <div className="flex items-center gap-2 pt-6">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                    <Label htmlFor="isActive">Active (visible on website)</Label>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit">{editingId ? 'Update Member' : 'Add Member'}</Button>
                                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Principals Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-[#056C8C]">
                    Leadership Team (Principals) - {principals.length} members
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {principals.length === 0 ? (
                        <Card className="col-span-3">
                            <CardContent className="py-8 text-center text-gray-500">
                                No principals added yet. Click "Add Member" and select type "Principal".
                            </CardContent>
                        </Card>
                    ) : (
                        principals.map((member) => (
                            <Card key={member.id}>
                                <CardContent className="pt-6">
                                    <div className="aspect-square w-32 mx-auto bg-gray-200 rounded-lg mb-4 overflow-hidden">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Users className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-center mb-4">
                                        <h4 className="font-bold text-[#056C8C]">{member.role}</h4>
                                        <p className="text-gray-700">{member.name}</p>
                                        {member.subtitle && <p className="text-gray-500 text-sm">{member.subtitle}</p>}
                                        {!member.isActive && (
                                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded mt-2 inline-block">Inactive</span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(member)} className="flex-1">
                                            <Edit className="w-4 h-4 mr-1" /> Edit
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(member.id)} className="flex-1">
                                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>

            {/* Trustees Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-[#056C8C]">
                    Trustees - {trustees.length} members
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                    {trustees.length === 0 ? (
                        <Card className="col-span-4">
                            <CardContent className="py-8 text-center text-gray-500">
                                No trustees added yet. Click "Add Member" and select type "Trustee".
                            </CardContent>
                        </Card>
                    ) : (
                        trustees.map((member) => (
                            <Card key={member.id}>
                                <CardContent className="pt-6">
                                    <div className="aspect-square w-24 mx-auto bg-gray-200 rounded-lg mb-3 overflow-hidden">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Users className="w-8 h-8 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-center mb-3">
                                        <h4 className="font-bold text-[#056C8C] text-sm">{member.name}</h4>
                                        <p className="text-gray-500 text-xs">{member.role}</p>
                                        {!member.isActive && (
                                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded mt-1 inline-block">Inactive</span>
                                        )}
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(member)} className="flex-1 text-xs">
                                            <Edit className="w-3 h-3" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(member.id)} className="flex-1 text-xs">
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
