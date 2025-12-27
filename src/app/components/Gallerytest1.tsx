'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const images = [
  { src: '/media/bedroomTesting1.jpg', alt: 'Photo 1' },
  { src: '/media/dinningTesting1.jpg', alt: 'Photo 2' },
  { src: '/media/kitchenTesting2.jpg', alt: 'Photo 3' },
  { src: '/media/kitcheTestingOutside1.jpg', alt: 'Photo 4' },
  { src: '/media/livingRoomTesting1.jpg', alt: 'Photo 5' },
]

const Gallerytest1 = () => {
  return (
    <section className="w-full max-w-[1500px] mx-auto my-20 md:px-8 px-6">
      <Swiper
        modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
        effect="coverflow"
        centeredSlides
        grabCursor
        loop
        slidesPerView="auto"
        spaceBetween={24}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 140,
          modifier: 1.2,
          slideShadows: false,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        className="!py-10"
      >
        {images.map((img) => (
          <SwiperSlide key={img.src} className="!w-[70vw] sm:!w-[420px]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 70vw, 420px"
                className="object-cover"
                priority={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Gallerytest1
