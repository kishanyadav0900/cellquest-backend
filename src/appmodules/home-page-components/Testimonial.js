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
                We take immense pride in the accuracy of our reports and the satisfaction of our patients. Read what our community in Gurgaon has to say about their experience with Cell Quest India.
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
                      "Very clean lab and highly professional staff. The home collection boy was extremely polite, hygienic, and skilled. Highly recommended for anyone in Gurgaon!"
                    </p>

                    <div className="d-flex align-items-center">
                      <img
                        className="flex-shrink-0"
                        src="img/testimonial-1.jpg"
                        alt=""
                      />

                      <div className="ps-3">
                        <h5 className="mb-1">Rahul S.</h5>
                        <span className="text-primary">Local Resident</span>
                      </div>
                    </div>

                  </div>

                  {/* Testimonial 2 */}
                  <div className="testimonial-item">

                    <div className="icon-box-primary mb-4">
                      <i className="bi bi-chat-left-quote text-dark"></i>
                    </div>

                    <p className="fs-5 mb-4">
                      "I received my complete body checkup and blood test reports exactly on time. Dr. Rakesh Kumar is very knowledgeable, helpful, and the prices here are very genuine."
                    </p>

                    <div className="d-flex align-items-center">
                      <img
                        className="flex-shrink-0"
                        src="img/testimonial-2.jpg"
                        alt=""
                      />

                      <div className="ps-3">
                        <h5 className="mb-1">Priya M.</h5>
                        <span className="text-primary">Corporate Employee</span>
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