import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { NicSalt } from "../../../models/nicSalt.model";
import { NicSaltService } from "../../../services/nicSalt.service";

export const nicSalt: ResolveFn<NicSalt> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(NicSaltService).findById(route.paramMap.get('id')!);
    }