import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { MarcaService } from "../../../services/marca.service";
import { Marca } from "../../../models/marca.model";

export const marcaResolver: ResolveFn<Marca> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(MarcaService).findById(route.paramMap.get('id')!);
    }