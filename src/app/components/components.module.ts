import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { SlideshowCutComponent } from './slideshow-cut/slideshow-cut.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ActorComponent } from './actor/actor.component';
import { FechascutPage } from 'src/app/fechascut/fechascut.page';
@NgModule({
  entryComponents: [
    DetalleComponent,
    ActorComponent,
    FechascutPage

  ],
  declarations: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    SlideshowCutComponent,
    DetalleComponent,
    ActorComponent,
    FechascutPage
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    SlideshowCutComponent,
    DetalleComponent,
    ActorComponent,
    FechascutPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
