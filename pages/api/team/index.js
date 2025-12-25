import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

// Increase body size limit for image uploads
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

// GET all team members or POST new team member
async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { type } = req.query;

            const where = {
                ...(type ? { type } : {}),
            };

            const members = await prisma.teamMember.findMany({
                where,
                orderBy: [
                    { type: 'asc' },
                    { displayOrder: 'asc' },
                    { createdAt: 'asc' },
                ],
            });

            return res.status(200).json(members);
        } catch (error) {
            console.error('Get team members error:', error);
            return res.status(500).json({ error: 'Failed to fetch team members' });
        }
    }

    if (req.method === 'POST') {
        return requireRole('admin', async (req, res) => {
            try {
                const { name, role, subtitle, image, type, displayOrder, isActive } = req.body;

                // Validation
                if (!name || !role || !type) {
                    return res.status(400).json({
                        success: false,
                        message: 'Name, role, and type are required',
                    });
                }

                // Validate type
                if (!['principal', 'trustee'].includes(type)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Type must be "principal" or "trustee"',
                    });
                }

                const member = await prisma.teamMember.create({
                    data: {
                        name,
                        role,
                        subtitle: subtitle || null,
                        image: image || null,
                        type,
                        displayOrder: displayOrder || 0,
                        isActive: isActive !== undefined ? isActive : true,
                    },
                });

                return res.status(201).json({
                    success: true,
                    message: 'Team member added successfully',
                    member,
                });
            } catch (error) {
                console.error('Create team member error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to add team member',
                });
            }
        })(req, res);
    }

    return res.status(405).json({
        success: false,
        message: 'Method not allowed',
    });
}

// Protect POST with admin auth, allow GET for public
export default function (req, res) {
    if (req.method === 'GET') {
        return handler(req, res);
    }
    return handler(req, res);
}
