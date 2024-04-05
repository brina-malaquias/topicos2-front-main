import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { ResistenciaService } from "../../../services/resistencia.service";
import { Resistencia } from "../../../models/resistencia";

export const resistenciaResolver: ResolveFn<Resistencia> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(ResistenciaService).findById(route.paramMap.get('id')!);
    }