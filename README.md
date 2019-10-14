# lizardantdesign
[![Lizard Global](https://drive.google.com/uc?id=1VBhQROdv6FdNQvAdUh41p4aHtl4ih7U8)](https://lizard.global/about-us)

Create redux form with lizardantdesign – easy as cake! 🍰

## Example?

### Available validations

```
export const required = value => (value || typeof value === 'number' ? undefined : 'Required')

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

export const maxLength70 = maxLength(70)

export const maxLength250 = maxLength(250)

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const phoneNumber = value =>
  value && !/(\+*1-*)*\(*\d{3}\)*-*\d{3}-*\d{4}/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

export const completeCity = values => {
  if (values == null)
    return 'Select a city from the suggestions';
}

export const url = value =>
  value && !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(value)
    ? 'Invalid url'
    : undefined

export const requiredIfNoLink = (value, { website_link }) => {
  if (website_link != null && website_link.length > 0)
    return undefined;
  return value ? undefined : 'Email OR website link required';
}

export const requiredIfNoEmail = (value, { contact_email }) => {
  if (contact_email != null && contact_email.length > 0)
    return undefined;
  return value ? undefined : 'Website link OR email required';
}
```

```
import {LizardReduxForm} from 'lizardantdesign'
const {validate} = LizardReduxForm;

//use it anywhere with ease:

validate.required
validate.phoneNumber

```

### Home redux creation file

```
import './home.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {LizardReduxFormBuilder} from 'lizardantdesign'
import fieldConfig from './components/fieldconfig' //importing the file which create earlier
import { Card, Button } from 'antd'
import { Field, Fields, reduxForm } from 'redux-form'

function getField(props) {
  if (props.names) {
    return <Fields {...props} />
  }
  return <Field {...props} />
}

export class Home extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
      const {handleSubmit} = this.props;
    return (
        <div className="home">
          <Card>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <LizardReduxFormBuilder fieldsData={fieldConfig()} getField={getField} />
                <Button type="primary" htmlType="submit">Submit form</Button>
            </form>
          </Card>
        </div>

    )
    }
}

export default connect(null, null)((reduxForm({form: 'formExample'}))(Home))
```

### NL Currency formater has been added

```
import {LizardReduxForm} from 'lizardantdesign'
const {renderNLCurrency} = LizardReduxForm;

//this config field will do the trick for full example reffer to fieldConfig
{
  layout: { span: 24 },
  name: 'NL_Currency_Formater',
  label: 'NL Currency Formater',
  component: renderNLCurrency(), //this part will do the trick
  placeholder: 'Starting Salary',
}
```

### Field configuration with redux form complete example. Create a seperate file with the name you like

```
import React from 'react'
import {LizardReduxForm} from 'lizardantdesign'
import { Input, Checkbox, DatePicker, AutoComplete, Select, Upload } from 'antd'
import BraftEditor from 'braft-editor';
import moment from 'moment'
import 'braft-editor/dist/index.css'

const {render, renderUpload, validate, getOptions, renderNLCurrency} = LizardReduxForm;

export default function fieldConfig() {
  return [
    // ROW 1
    {
      layout: { sm: 24, md: 8 },
      name: 'title',
      label: 'Job title',
      placeholder: 'Type the title of your job offering here',
      component: render(Input),
      validate: [validate.required],
    },{
      layout: { sm: 24, md: 8 },
      name: 'keywords',
      label: 'Job function',
      className: 'form-item-select',
      placeholder: 'Function',
      component: render(AutoComplete),
      filterOption: (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) >= 0,
      dataSource: ['lorem', 'ipsum', 'dolor', 'sit', 'amet'],
      validate: [validate.required],
    }, {
      layout: { sm: 24, md: 8 },
      name: 'employment',
      label: 'Employment type',
      className: 'form-item-select',
      placeholder: 'Employment',
      component: render(AutoComplete),
      filterOption: (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) >= 0,
      dataSource: ['lorem', 'ipsum', 'dolor', 'sit', 'amet'],
      validate: [validate.required],
    },
    // ROW 2
    {
      layout: { sm: 24, md: 10 },
      name: 'industry',
      label: 'Industries',
      className: 'form-item-select',
      placeholder: 'Industries',
      component: render(Select),
      validate: [validate.required],
      format: (value) => {
        if (value != null) {
          return Array.isArray(value) ? value : [value];
        }
        return [];
      },
      mode: 'tags',
      maxTagCount: 2,
      filterOption: (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) >= 0,
      children: getOptions([
        {key: 'lorem', text: 'lorem' },
        {key: 'ipsum', text: 'ipsum' },
        {key: 'dolor', text: 'dolor' },
        {key: 'sit', text: 'sit' },
      ]),
    }, {
      layout: { sm: 24, md: 4 },
      name: 'startDate',
      label: 'Startdate of job',
      placeholder: 'date',
      format: (value) => moment((value && value.seconds * 1000) || Date.now()),
      normalize: (value) => value && value.valueOf() || '',
      component: render(DatePicker),
      validate: [validate.required],
    }, {
      layout: { sm: 24, md: 6 },
      name: 'salary_tier',
      label: 'Salary Tier',
      className: 'form-item-select',
      placeholder: 'Select',
      component: render(Select),
      filterOption: (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) >= 0,
      children: getOptions([
        {key: 1, text: 'less than 2000' },
        {key: 2, text: '2000 < ... < 3000' },
        {key: 3, text: '3000 < ... < 4000' },
        {key: 4, text: '4000 < ... < 5000' },
        {key: 5, text: '5000 < ... < 6000' },
        {key: 6, text: 'more than 6000' },
      ]),
      validate: [validate.required],
    }, {
      layout: { sm: 24, md: 4 },
      name: 'show_salary',
      label: ' ',
      component: render(Checkbox),
      children: "Show on page",
      checked: (value) => value > 0
    },
    // ROW 3
    {
      layout: { span: 24 },
      name: 'short_description',
      label: 'Short job description',
      placeholder: 'Short description',
      validate: [validate.required, validate.maxLength70],
      autosize: { minRows: 1, maxRows: 3 },
      component: render(Input.TextArea),
      extra: 'This is your chance to get Talent excited about your job offering. Focus on what the job offer is and what it offers to the Talent. Please make sure to review for grammar and spelling before submitting. Please try to keep this to one paragraph (max 70 characters)'
    },
    // ROW 4
    {
      layout: { span: 24 },
      name: 'description',
      label: 'Job description',
      validate: [validate.required],
      component: render(BraftEditor),
      language: 'en',
      format: value => BraftEditor.createEditorState(value),
      normalize: value => value && value.toHTML(),
      style: { border: '1px solid #d9d9d9', borderRadius: '20px' },
      extra: 'Please describe the requirements for this position such as required work experience, qualities, skills, tasks involved. Mention what kind of documents applicants have to submit/send to you when applying for this position. Feel free to use this editor to make this post as nice as you can by adding lists, bold text, hyperlinked text, etc.'
    },
    // ROW 5
    {
      layout: { span: 24},
      name: 'logo',
      label: 'Company logo',
      filename: 'companylogo.png',
      validate: [validate.required],
      component: renderUpload(Upload),
      listType: 'picture-card',
      accept: 'image/*',
      size: { width: 300, height: 300 },
    },
    // ROW 6
    {
      layout: { sm: 24, md: 12},
      name: 'address',
      validate: [validate.required],
      label: 'Office address',
      placeholder: 'Type the address of the job location',
      component: render(Input),
    },
    {
      layout: { sm: 24, md: 12},
      name: 'location',
      validate: [validate.required],
      label: 'City',
      placeholder: 'Type the city name of the job location',
      component: render(Input),
    },
    // ROW 7
    {
      layout: { span: 24 },
      name: 'how_apply',
      excludeFromForm: true,
      component: <h2>How would you like people to apply for this position? (choose only one)</h2>
    },
    // ROW 8
    {
      layout: { sm: 24, md: 12},
      name: 'contact_email',
      label: 'Vie email',
      validate: [validate.requiredIfNoLink, validate.email],
      placeholder: 'Type your email address',
      component: render(Input),
    },
    {
      layout: { sm: 24, md: 12},
      name: 'website_link',
      label: 'Via link to the official job offering',
      addonBefore: 'https://',
      validate: [validate.requiredIfNoEmail, validate.url],
      placeholder: 'Paste your link here',
      component: render(Input),
    },
    // ROW 9
    {
      layout: { span: 24 },
      name: 'hr',
      excludeFromForm: true,
      component: <hr />,
    },
    // ROW 10
    {
      layout: { span: 24 },
      name: 'description_header',
      excludeFromForm: true,
      component: <h3>Fill in a short description of your company or organization here. This will be added to the end of your job offering description.</h3>,
    },
    // ROW 11
    {
      layout: { sm: 24, md: 12 },
      name: 'company_name',
      label: 'Company name',
      placeholder: 'name of company',
      validate: [validate.required],
      component: render(Input),
    }, {
      layout: { sm: 24, md: 12 },
      name: 'community',
      label: 'Your primary role in the innovation community',
      className: 'form-item-select',
      validate: [validate.required],
      placeholder: 'Select',
      component: render(Select),
      filterOption: (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) >= 0,
      children: getOptions([
        { key: 'Startup', text: 'Startup'},
        { key: 'Investor', text: 'Investor'},
        { key: 'Government', text: 'Government'},
        { key: 'Corporate', text: 'Corporate'},
        { key: 'Academia', text: 'Academia'},
        { key: 'Hub Partner', text: 'Hub Partner'},
        { key: 'Service Provider', text: 'Service Provider'},
        { key: 'Student', text: 'Student'},
        { key: 'Other', text: 'Other'},
      ]),
    },
    // ROW 12
    {
      layout: { span: 24 },
      name: 'short_company_description',
      label: 'Short company description',
      placeholder: 'Short company description',
      validate: [validate.required, validate.maxLength250],
      autosize: { minRows: 1, maxRows: 3 },
      component: render(Input.TextArea),
      extra: 'Fill in a short text (max 250 characters) about your company or organization here. This will be added to the end of your event description.'
    },
    // ROW 13
    {
      layout: { sm: 24, md: 8 },
      name: 'org_contact',
      label: 'Main contact (for internal use only)',
      placeholder: 'Main contact',
      validate: [validate.required],
      component: render(Input),
    }, {
      layout: { sm: 24, md: 8 },
      name: 'org_twitter',
      label: 'Twitter account',
      placeholder: 'Twitter account',
      component: render(Input),
    }, {
      layout: { sm: 24, md: 8 },
      name: 'website',
      label: 'Company website',
      placeholder: 'URL',
      addonBefore: 'https://',
      component: render(Input),
      validate: [validate.url],
    },
    // ROW 14
    {
      layout: { sm: 24, md: 12 },
      name: 'email',
      label: 'Email (for internal use only)',
      validate: [validate.required, validate.email],
      placeholder: 'Email address',
      component: render(Input),
    }, {
      layout: { sm: 24, md: 12 },
      name: 'org_tel',
      validate: [validate.required, validate.phoneNumber],
      label: 'Telephone (for internal use only)',
      placeholder: 'Telephone number',
      component: render(Input),
    },
    // ROW 15
    {
      layout: { span: 24 },
      name: 'featured',
      label: ' ',
      component: render(Checkbox),
      children: 'This is a featured job posting',
      checked: (value) => value > 0,
    },
    // ROW 16
    {
      layout: { span: 24 },
      name: 'NL_Currency_Formater',
      label: 'NL Currency Formater',
      component: renderNLCurrency(),
      placeholder: 'Starting Salary',
      style:{width:'100%'},
    },
  ];
}
```

## Contribution and ideas
If someone willing to help with development or have idea about what are the components and features we can have in this package feel free to share your ideas.

