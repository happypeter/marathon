import React from 'react'
import { Form, Input, Select, Row, Col, Button, Radio } from 'antd'
import axios from 'axios'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

class FormInfo extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入真实姓名'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="性别">
          {getFieldDecorator('gender', {
            rules: [
              {
                required: true,
                message: '请选择性别'
              }
            ]
          })(
            <RadioGroup>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="手机号">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号' }]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="身份证号">
          {getFieldDecorator('identity', {
            rules: [
              {
                required: true,
                message: '请输入身份证号'
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="参赛衣服">
          {getFieldDecorator('size', {
            rules: [
              {
                required: true,
                message: '请选择衣服大小'
              }
            ]
          })(
            <RadioGroup>
              <RadioButton value="l">L</RadioButton>
              <RadioButton value="xl">XL</RadioButton>
              <RadioButton value="xxl">XXL</RadioButton>
              <RadioButton value="xxxl">XXXL</RadioButton>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="参赛号码">
          {getFieldDecorator('number', {
            rules: [
              {
                required: true,
                message: '请输入参赛号码'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交信息
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const RegistrationForm = Form.create()(FormInfo)

export default RegistrationForm
