import React from 'react'
import GmsTola from '../../../components/homeComponents/GmsTola'
import RecentNews from '../../../shared/RecentNews'
import GoToTop from '../../../Scroll/GoToTop'
import { Container } from '../../../components/Container'


const News = () => {
  return (
    <Container>
      <GmsTola />
      <RecentNews />
      <GoToTop />
    </Container>
  )  
}

export default News