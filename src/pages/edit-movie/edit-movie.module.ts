import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMoviePage } from './edit-movie';

@NgModule({
  declarations: [
    EditMoviePage,
  ],
  imports: [
    IonicPageModule.forChild(EditMoviePage),
  ],
})
export class EditMoviePageModule {}
