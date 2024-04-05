import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { PodDescartavel } from "../../../models/podDescartavel.model";
import { PodDescartavelService } from "../../../services/podDescartavel.service";

export const podDescartavelResolver: ResolveFn<PodDescartavel> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(PodDescartavelService).findById(route.paramMap.get('id')!);
    }