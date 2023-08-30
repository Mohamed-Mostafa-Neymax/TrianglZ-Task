import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const loginGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('token');
    const router = inject(Router);
    if( !token ) 
        return true;
    else {
        router.navigate(['/books']);
        return false;
    }
}