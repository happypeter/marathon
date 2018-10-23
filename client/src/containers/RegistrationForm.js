import React from 'react'
import { Form, Input, Select, Button, Radio, message, Alert } from 'antd'
import axios from 'axios'
import settings from '../../settings'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

class FormInfo extends React.Component {
  state = {
    loading: false,
    name: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        axios
          .post(`${settings.url}/users`, values)
          .then(res => {
            if (res.data && res.data.success) {
              message.info('系统已经保存了您提交的信息!')
              this.props.form.resetFields()
              this.setState({ loading: false, name: res.data.name })
            }
          })
          .catch(err => {
            if (err.response) {
              console.log(error.response.data.errorMsg)
            }
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { name, loading } = this.state
    return (
      <div>
        <Alert
          message="小提示，请您先把表单中的每项信息都填写完成后，再点击提交信息按钮"
          type="warning"
          style={{ fontSize: 14, marginBottom: 32 }}
        />
        <div
          style={{
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 32,
            color: 'rgba(0, 0, 0, 0.85)'
          }}
        >
          马拉松参赛选手信息登记表
        </div>
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <FormItem label="姓名">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入真实姓名'
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem label="性别">
            {getFieldDecorator('gender', {
              rules: [
                {
                  required: true,
                  message: '请选择性别'
                }
              ]
            })(
              <RadioGroup>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem label="手机号">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号' }]
            })(<Input />)}
          </FormItem>

          <FormItem label="身份证号">
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

          <FormItem label="参赛衣服">
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

          <FormItem label="参赛号码">
            {getFieldDecorator('number', {
              rules: [
                {
                  required: true,
                  message: '请输入参赛号码'
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? '正在提交...' : '提交信息'}
            </Button>
          </FormItem>
        </Form>
        {name ? (
          <Alert
            message={`${name}，太棒了，您提交的信息已经保存了`}
            type="success"
            style={{ fontSize: 14, marginTop: 24 }}
          />
        ) : (
          ''
        )}
      </div>
    )
  }
}

const RegistrationForm = Form.create()(FormInfo)

export default RegistrationForm
