import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../../admin/services/api";

function AppoinmentContent() {
  const [searchParams] = useSearchParams();
  const prefilledTest = searchParams.get("test") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "Male",
    test: prefilledTest,
    doctor: "",
    date: "",
    time: "09:00 AM",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update test field if URL param changes (e.g. navigating from a test card)
  useEffect(() => {
    if (prefilledTest) {
      setForm((prev) => ({ ...prev, test: prefilledTest }));
    }
  }, [prefilledTest]);

  const TIMES = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create patient record
      const patientPayload = {
        name: form.name,
        age: parseInt(form.age, 10) || 0,
        gender: form.gender,
        phone: form.phone,
        test: form.test,
        doctor: form.doctor || "To be assigned",
        status: "Pending",
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      };

      const { error: patErr } = await supabase
        .from("patients")
        .insert(patientPayload);
      if (patErr) throw new Error("Patient: " + patErr.message);

      // 2. Create appointment record
      const appointmentPayload = {
        patient: form.name,
        phone: form.phone,
        email: form.email,
        test: form.test,
        doctor: form.doctor || "To be assigned",
        date: form.date,
        time: form.time,
        status: "Pending",
      };

      const { error: aptErr } = await supabase
        .from("appointments")
        .insert(appointmentPayload);

      // If email column doesn't exist yet, retry without it
      if (aptErr && aptErr.message && aptErr.message.includes("email")) {
        const { email, ...payloadWithoutEmail } = appointmentPayload;
        const { error: retryErr } = await supabase
          .from("appointments")
          .insert(payloadWithoutEmail);
        if (retryErr) throw new Error("Appointment: " + retryErr.message);
      } else if (aptErr) {
        throw new Error("Appointment: " + aptErr.message);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Something went wrong while booking. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Appoinment Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">

            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="display-6 mb-4">
                We Ensure You Will Always Get The Best Result
              </h1>

              <p className="mb-4">
                Booking a test with Cell Quest India is simple and hassle-free. Fill out the form below with your details, and our care team will get back to you immediately to confirm your slot. Whether it is a routine blood test or a complex biochemistry profile, we ensure a smooth, painless, and highly professional experience from sample collection to report delivery.
              </p>

              <div className="d-flex align-items-start wow fadeIn" data-wow-delay="0.3s">
                <div className="icon-box-primary">
                  <i className="bi bi-geo-alt text-dark fs-1"></i>
                </div>
                <div className="ms-3">
                  <h5>Office Address</h5>
                  <span>Ist and 2nd floor, plot no -5, Kirti Nagar, Sec 15 Part 1, Near Bindle Colour lab, Gurgaon Haryana 122001</span>
                </div>
              </div>

              <hr />

              <div className="d-flex align-items-start wow fadeIn" data-wow-delay="0.4s">
                <div className="icon-box-primary">
                  <i className="bi bi-clock text-dark fs-1"></i>
                </div>
                <div className="ms-3">
                  <h5>Office Time</h5>
                  <span>Mon-Sat 08:00 AM - 10:00 PM, Sun Closed</span>
                </div>
              </div>
            </div>


            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <h2 className="mb-4">Book Your Test</h2>

              {submitted ? (
                <div className="alert alert-success mt-4 p-4 text-center rounded wow fadeIn" role="alert" style={{ borderLeft: '5px solid #28a745' }}>
                  <h4 className="alert-heading text-success mb-3"><i className="bi bi-check-circle-fill me-2"></i> Appointment Booked!</h4>
                  <p className="mb-0 fs-5 text-dark">Thank you! Your appointment for <strong>{form.test}</strong> has been booked. Our team will review your details and contact you shortly to confirm.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} />
                        <label htmlFor="name">Your Name *</label>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="tel" className="form-control" id="phone" name="phone" placeholder="Your Phone" required value={form.phone} onChange={handleChange} />
                        <label htmlFor="phone">Phone Number *</label>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Your Email" required value={form.email} onChange={handleChange} />
                        <label htmlFor="email">Email *</label>
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="form-floating">
                        <input type="number" className="form-control" id="age" name="age" placeholder="Age" required value={form.age} onChange={handleChange} />
                        <label htmlFor="age">Age *</label>
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="form-floating">
                        <select className="form-select" id="gender" name="gender" value={form.gender} onChange={handleChange}>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                        <label htmlFor="gender">Gender</label>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="test" name="test" placeholder="Test Name" required value={form.test} onChange={handleChange} />
                        <label htmlFor="test">Test Name *</label>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="doctor" name="doctor" placeholder="Doctor (optional)" value={form.doctor} onChange={handleChange} />
                        <label htmlFor="doctor">Referring Doctor (Optional)</label>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="date" className="form-control" id="date" name="date" required value={form.date} onChange={handleChange} />
                        <label htmlFor="date">Preferred Date *</label>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <select className="form-select" id="time" name="time" value={form.time} onChange={handleChange}>
                          {TIMES.map((t) => <option key={t}>{t}</option>)}
                        </select>
                        <label htmlFor="time">Preferred Time *</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a message here" id="message" name="message" style={{ height: "100px" }} value={form.message} onChange={handleChange}></textarea>
                        <label htmlFor="message">Message (Optional)</label>
                      </div>
                    </div>

                    {error && (
                      <div className="col-12">
                        <div className="alert alert-danger mb-0">{error}</div>
                      </div>
                    )}

                    <div className="col-12 text-center">
                      <button className="btn btn-primary w-100 py-3" type="submit" disabled={loading}>
                        {loading ? "Booking..." : "Book Appointment"}
                      </button>
                    </div>

                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
      {/* Appoinment End */}
    </>
  );
}

export default AppoinmentContent;