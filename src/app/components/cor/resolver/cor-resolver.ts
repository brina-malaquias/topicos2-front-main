import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Cor } from "../../../models/cor.model";
import { CorService } from "../../../services/cor.service";

export const corResolver: ResolveFn<Cor> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CorService).findById(route.paramMap.get('id')!);
    }