import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Coil } from "../../../models/coil.model";
import { CoilService } from "../../../services/coil.service";

export const coil: ResolveFn<Coil> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CoilService).findById(route.paramMap.get('id')!);
    }