// src/pages/ShopDetail.jsx
import React from "react";

const ShopDetail = () => {
  return (
    <div className="page-content">
      <div className="container-xxl">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-lg-2 text-lg-center">
                    <div className="bg-body d-flex align-items-center justify-content-center rounded py-4">
                      <img
                        src="assets/images/seller/zara.svg"
                        alt=""
                        className="avatar-xxl flex-shrink-0"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 border-end">
                    <div>
                      <h4 className="mb-1">ZARA International</h4>
                      <p className="mb-1">(Most Selling Fashion Brand)</p>
                      <a href="#!" className="link-primary fs-16 fw-medium">
                        www.larkon.co
                      </a>
                      <div className="d-flex align-items-center justify-content-start gap-2 mt-2 mb-1">
                        <ul className="d-flex text-warning m-0 fs-20 list-unstyled">
                          <li>
                            <i className="bx bxs-star"></i>
                          </li>
                          <li>
                            <i className="bx bxs-star"></i>
                          </li>
                          <li>
                            <i className="bx bxs-star"></i>
                          </li>
                          <li>
                            <i className="bx bxs-star"></i>
                          </li>
                          <li>
                            <i className="bx bxs-star-half"></i>
                          </li>
                        </ul>
                        <p className="fw-medium mb-0 text-dark fs-15">
                          4.5/5 <span className="fs-13">(+23.3K Review)</span>
                        </p>
                      </div>
                      <div className="mt-2">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                            <i className="fs-20 text-primary bx bx-map"></i>
                          </div>
                          <p className="mb-0 fs-15">
                            4604 , Philli Lane Kiowa IN 47404
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                            <i className="fs-20 text-primary bx bx-envelope"></i>
                          </div>
                          <p className="mb-0 fs-15">
                            zarafashionworld@dayrep.com
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                            <i className="fs-20 text-primary bx bx-phone"></i>
                          </div>
                          <p className="mb-0 fs-15">+243 812-801-9335</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                <h4 className="card-title mt-3 mb-2">Mô tả gian hàng:</h4>
                <p>
                  At ZARA, we believe that fashion is more than just
                  clothing—it's an expression of individuality and a celebration
                  of diversity. Founded in 2003, our journey began with a simple
                  yet powerful vision: to create high-quality, stylish, and
                  comfortable apparel that resonates with people from all walks
                  of life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sản phẩm và đánh giá */}
        <div className="row">
          {/* Sản phẩm */}
          <div className="col-lg-8">
            <div className="card">
              <div className="d-flex card-header justify-content-between align-items-center border-0 pb-1">
                <h4 className="card-title">Các sản phẩm mới nhất</h4>
              </div>
              <div className="card-body pt-1 pb-2">
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th style={{ width: "20px" }}>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                          </div>
                        </th>
                        <th>Product Name & Size</th>
                        <th>Tag ID</th>
                        <th>Category</th>
                        <th>Add Date</th>
                        <th>Items Published</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck2"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                              <img
                                src="assets/images/product/p-1.png"
                                alt=""
                                className="avatar-md"
                              />
                            </div>
                            <div>
                              <a
                                href="#!"
                                className="text-dark fw-medium fs-15"
                              >
                                Black T-shirt
                              </a>
                              <p className="text-muted mb-0 mt-1 fs-13">
                                <span>Variants : </span> 4
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>ID46765</td>
                        <td>Fashion</td>
                        <td>08/05/2023</td>
                        <td>
                          <span className="badge p-1 bg-success-subtle text-success fs-12 me-1">
                            <i className="bx bx-check-double align-text-top fs-14 me-1"></i>{" "}
                            Published
                          </span>
                        </td>
                      </tr>
                      {/* Thêm các <tr> khác tại đây nếu cần */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Đánh giá */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header border-0 pb-1">
                <h4 className="card-title">Đánh giá gần đây</h4>
              </div>
              <div className="card-body pt-1">
                <div className="d-flex mb-3">
                  <img
                    src="assets/images/users/avatar-2.jpg"
                    alt=""
                    className="rounded-circle avatar-sm me-3"
                  />
                  <div>
                    <h6 className="mb-1">Nguyễn Văn A</h6>
                    <p className="mb-1 text-muted">
                      Sản phẩm rất tốt, giao hàng nhanh.
                    </p>
                    <div>
                      <span className="badge bg-warning text-dark">★★★★☆</span>
                      <small className="text-muted ms-2">2 giờ trước</small>
                    </div>
                  </div>
                </div>

                <div className="d-flex mb-3">
                  <img
                    src="assets/images/users/avatar-3.jpg"
                    alt=""
                    className="rounded-circle avatar-sm me-3"
                  />
                  <div>
                    <h6 className="mb-1">Trần Thị B</h6>
                    <p className="mb-1 text-muted">
                      Chất lượng sản phẩm ổn, sẽ mua lại.
                    </p>
                    <div>
                      <span className="badge bg-success text-white">★★★★★</span>
                      <small className="text-muted ms-2">Hôm qua</small>
                    </div>
                  </div>
                </div>

                {/* Thêm các đánh giá khác nếu cần */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
