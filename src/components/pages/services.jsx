import React from "react";
import { MessageCircle, Truck, Shield, CreditCard } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const services = [
  {
    icon: <MessageCircle size={40} className="text-danger" />,
    title: "Customer Support & Assistance",
    description: "24/7 live chat, WhatsApp & email support, and order tracking.",
  },
  {
    icon: <Truck size={40} className="text-success" />,
    title: "Fast & Flexible Shipping",
    description: "Same-day delivery, pick-up points, and eco-friendly shipping.",
  },
  {
    icon: <Shield size={40} className="text-primary" />,
    title: "Product Protection & Insurance",
    description: "Extended warranty, protection from damage, and easy returns.",
  },
  {
    icon: <CreditCard size={40} className="text-warning" />,
    title: "Payment Services",
    description: "Secure payments via M-Pesa, PayPal, cards, and BNPL options.",
  },
];

const Services = () => {
  return (
    <div className="container-xxl py-5">
      <h2 className="fs-3 fw-bold text-center mb-4">Our Services</h2>

      {/* Swiper for small screens */}
      <div className="d-md-none">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="card shadow-sm rounded-3 text-center p-4">
                <div className="d-flex justify-content-center mb-3">{service.icon}</div>
                <h5 className="fw-semibold">{service.title}</h5>
                <p className="text-muted mt-2">{service.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid layout for larger screens */}
      <div className="row justify-content-center d-none d-md-flex">
        {services.map((service, index) => (
          <div key={index} className="col-md-6 col-lg-3 mb-4">
            <div className="card shadow-sm rounded-3 text-center p-4 h-100">
              <div className="d-flex justify-content-center mb-3">{service.icon}</div>
              <h5 className="fw-semibold">{service.title}</h5>
              <p className="text-muted mt-2">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
