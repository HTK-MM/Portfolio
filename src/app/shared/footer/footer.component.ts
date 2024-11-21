import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private menuService: MenuService) {}

  @Output() sendRoute = new EventEmitter<string>();

  /**   * Send the route to the parent component through the sendRoute event emitter.
   * @param route the route to send.   */
  sendLink(route: string) { 
    this.sendRoute.emit(route);
    this.onLinkClick();
  }

  onLinkClick(){
    this.menuService.resetMenu();
  }

}
