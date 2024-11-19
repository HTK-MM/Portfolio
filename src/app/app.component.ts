import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { MainContentComponent } from './main-content/main-content.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MainContentComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'Portfolio';
  lang = '';
  private translateService = inject(TranslateService);
  private _router = inject(Router);


/** * Initializes the component by setting the default language for translation.
 * It retrieves the language from localStorage, defaulting to 'de' if not found,
 * and applies it using the TranslateService. */
  ngOnInit(): void {
    const defaultLanguage = localStorage.getItem('language') || 'de';
    this.translateService.setDefaultLang(defaultLanguage);
    this.translateService.use(defaultLanguage);
  }

  /**   * Called when the language in the header component changes.
   * Sets the {@link lang} property to the new language and updates
   * the translation service.
   * @param language The new language, either 'de' or 'en'.   */
  onLanguageChange(language: string) {
    this.lang = language;    
    this.translateService.use(language);
  }
  navigate(route: string) {    
    this._router.navigate(['/' + route]);
  }

}
