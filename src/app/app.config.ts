import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DatePipe } from '@angular/common';
import { IgxComboModule, IgxButtonModule,
	       IgxIconModule,
	       IgxCardModule,
	       IgxRippleModule } from 'igniteui-angular'; // Importa el módulo aquí
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(), provideAnimationsAsync(), 
    IgxButtonModule,
	IgxIconModule,
	IgxCardModule,
	IgxRippleModule, 
    IgxComboModule, 
	IgxIconModule,
  	DatePipe, BrowserAnimationsModule, BrowserModule]
};
