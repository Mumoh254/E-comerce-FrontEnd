import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Top 5 Sneaker Trends for 2024",
      description: "Discover the hottest sneaker trends for 2024, from chunky soles to retro designs. Stay ahead of the fashion curve!",
      image: "/images/sneaker1.png",
      link: "/images/sneaker-trends-2024",
    },
    {
      id: 2,
      title: "How to Style Your Wardrobe for Summer",
      description: "Learn how to create stylish summer outfits with the latest clothing trends. Perfect for any occasion!",
      image: "/images/sneaker2.png",
      link: "/images/summer-style-guide",
    },
    {
      id: 3,
      title: "The Best Running Shoes for Marathon Runners",
      description: "Find out which running shoes are best for marathon runners, offering comfort, support, and durability.",
      image: "/images/puma.png",
      link: "/images/best-running-shoes",
    },
    {
      id: 4,
      title: "Sustainable Fashion: Eco-Friendly Clothing Brands",
      description: "Explore eco-friendly clothing brands that are making a difference in the fashion industry with sustainable practices.",
      image: "/images/blogs/laddiesboots.png",
      link: "/blog/sustainable-fashion",
    },
  ];

  return (
    <div className="blog-wrapper py-4" >
      <div className="container-xxl h-auto ">
        <h2 className="text-start ">Latest Blog Posts ...</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 6000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 }
          }}
          className="pb-4"
          style={{ width: '100%', padding: '0 15px' }}
        >
          {blogPosts.map((post) => (
            <SwiperSlide key={post.id} style={{ height: 'auto' }}>
              <div className="blog-card h-auto p-2 border rounded shadow-sm d-flex flex-column">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-100 rounded"
                  style={{ height: "220px", objectFit: "cover" }}
                />

                <div className="card-content px-4 flex-grow-1 h-auto" >
                  <h6 className="mb-2 fs-6 fw-semibold">{post.title}</h6>
                  <p className="small text-muted mb-2">{post.description}</p>
                </div>
                <a href={post.link} className="btn btn-primary btn-sm w-100">
                  Read More
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}