import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Telefone } from "../../../models/telefone.model";
import { TelefoneService } from "../../../services/telefone.service";
import { inject } from "@angular/core";

export const telefoneResolver: ResolveFn<Telefone> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(TelefoneService).findById(route.paramMap.get('id')!);
    }