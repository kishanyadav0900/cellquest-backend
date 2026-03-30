function Testimonial() {
  return (
    <>
      {/* Testimonial Start */}
      <div className="container-fluid testimonial py-5">
        <div className="container pt-5">
          <div className="row gy-5 gx-0">

            <div className="col-lg-6 pe-lg-5 wow fadeIn" data-wow-delay="0.3s">
              <h1 className="display-6 text-white mb-4">
                What Clients Say About Our Lab Services!
              </h1>

              <p className="text-white mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur tellus augue, iaculis id elit eget, ultrices pulvinar
                tortor.
              </p>

              <a href="#" className="btn btn-primary py-3 px-5">
                More Testimonials
              </a>
            </div>

            <div className="col-lg-6 mb-n5 wow fadeIn" data-wow-delay="0.5s">
              <div className="bg-white p-5">

                <div
                  className="owl-carousel testimonial-carousel wow fadeIn"
                  data-wow-delay="0.1s"
                >

                  {/* Testimonial 1 */}
                  <div className="testimonial-item">

                    <div className="icon-box-primary mb-4">
                      <i className="bi bi-chat-left-quote text-dark"></i>
                    </div>

                    <p className="fs-5 mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur tellus augue, iaculis id elit eget, ultrices
                      pulvinar tortor. Quisque vel lorem porttitor, malesuada
                      arcu quis, fringilla risus. Pellentesque eu consequat
                      augue.
                    </p>

                    <div className="d-flex align-items-center">
                      <img
                        className="flex-shrink-0"
                        src="img/testimonial-1.jpg"
                        alt=""
                      />

                      <div className="ps-3">
                        <h5 className="mb-1">Client Name</h5>
                        <span className="text-primary">Profession</span>
                      </div>
                    </div>

                  </div>

                  {/* Testimonial 2 */}
                  <div className="testimonial-item">

                    <div className="icon-box-primary mb-4">
                      <i className="bi bi-chat-left-quote text-dark"></i>
                    </div>

                    <p className="fs-5 mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur tellus augue, iaculis id elit eget, ultrices
                      pulvinar tortor. Quisque vel lorem porttitor, malesuada
                      arcu quis, fringilla risus. Pellentesque eu consequat
                      augue.
                    </p>

                    <div className="d-flex align-items-center">
                      <img
                        className="flex-shrink-0"
                        src="img/testimonial-2.jpg"
                        alt=""
                      />

                      <div className="ps-3">
                        <h5 className="mb-1">Client Name</h5>
                        <span className="text-primary">Profession</span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Testimonial End */}
    </>
  );
}

export default Testimonial;