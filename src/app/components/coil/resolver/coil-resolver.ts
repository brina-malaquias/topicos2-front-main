import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Coil } from "../../../models/coil.models";
import { CoilService } from "../../../services/coil.service";

export const coilResolver: ResolveFn<Coil> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CoilService).findById(route.paramMap.get('id')!);
    }