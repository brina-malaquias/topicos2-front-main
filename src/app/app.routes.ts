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
import { CoilListComponent } from './components/coil/coil-list/coil-list.component';
import { CoilFormComponent } from './components/coil/coil-form/coil-form.component';
import { coilResolver } from './components/coil/resolver/coil-resolver';
import { NicSaltListComponent } from './components/nicSalt/nicSalt-list/nicSalt-list.component';
import { NicSaltFormComponent } from './components/nicSalt/nicSalt-form/nicSalt-form.component';
import { nicSalt } from './components/nicSalt/resolver/nicSalt-resolver';
import { PodDescartavelListComponent } from './components/pod-descartavel/podDescartavel-list/podDescartavel-list.component';
import { PodDescartavelFormComponent } from './components/pod-descartavel/podDescartavel-form/podDescartavel-form.component';
import { podDescartavelResolver } from './components/pod-descartavel/resolver/podDescartavel-resolver';
import { PuffListComponent } from './components/puff/puff-list/puff-list.component';
import { PuffFormComponent } from './components/puff/puff-form/puff-form.component';
import { puffResolver } from './components/puff/resolver/puff-resolver';
import { resistenciaResolver } from './components/resistencia/resolver/resistencia-resolver';
import { SaborListComponent } from './components/sabor/sabor-list/sabor-list.component';
import { SaborFormComponent } from './components/sabor/sabor-form/sabor-form.component';
import { saborResolver } from './components/sabor/resolver/sabor-resolver';
import { telefoneResolver } from './components/telefone/resolver/telefone-resolver';
import { telefoneListComponent } from './components/telefone/telefone-list/telefone-list.component';
import { TelefoneFormComponent } from './components/telefone/telefone-form/telefone-form.component';
import { ResistenciaListComponent } from './components/resistencia/resistencia-list/resistencia-list.component';
import { ResistenciaFormComponent } from './components/resistencia/resistencia-form/resistencia-form.component';
import { usuarioResolver } from './components/usuario/resolver/usuario-resolver';

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

    { path: 'marcas', component: MarcaListComponent, title: 'Lista de Marcas'},
    { path: 'marcas/new', component: MarcaFormComponent, title: 'Nova Marca'},
    { path: 'marcas/edit/:id', component: MarcaFormComponent, resolve: {marca: marcaResolver}},

    { path: 'podsRecarregaveis', component: PodRecarregavelListComponent, title: 'Lista de Pod Recarregaveis'},
    { path: 'podsRecarregaveis/new', component: PodRecarregavelFormComponent, title: 'Nova Pod Recarregaveis'},
    { path: 'podsRecarregaveis/edit/:id', component: PodRecarregavelFormComponent, resolve: {podrecarregavel: podRecarregavelResolver}},

    { path: 'coils', component: CoilListComponent, title: 'Lista de Coils'},
    { path: 'coils/new', component: CoilFormComponent, title: 'Nova Coil'},
    { path: 'coils/edit/:id', component: CoilFormComponent, resolve: {coil: coilResolver}},

    { path: 'nicsalts', component: NicSaltListComponent, title: 'Lista de NicSalts'},
    { path: 'nicsalts/new', component: NicSaltFormComponent, title: 'Nova Nicsalt'},
    { path: 'nicsalts/edit/:id', component: NicSaltFormComponent, resolve: {nicsalt: nicSalt}},

    { path: 'podDescartaveis', component: PodDescartavelListComponent, title: 'Lista de Pod Descartaveis'},
    { path: 'podDescartaveis/new', component: PodDescartavelFormComponent, title: 'Novo Pod Descartavel'},
    { path: 'podDescartaveis/edit/:id', component: PodDescartavelFormComponent, resolve: {podDescartavel: podDescartavelResolver}},

    { path: 'puffs', component: PuffListComponent, title: 'Lista de Puffs'},
    { path: 'puffs/new', component: PuffFormComponent, title: 'Novo Puff'},
    { path: 'puffs/edit/:id', component: PuffFormComponent, resolve: {puff: puffResolver}},

    { path: 'resistencias', component: ResistenciaListComponent, title: 'Lista de Resistencias'},
    { path: 'resistencias/new', component: ResistenciaFormComponent, title: 'Nova Resistencia'},
    { path: 'resistencias/edit/:id', component: ResistenciaFormComponent, resolve: {resistencia: resistenciaResolver}},

    { path: 'sabores', component: SaborListComponent, title: 'Lista de Sabores'},
    { path: 'sabores/new', component: SaborFormComponent, title: 'Novo Sabor'},
    { path: 'sabores/edit/:id', component: SaborFormComponent, resolve: {sabor: saborResolver}},

    { path: 'telefones', component: telefoneListComponent, title: 'Lista de Telefones'},
    { path: 'telefones/new', component: TelefoneFormComponent, title: 'Novo Telefone'},
    { path: 'telefones/edit/:id', component: TelefoneFormComponent, resolve: {telefone: telefoneResolver}},

    { path: 'usuarios', component: NicSaltListComponent, title: 'Lista de Usuarios'},
    { path: 'usuarios/new', component: NicSaltFormComponent, title: 'Novo Usuario'},
    { path: 'usuarios/edit/:id', component: NicSaltFormComponent, resolve: {usuario: usuarioResolver}},
];
