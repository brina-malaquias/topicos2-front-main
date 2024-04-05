import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { PodRecarregavel } from "../../../models/podRecarregavel.model";
import { PodRecarregavelService } from "../../../services/podRecarregavel.service";

export const podRecarregavelResolver: ResolveFn<PodRecarregavel> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(PodRecarregavelService).findById(route.paramMap.get('id')!);
    }