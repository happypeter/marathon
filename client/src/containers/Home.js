import React from 'react'
import { withSiteData } from 'react-static'
import { Alert } from 'antd'
import styled from 'styled-components'
import RegistrationForm from './RegistrationForm'
import WeChatPay from '../images/webwxgetmsgimg.jpeg'

export default withSiteData(() => (
  <Wrapper>
    <Alert
      message="请先通过下方的微信支付二维码给臧秀玉女士付款60元，付款时请备注自己的名字，付款完成后，再填写图片下方的表单。"
      type="warning"
      style={{ lineHeight: 2, marginBottom: 32 }}
    />
    <Image src={WeChatPay} />
    <Alert
      message="小提示，收集信息的目的是为了帮助大家去领参赛物品，提交成功后您的名字会出现在最下方的列表中，没有收到参赛号的朋友，请联系臧秀玉女士。如果不小心提交错误，再提交一次即可，我们以最新提交的信息为准。"
      type="warning"
      style={{ lineHeight: 2, marginBottom: 32 }}
    />
    <RegistrationForm />
  </Wrapper>
))

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 32px auto;
  padding: 24px;
`
const Image = styled.img`
  display: block;
  width: 200px;
  margin: 0 auto;
`
