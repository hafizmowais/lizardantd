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
