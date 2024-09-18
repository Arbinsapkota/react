import React from 'react'
import Gallery from '../../../shared/Gallery'
import GmsTola from '../../../components/homeComponents/GmsTola'
import GoToTop from '../../../Scroll/GoToTop'
import { Container } from '../../../components/Container'

const PhotoGallery = () => {
  return (
    <Container>
      <GmsTola />
     <Gallery />
     <GoToTop />

    </Container>
  )
}

export default PhotoGallery