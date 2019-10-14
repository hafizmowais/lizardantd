import TableHoverOptions from './tables/TableHoverOptions';
import LizardReduxFormBuilder, {render, renderUpload, getOptions, renderNLCurrency} from './forms/ReduxForm';
import {required, maxLength70, maxLength250, requiredIfNoEmail, url, email, phoneNumber, completeCity, requiredIfNoLink} from './forms/components/validate';
import {NLCurrencyParse, NLCurrencyFormater} from './common/inputFormater';
// import {sendEmail} from './common/email';

module.exports = {
  TableHoverOptions,
  LizardReduxFormBuilder,
  // sendEmail,
  LizardReduxForm: {
    render,
    renderNLCurrency,
    renderUpload,
    getOptions,
    NLCurrencyParse,
    NLCurrencyFormater,
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
