import prisma from "@/prisma/client";

export default async function Delete(id: string){
    if (!id) return;
try {
          const response = await prisma.user.delete({
            where:{ id: id}
          })
          if (!response) throw new Error('Failed to delete user');
          
          window.location.reload();
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    
