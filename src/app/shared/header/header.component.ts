import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  active: boolean = false;
  menuOption: string = '';
  language: string = 'de';

  /**   * Called when the component is initialized.
   * Updates the active section of the navigation menu.   */
  ngOnInit(): void {
    this.updateActiveSection();
  }

  /**   * Sets the active section of the navigation menu to the given section.
   * If the mobile menu is currently open, it will be closed.
   * @param menuOption The section to set as active.   */
  onOption(menuOption: string) {
    this.menuOption = menuOption;
    if (this.active == true) {
      this.closeMenu();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateActiveSection();
  }

  /**   * Updates the active section of the navigation menu based on the current
   * scroll position. Scans the sections in order and sets the first one that
   * is currently visible to be the active section.   */
  updateActiveSection() {
    const sections = [
      { id: 'about', name: 'Why me' },
      { id: 'skills', name: 'Skills' },
      { id: 'projects', name: 'Projects' },
      { id: 'contact', name: 'Contact' }
    ];

    for (let section of sections) {
      const element = document.getElementById(section.id);
      if (element && this.isInViewport(element)) {
        this.menuOption = section.name;
        break;
      }
    }
  }

  /**   * Checks if the given element is currently visible in the viewport.
   * @param element The element to check.
   * @returns True if the element is visible, false otherwise.   */
  isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top + 200 <= (window.innerHeight || document.documentElement.clientHeight);
  }

  /**    * Scrolls to the section with the given name.
   * @param menuOption The name of the section to scroll to.    */
  scrollToSection(menuOption: string) {
    const element = document.getElementById(menuOption.toLowerCase().replace(/\s+/g, ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  /** * Toggles the visibility of the mobile menu. If the menu is currently open,
   * it will be closed, and vice versa. Logs the current state of the menu
   * (open or closed) to the console.   */
  closeMenu() {
    this.active = !this.active;
  }


  /**    * Opens the mobile menu. Sets the active flag to true.   */
  showMenu() {
    this.active = true;
  }


  @Output() languageChange = new EventEmitter<string>();

  /**   * Emits an event to the parent component with the given language,
   * and if the mobile menu is open, closes it.
   * @param language The language to switch to.   */
  changeLanguage(language: string) {
    this.languageChange.emit(language);
    if (this.active == true) {
      this.closeMenu();
    }
  }

}
