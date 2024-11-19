import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit{

  constructor(private route: ActivatedRoute) {}


  /**   * Listen for route fragments and scroll to the element with the corresponding id when the component is initialized.
   * This is used to create a smooth scrolling effect when navigating to a specific part of the privacy policy.   */
  ngOnInit(): void {   
    this.route.fragment.subscribe(fragment => {
      if (fragment) {        
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

}
