'use client'

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './slideshow.css'

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className = '' }: Props) => {

  return (
    <div
      className={className}
    >
      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        navigation={true}
        pagination
        autoplay={{
          delay: 3000
        }}
        modules={[FreeMode, Autoplay, Pagination, Navigation]}
        className="mySwiper2"
      >
        {
          images.map(image => (
            <SwiperSlide key={image}>
              <Image
                src={`/products/${image}`}
                alt={`Imagen del producto ${title}`}
                width={200}
                height={100}
                className='object-fill'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
