import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';


export const routes: Routes = [
    { path: '', component: MainContentComponent },
    { path: 'privacypolicy', component: PrivacyPolicyComponent },
    { path: 'legalnotice', component: LegalNoticeComponent},

];
