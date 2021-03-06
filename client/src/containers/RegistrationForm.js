import React from 'react'
import { Form, Input, Select, Button, Radio, Alert, DatePicker } from 'antd'
import axios from 'axios'
import styled from 'styled-components'
import settings from '../../settings'
import CheckInfo from './CheckInfo'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

class FormInfo extends React.Component {
  state = {
    loading: false,
    users: [],
    name: ''
  }

  componentDidMount() {
    axios
      .get(`${settings.url}/users`)
      .then(res => {
        if (res.data && res.data.success) {
          console.log('users...', res.data.users)
          this.setState({ users: res.data.users })
        }
      })
      .catch(err => {
        if (err.response) {
          console.log(error.response.data.errorMsg)
        }
      })
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
              this.props.form.resetFields()
              this.setState({
                loading: false,
                name: res.data.user.name,
                users: [res.data.user, ...this.state.users]
              })
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
    const { name, loading, users } = this.state
    const len = users.length
    let userList
    if (len) {
      userList = users.map((user, index) => {
        return (
          <Item key={user._id}>
            <Num>{len - index}</Num>
            <Name>{user.name}</Name>
          </Item>
        )
      })
    }

    return (
      <div>
        <div
          style={{
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 32,
            color: '#212121'
          }}
        >
          阿那亚信息登记表
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
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem label="紧急联系人">
            {getFieldDecorator('contact', {
              rules: [
                {
                  required: true,
                  message: '请输入紧急联系人'
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem label="紧急联系人电话">
            {getFieldDecorator('contactPhone', {
              rules: [
                {
                  required: true,
                  message: '请输入紧急联系人电话'
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem label="出生日期">
            {getFieldDecorator('birthday', {
              rules: [
                {
                  required: true,
                  message: '请选择出生日期'
                }
              ]
            })(<Input placeholder="例如：1990年7月10日" />)}
          </FormItem>

          <FormItem label="血型">
            {getFieldDecorator('bloodType', {
              rules: [
                {
                  required: true,
                  message: '请输入紧急联系人电话'
                }
              ]
            })(
              <RadioGroup>
                <Radio value="A">A</Radio>
                <Radio value="B">B</Radio>
                <Radio value="O">O</Radio>
                <Radio value="AB">AB</Radio>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem label="T恤尺寸">
            {getFieldDecorator('size', {
              rules: [
                {
                  required: true,
                  message: '请选择T恤尺寸'
                }
              ]
            })(
              <RadioGroup>
                <RadioButton value="s">s</RadioButton>
                <RadioButton value="m">m</RadioButton>
                <RadioButton value="l">L</RadioButton>
                <RadioButton value="xl">XL</RadioButton>
                <RadioButton value="xxl">XXL</RadioButton>
                <RadioButton value="xxxl">XXXL</RadioButton>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? '正在提交...' : '提交信息'}
            </Button>
            <CheckInfo />
          </FormItem>
        </Form>
        {name ? (
          <Alert
            message={`${name}，太棒了，您的信息已经提交成功了！`}
            type="success"
            style={{ marginTop: 48 }}
          />
        ) : null}
        <div style={{ marginTop: 48 }}>
          <Title>提交成功名单</Title>
          {len ? userList : <div>尚且没有人提交信息</div>}
        </div>
      </div>
    )
  }
}

const RegistrationForm = Form.create()(FormInfo)

const Title = styled.div`
  text-align: center;
  font-size: 20px;
  color: #212121;
  margin-bottom: 32px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`
const Num = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
`
const Name = styled.div`
  font-size: 18px;
`

export default RegistrationForm
