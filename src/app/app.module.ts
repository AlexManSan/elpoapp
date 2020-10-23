import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { ComorbidadeService } from 'src/shared/services/ComorbidadeService.service';
import { HttpClientModule } from '@angular/common/http';
import { RecomendacaoPage } from './recomendacao/recomendacao.page';

@NgModule({
  //contém a lista de componentes ou páginas
  declarations: [
    AppComponent,
    RecomendacaoPage
  ],
  //tem que declarar também quando for uma página
  entryComponents: [
    AppComponent,
    RecomendacaoPage
  ],
  imports: [
    SharedModule,
    BrowserModule, 
    HttpClientModule, // tem que importar esse cara aqui pras requisições aceitarem
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  //são objetos injetados nesta classe que será uma instancia única para esse módulo 
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ComorbidadeService
  ],
  //indica como a aplicação vai iniciar
  bootstrap: [AppComponent]
})
//export significa que pode ser enxergado de outro lugar
export class AppModule {}
