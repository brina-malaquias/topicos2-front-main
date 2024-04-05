import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { SaborService } from "../../../services/sabor.service";
import { Sabor } from "../../../models/sabor.model";

export const saborResolver: ResolveFn<Sabor> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(SaborService).findById(route.paramMap.get('id')!);
    }