import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal, Input, Button, message } from 'antd'
import axios from 'axios'
import settings from '../../settings'

class CheckInfo extends Component {
  state = { modal: false, identity: '', user: {} }

  showModal = () => {
    this.setState({
      modal: true
    })
  }

  hideModal = () => {
    this.setState({
      modal: false,
      identity: '',
      user: {}
    })
  }

  handleOk = () => {
    const identity = this.state.identity.trim()
    if (!identity) {
      return message.error('请填写身份证号')
    }

    if (identity && identity.length !== 18) {
      return message.error('请填写身份证号')
    }

    axios.post(`${settings.url}/check`, { identity }).then(res => {
      if (res.data && !res.data.success) {
        return message.error('没有找到匹配的信息')
      }
      if (res.data && res.data.success) {
        this.setState({ user: res.data.user, identity: '' })
      }
    })
  }

  handleChange = e => {
    this.setState({ identity: e.target.value })
  }

  render() {
    const { user, modal, identity } = this.state
    return (
      <Wrap>
        <Button onClick={this.showModal}>核对已经提交的信息</Button>
        <Modal
          title="核对已经提交的信息"
          visible={modal}
          onCancel={this.hideModal}
          footer={null}
        >
          {Object.keys(user).length ? null : (
            <InputWrapper>
              <Input
                value={identity}
                onChange={this.handleChange}
                placeholder="请填写身份证号"
              />
              <Button onClick={this.handleOk} type="primary">
                确认
              </Button>
            </InputWrapper>
          )}

          {Object.keys(user).length ? (
            <List>
              <div>
                <label>姓名：</label>
                {user.name}
              </div>
              <div>
                <label>性别：</label>
                {user.gender}
              </div>
              <div>
                <label>电话：</label>
                {user.phone}
              </div>
              <div>
                <label>身份证号：</label>
                {user.identity}
              </div>
              <div>
                <label>参赛衣服：</label>
                {user.size}
              </div>
              <div>
                <label>参赛号码：</label>
                {user.number}
              </div>
            </List>
          ) : null}
        </Modal>
      </Wrap>
    )
  }
}

export default CheckInfo

const Wrap = styled.div`
  display: inline-block;
  padding-left: 16px;
`

const List = styled.div`
  div {
    padding: 8px 0;
    label {
      width: 80px;
      display: inline-block;
      text-align: right;
      margin-right: 8px;
      color: #212121;
    }
  }
`

const InputWrapper = styled.div`
  text-align: right;
  button {
    margin-top: 24px;
  }
`
