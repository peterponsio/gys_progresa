import { getAuth } from 'firebase/auth';
import { Auth, provideAuth } from '@angular/fire/auth';
import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

//plugins
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FilterSearchPipe } from './pipes/filter-search.pipe';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';

import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';

import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';



//Translate 

//  import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
//  import {TranslateHttpLoader} from '@ngx-translate/http-loader';
//  import { TranslateServiceConfig } from './services/translate.service';

//  export function createTranslateLoader(http: HttpClient) {
//    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
//  }

@NgModule({
  declarations: [AppComponent],
  entryComponents: [], 
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,   
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule, 
    HttpClientModule, 
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    Keyboard,
    Chooser,
    CallNumber,
    SocialSharing
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
