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
  max-width: 600px;
  margin: 32px auto;
  padding: 24px;
`
