import {Injectable, CanActivate, ExecutionContext, ForbiddenException} from '@nestjs/common';

@Injectable()
export class DeleteUserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Asumiendo que el usuario está en la solicitud

        if (user && user.role === 'ADMIN' || user.id === request.params.id) {
        return true; // Permitir acceso si el usuario es un administrador
        }

        throw new ForbiddenException('You do not have permission to delete users');
    }
}