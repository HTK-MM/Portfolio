import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, HomeComponent, AboutComponent, SkillsComponent, ProjectsComponent, ContactComponent, TranslateModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements OnInit {

  private translateService = inject(TranslateService);
  ngOnInit(): void {

  }

}
