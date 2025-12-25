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

// GET, PUT, or DELETE a specific team member
async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const member = await prisma.teamMember.findUnique({
                where: { id },
            });

            if (!member) {
                return res.status(404).json({ error: 'Team member not found' });
            }

            return res.status(200).json(member);
        } catch (error) {
            console.error('Get team member error:', error);
            return res.status(500).json({ error: 'Failed to fetch team member' });
        }
    }

    if (req.method === 'PUT') {
        return requireRole('admin', async (req, res) => {
            try {
                const { name, role, subtitle, image, type, displayOrder, isActive } = req.body;

                // Check if member exists
                const existingMember = await prisma.teamMember.findUnique({
                    where: { id },
                });

                if (!existingMember) {
                    return res.status(404).json({
                        success: false,
                        message: 'Team member not found',
                    });
                }

                const member = await prisma.teamMember.update({
                    where: { id },
                    data: {
                        ...(name && { name }),
                        ...(role && { role }),
                        ...(subtitle !== undefined && { subtitle }),
                        ...(image !== undefined && { image }),
                        ...(type && { type }),
                        ...(displayOrder !== undefined && { displayOrder }),
                        ...(isActive !== undefined && { isActive }),
                    },
                });

                return res.status(200).json({
                    success: true,
                    message: 'Team member updated successfully',
                    member,
                });
            } catch (error) {
                console.error('Update team member error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to update team member',
                });
            }
        })(req, res);
    }

    if (req.method === 'DELETE') {
        return requireRole('admin', async (req, res) => {
            try {
                // Check if member exists
                const existingMember = await prisma.teamMember.findUnique({
                    where: { id },
                });

                if (!existingMember) {
                    return res.status(404).json({
                        success: false,
                        message: 'Team member not found',
                    });
                }

                await prisma.teamMember.delete({
                    where: { id },
                });

                return res.status(200).json({
                    success: true,
                    message: 'Team member deleted successfully',
                });
            } catch (error) {
                console.error('Delete team member error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to delete team member',
                });
            }
        })(req, res);
    }

    return res.status(405).json({
        success: false,
        message: 'Method not allowed',
    });
}

export default handler;
