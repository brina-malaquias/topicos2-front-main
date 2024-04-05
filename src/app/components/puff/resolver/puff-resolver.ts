import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { PuffService } from "../../../services/puff.service";
import { Puff } from "../../../models/puff.model";

export const puffResolver: ResolveFn<Puff> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(PuffService).findById(route.paramMap.get('id')!);
    }