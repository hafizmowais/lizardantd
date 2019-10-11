import TableHoverOptions from './tables/TableHoverOptions';
import LizardReduxFormBuilder, {render, renderUpload, getOptions} from './forms/ReduxForm';
import {required, maxLength70, maxLength250, requiredIfNoEmail, url, email, phoneNumber, completeCity, requiredIfNoLink} from './forms/components/validate';
// import {sendEmail} from './common/email';

module.exports = {
  TableHoverOptions,
  LizardReduxFormBuilder,
  // sendEmail,
  LizardReduxForm: {
    render,
    renderUpload,
    getOptions,
    validate:{
      required,
      maxLength250,
      maxLength70,
      requiredIfNoEmail,
      url,
      email,
      phoneNumber,
      completeCity,
      requiredIfNoLink
    }
  },
};
