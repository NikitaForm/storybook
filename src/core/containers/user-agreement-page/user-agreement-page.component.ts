import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as dataContracts from '../../services/operator/contracts/operator';
import * as models from '../../models';
import * as services from '../../services';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'user-agreement-page',
  templateUrl: './user-agreement-page.component.html'
})
export class UserAgreementPageComponent implements OnInit {
  agreement: models.UserAgreement;
  form: FormGroup;
  private returnUrl: string;
  // validationMessages: any;

  constructor(@Inject(dataContracts.SERVICE_TOKEN)
  private operatorService: dataContracts.IOperatorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.agreement = this.route.snapshot.data['userAgreement'];

    this.form = this.formBuilder.group({
      agreementConfirmation: [false, Validators.pattern('true')]
    });

    // this.validationMessages = {
    //   'agreementConfirmation': {
    //     'pattern': 'You should accept the agreement'
    //   },
    // };
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['return-url'] || '/';
  }

  async submit(): Promise<any> {
    if (!this.form.valid === true) {
      return;
    }

    const request = new dataContracts.AcceptUserAgreementRequest();
    request.agreementAcceptUrl = this.agreement.actionUri;

    const response = await this.operatorService.acceptUserAgreement(request).toPromise();

    // TODO: check if accepted successfully before navigate

    this.router.navigateByUrl(this.returnUrl);
  }
}
