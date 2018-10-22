import React from 'react'
import { withSiteData } from 'react-static'
import styled from 'styled-components'
import RegistrationForm from './RegistrationForm'

export default withSiteData(() => (
  <Wrapper>
    <RegistrationForm />
  </Wrapper>
))

const Wrapper = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 64px auto;
  padding: 24px;
`
