import React, { Component } from 'react'
import { Form, Icon, Col, Select, Row } from 'antd'

class LizardReduxFormBuilder extends Component {
    render() {
        const {getField, fieldsData} = this.props;
      return (
        <Row gutter={16}>
            {fieldsData.map(({ layout, ...rest }) => (
                <Col key={rest.name} {...layout}>
                    {rest.excludeFromForm ?
                    rest.component
                    :
                    getField(rest)}
                </Col>
            ))}
        </Row>
      );
    }
  }
  
export default LizardReduxFormBuilder;

export const getOptions = options => {
    return options && options.map(option => (
        <Select.Option key={option.key} value={option.key}>{option.text}</Select.Option>
    ));
}

export const render = Component => ({ input, meta, children, hasFeedback, label, checked, ...rest }) => {
  const checkedValue = {};
  if (checked != null) {
    checkedValue.checked = checked(input.value);
  }

  const hasError = meta.touched && meta.invalid;
  return (
      <Form.Item
          label={label}
          colon={label && label === ' ' ? false : true}
          validateStatus={hasError ? "error" : "success"}
          hasFeedback={hasFeedback && hasError}
          help={hasError && meta.error}
          extra={rest.extra}
      >
        <Component {...input} {...checkedValue} {...rest} children={children} />
      </Form.Item>
  )
}

export const renderUpload = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = meta.touched && meta.invalid;
  const fileList = [];
  if (input.value != null && input.value !== '') {
    fileList.push({
        uid: '-1',
        name: rest.filename || '',
        status: 'done',
        url: input.value,
      });
  }

  const formItemLayout = rest.formItemLayout || {}
  return (
    <Form.Item
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      {...formItemLayout}
    >
      <Component
        {...rest}
        fileList={fileList}
        onRemove={() => { input.onChange(null)}}
        onSuccess={(file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataURL = e.target.result;
            if (rest.size) {
              resizedataURL(dataURL, rest.size.width, rest.size.height)
                .then(data => input.onChange(data));
            } else {
              input.onChange(dataURL);
            }
          }

          reader.readAsDataURL(file);

        }}
        customRequest={({ data, file, filename, onSuccess }) => {
          onSuccess(file, filename);
        }}
      >
        {children ? children : fileList.length >= 1 ? null :
          (<div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>)
        }
      </Component>
    </Form.Item>
  )
}

function resizedataURL(datas) {
  return new Promise((resolve) => {
    const img = document.createElement('img');

    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const oWidth = img.width;
      const oHeight = img.height;
      let nWidth = 300;
      let nHeight = 300;
      let x = 0;
      let y = 0;

      canvas.width = nWidth;
      canvas.height = nHeight;

      if (oWidth > oHeight) {
        nWidth = oWidth * (nHeight / oHeight);
        x = (nHeight - nWidth) / 2;
      } else {
        nHeight = oHeight * (nWidth / oWidth);
        y = (nWidth - nHeight) / 2;
      }
      ctx.drawImage(this, x, y, nWidth, nHeight);

      const dataURI = canvas.toDataURL();
      resolve(dataURI);
    };
    img.src = datas;
  })
}
