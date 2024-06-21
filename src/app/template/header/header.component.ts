import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";
import {Usuario} from "../../models/usuario.models";
import {AuthService} from "../../services/auth.service";
import {CarrinhoService} from "../../services/carrinho.service";
import {MatBadgeModule} from "@angular/material/badge";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatInputModule, MatIconModule,
            MatButtonModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  qtdItensCarrinho: number = 0;
  isAdminRoute: boolean = true;
  filtro: string = "";
  isAdmin: boolean = false;
  usuarioLogado: Usuario | null = null;
  private subscription = new Subscription();

  constructor( private carrinhoService: CarrinhoService,
              private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.isAdminRoute = (event.url.includes('/admin'));
      });
    this.obterQtdItensCarrinho();
    this.getUserLoggerIn();
    this.isAdmin = this.authService.isUserAdmin();
  }

  obterQtdItensCarrinho() {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.qtdItensCarrinho = itens.reduce((total, item) => total + item.quantidade, 0);
    });
  }

  getUserLoggerIn() {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));
  }

  navigateToHome() {
    this.router.navigate(['/compras/home']);
  }

  logout(){
    this.removerInformacoesLogado();
    this.router.navigateByUrl('/login');
  }

  removerInformacoesLogado(){

    this.authService.removeToken();
    this.authService.removeUsuarioLogado();
  }


}
