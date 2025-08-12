import {Injectable, CanActivate, ExecutionContext, ForbiddenException} from '@nestjs/common';

@Injectable()
export class DeleteUserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Asumiendo que el usuario está en la solicitud
        const targetUserId = request.params.id; // ID del usuario objetivo a eliminar

        if (!user) {
        throw new ForbiddenException('User not authenticated');
        }
        const isAdmin = user.role === 'ADMIN'; // Verify if the user is an admin
        const isSelfDeletion = user.id === targetUserId; //verify if the user is trying to delete their own account
        if (isAdmin || isSelfDeletion) {
            return true; // Allow deletion if the user is an admin or deleting their own account
        }
        throw new ForbiddenException('You do not have permission to delete users');
    }
}