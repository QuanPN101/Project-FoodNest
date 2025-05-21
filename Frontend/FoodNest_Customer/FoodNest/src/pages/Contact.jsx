import React from "react";
import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <>
      {/* Hero section */}
      <section className="relative mt-10">
        <div className="container mx-auto px-4">
          <div className="relative w-full h-80 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-black bg-opacity-50">
              <img
                src={assets.image_contact}
                alt="Contact Background"
                className="w-full h-full"
              />
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Liên hệ với chúng tôi
                  </h1>
                  <p className="text-white">
                    Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Contact information */}
            <div className="md:w-1/3 space-y-6">
              <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Địa chỉ</h3>
                    <p className="text-gray-600">
                      77 Nguyễn Huệ, Phú Nhuận, Huế, Thành phố Huế
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-phone-alt text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Điện thoại</h3>
                    <p className="text-gray-600">1900 1234</p>
                    <p className="text-gray-600">0234 3823 290</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email</h3>
                    <p className="text-gray-600">info@foodnest.vn</p>
                    <p className="text-gray-600">cskh@foodnest.vn</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-clock text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Giờ làm việc</h3>
                    <p className="text-gray-600">
                      Thứ 2 - Chủ nhật: 8:00 - 22:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="md:w-2/3">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">Gửi tin nhắn</h2>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block font-medium mb-1">
                        Họ tên *
                      </label>
                      <input
                        id="name"
                        placeholder="Nhập họ tên"
                        className="w-full border rounded px-4 py-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-medium mb-1">
                        Email *
                      </label>
                      <input
                        id="email"
                        placeholder="Nhập email"
                        className="w-full border rounded px-4 py-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block font-medium mb-1">
                        Số điện thoại *
                      </label>
                      <input
                        id="phone"
                        placeholder="Nhập số điện thoại"
                        className="w-full border rounded px-4 py-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block font-medium mb-1"
                      >
                        Chủ đề *
                      </label>
                      <input
                        id="subject"
                        placeholder="Nhập chủ đề"
                        className="w-full border rounded px-4 py-2"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block font-medium mb-1">
                      Nội dung *
                    </label>
                    <textarea
                      id="message"
                      className="w-full border rounded px-4 py-2 h-40"
                      placeholder="Nhập nội dung tin nhắn"
                    ></textarea>
                  </div>
                  <button className="bg-primary text-white px-6 py-3 rounded hover:bg-primary/90">
                    Gửi tin nhắn
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Bản đồ</h2>
          <div className="h-96 w-full rounded-lg overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.310622385515!2d107.58938597518991!3d16.45980188427769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a13f4b323ea5%3A0xb278479e81236ab7!2zNzcgTmd1eeG7hW4gSHXhu4csIFBow7ogTmh14bqtbiwgSHXhur8sIFRow6BuaCBwaOG7kSBIdeG6vywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1747755523102!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
