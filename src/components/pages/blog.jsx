import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Top 5 Sneaker Trends for 2024",
      description: "Discover the hottest sneaker trends for 2024, from chunky soles to retro designs. Stay ahead of the fashion curve!",
      image: "/images/blog/sneaker-trends.jpg",
      link: "/blog/sneaker-trends-2024",
    },
    {
      id: 2,
      title: "How to Style Your Wardrobe for Summer",
      description: "Learn how to create stylish summer outfits with the latest clothing trends. Perfect for any occasion!",
      image: "/images/blog/summer-style.jpg",
      link: "/blog/summer-style-guide",
    },
    {
      id: 3,
      title: "The Best Running Shoes for Marathon Runners",
      description: "Find out which running shoes are best for marathon runners, offering comfort, support, and durability.",
      image: "/images/blog/marathon.png",
      link: "/blog/best-running-shoes",
    },
    {
      id: 4,
      title: "Sustainable Fashion: Eco-Friendly Clothing Brands",
      description: "Explore eco-friendly clothing brands that are making a difference in the fashion industry with sustainable practices.",
      image: "/images/blogs/basket.png",
      link: "",
    },
  ];

  return (
    <div className="blog-wrapper py-5">
      
      <div className="container-xxl">
        <h2 className="text-center mb-5">Latest Blog Posts</h2>

        {/* Slider for Small Screens */}
        <div className="d-block d-md-none">
          <Swiper
            modules={[ Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 6000 }}
            pagination={{ clickable: true }}
            
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <div className="blog-card p-3 border rounded shadow-sm">
                  <img src={post.image} alt={post.title} className="w-100 rounded" style={{ height: "200px", objectFit: "cover" }} />
                  <h5 className="mt-2">{post.title}</h5>
                  <p className="small text-muted">{post.description}</p>
                  <a href={post.link} className="btn btn-primary btn-sm">Read More</a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Blog Grid for Larger Screens */}
        <div className="d-none d-md-block">
          <div className="row g-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="col-md-6 col-lg-3">
                <div className="blog-card border rounded overflow-hidden shadow-sm h-100">
                  <div className="card-image">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="img-fluid w-100"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-content p-3">
                    <h5 className="mb-3">{post.title}</h5>
                    <p className="text-muted">{post.description}</p>
                    <a href={post.link} className="btn btn-primary">Read More</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
