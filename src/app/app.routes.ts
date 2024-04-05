import { Routes } from '@angular/router';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { estadoResolver } from './components/estado/resolver/estado-resolver';
import { MunicipioListComponent } from './components/municipio/municipio-list/municipio-list.component';
import { MunicipioFormComponent } from './components/municipio/municipio-form/municipio-form.component';
import { municipioResolver } from './components/municipio/resolver/municipio-resolver';
import { CorListComponent } from './components/cor/cor-list/cor-list.component';
import { CorFormComponent } from './components/cor/cor-form/cor-form.component';
import { corResolver } from './components/cor/resolver/cor-resolver';
import { MarcaListComponent } from './components/marca/marca-list/marca-list.component';
import { MarcaFormComponent } from './components/marca/marca-form/marca-form.component';
import { marcaResolver } from './components/marca/resolver/marca-resolver';
import { PodRecarregavelListComponent } from './components/pod-recarregavel/podRecarregavel-list/podrecarregavel-list.component';
import { PodRecarregavelFormComponent } from './components/pod-recarregavel/podRecarregavel-form/podrecarregavel-form.component';
import { podRecarregavelResolver } from './components/pod-recarregavel/resolver/podrecarregavel-resolver';

export const routes: Routes = [
    { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},
    { path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado'},
    { path: 'estados/edit/:id', component: EstadoFormComponent, resolve: {estado: estadoResolver}},

    { path: 'municipios', component: MunicipioListComponent, title: 'Lista de Municipios'},
    { path: 'municipios/new', component: MunicipioFormComponent, title: 'Novo Municipio'},
    { path: 'municipios/edit/:id', component: MunicipioFormComponent, resolve: {municipio: municipioResolver}},

    { path: 'cores', component: CorListComponent, title: 'Lista de Cores'},
    { path: 'cores/new', component: CorFormComponent, title: 'Nova Cor'},
    { path: 'cores/edit/:id', component: CorFormComponent, resolve: {cor: corResolver}},

    { path: 'marcas', component: MarcaListComponent, title: 'Lista de Cores'},
    { path: 'marcas/new', component: MarcaFormComponent, title: 'Nova Cor'},
    { path: 'marcas/edit/:id', component: MarcaFormComponent, resolve: {marca: marcaResolver}},

    { path: 'podrecarregaveis', component: PodRecarregavelListComponent, title: 'Lista de Cores'},
    { path: 'podrecarregaveis/new', component: PodRecarregavelFormComponent, title: 'Nova Cor'},
    { path: 'podrecarregaveis/edit/:id', component: PodRecarregavelFormComponent, resolve: {podrecarregavel: podRecarregavelResolver}},
];
