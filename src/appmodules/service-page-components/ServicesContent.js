import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../admin/services/api";

function ServicesContent() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Tests");
  const [modalItem, setModalItem] = useState(null);
  const [openAccordions, setOpenAccordions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sliderRef = useRef(null);

  const [tests, setTests] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [tRes, pRes, pkRes] = await Promise.all([
          supabase.from("tests").select("*").order("name"),
          supabase.from("profiles").select("*, profile_tests(test_id, tests(*))").order("name"),
          supabase.from("packages").select("*, package_profiles(profile_id, profiles(*, profile_tests(test_id, tests(*))))").order("name"),
        ]);
        setTests(tRes.data || []);
        setProfiles(pRes.data || []);
        setPackages(pkRes.data || []);
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (sliderRef.current) sliderRef.current.scrollLeft = 0;
    setSearchQuery("");
    setCategoryFilter("");
  }, [activeTab]);

  const tabs = ["Tests", "Profiles", "Packages"];
  const uniqueCategories = [...new Set(tests.map(t => t.category ? t.category.trim() : null).filter(Boolean))].sort();

  const getItems = () => {
    let items = [];
    if (activeTab === "Tests") items = tests;
    else if (activeTab === "Profiles") items = profiles;
    else items = packages;

    if (searchQuery) {
      items = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (activeTab === "Tests" && categoryFilter) {
      items = items.filter(item => item.category === categoryFilter);
    }

    return items;
  };

  const getTestCount = (item) => {
    if (activeTab === "Tests") return 1;
    if (activeTab === "Profiles") return (item.profile_tests || []).length;
    let c = 0;
    (item.package_profiles || []).forEach(pp => {
      c += (pp.profiles?.profile_tests || []).length;
    });
    return c;
  };

  const getIncludedTests = (item) => {
    if (activeTab === "Tests") return [item];
    if (activeTab === "Profiles") return (item.profile_tests || []).map(pt => pt.tests).filter(Boolean);
    const all = [];
    (item.package_profiles || []).forEach(pp => {
      (pp.profiles?.profile_tests || []).forEach(pt => {
        if (pt.tests) all.push(pt.tests);
      });
    });
    return all;
  };

  const getIncludedProfiles = (item) => {
    if (activeTab !== "Packages") return [];
    return (item.package_profiles || []).map(pp => pp.profiles).filter(Boolean);
  };

  const handleKnowMore = (item) => {
    setModalItem(item);
    setOpenAccordions({});
  };

  const toggleAccordion = (idx) => {
    setOpenAccordions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const currentItems = getItems();

  return (
    <div id="services-section" className="container-fluid container-service py-5 bg-light-mint">
      <div className="container pt-5">

        {/* Header */}
        <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "800px" }}>
          <h1 className="display-6 mb-4 fw-bold text-primary">
            {activeTab === "Tests" ? "Lab Tests" : activeTab === "Profiles" ? "Test Profiles" : "Health Packages"} in Gurgaon
          </h1>
        </div>

        {/* Tab Pills */}
        <div className="d-flex flex-wrap justify-content-center mb-4 wow fadeInUp" data-wow-delay="0.2s">
          {tabs.map(t => (
            <button key={t} className={`btn rounded-pill px-4 py-2 m-2 fw-medium test-category-pill ${activeTab === t ? "active" : ""}`}
              onClick={() => { setActiveTab(t); setModalItem(null); }}>
              {t === "Tests" ? "🧪" : t === "Profiles" ? "📋" : "📦"} {t}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="row justify-content-center mb-5 wow fadeInUp" data-wow-delay="0.25s">
          <div className="col-md-8 col-lg-7">
            <div className="d-flex flex-column flex-md-row gap-2 bg-white p-2 rounded-4 rounded-md-pill shadow-sm border" style={{ borderColor: "#e0e0e0" }}>
              <div className="flex-grow-1 position-relative d-flex align-items-center">
                <i className="bi bi-search position-absolute ms-4 text-muted"></i>
                <input 
                  type="text" 
                  className="form-control border-0 bg-transparent" 
                  placeholder={`Search ${activeTab.toLowerCase()} by name...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ boxShadow: "none", paddingLeft: "3rem" }}
                />
              </div>
              {activeTab === "Tests" && uniqueCategories.length > 0 && (
                <div style={{ minWidth: "200px", position: "relative" }} className="border-top border-md-top-0 border-md-start pt-2 pt-md-0 ps-md-2 mt-2 mt-md-0 border-light">
                  <div 
                    className="d-flex justify-content-between align-items-center h-100 rounded-pill px-3"
                    style={{ backgroundColor: "#f8f9fa", cursor: "pointer", color: "#555", fontWeight: 500, transition: "0.2s" }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="text-truncate" style={{ maxWidth: "130px" }}>{categoryFilter || "All Organs"}</span>
                    <i className={`bi bi-chevron-${isDropdownOpen ? 'up' : 'down'} text-primary`}></i>
                  </div>
                  
                  {isDropdownOpen && (
                    <>
                      <div 
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1040 }} 
                        onClick={() => setIsDropdownOpen(false)} 
                      />
                      <div 
                        className="position-absolute top-100 mt-2 bg-white rounded-4 shadow border-0 py-2" 
                        style={{ right: 0, left: 0, zIndex: 1050, maxHeight: "300px", overflowY: "auto" }}
                      >
                        <div 
                          className="px-4 py-2" 
                          style={{ cursor: "pointer", backgroundColor: categoryFilter === "" ? "rgba(90,138,26,0.1)" : "transparent", color: categoryFilter === "" ? "#5a8a1a" : "#555", fontWeight: categoryFilter === "" ? 600 : 400, transition: "0.2s" }}
                          onClick={() => { setCategoryFilter(""); setIsDropdownOpen(false); }}
                          onMouseOver={(e) => { if(categoryFilter !== "") e.target.style.backgroundColor = "#f8f9fa" }}
                          onMouseOut={(e) => { if(categoryFilter !== "") e.target.style.backgroundColor = "transparent" }}
                        >
                          All Organs
                        </div>
                        {uniqueCategories.map(c => (
                          <div 
                            key={c}
                            className="px-4 py-2"
                            style={{ cursor: "pointer", backgroundColor: categoryFilter === c ? "rgba(90,138,26,0.1)" : "transparent", color: categoryFilter === c ? "#5a8a1a" : "#555", fontWeight: categoryFilter === c ? 600 : 400, transition: "0.2s" }}
                            onClick={() => { setCategoryFilter(c); setIsDropdownOpen(false); }}
                            onMouseOver={(e) => { if(categoryFilter !== c) e.target.style.backgroundColor = "#f8f9fa" }}
                            onMouseOut={(e) => { if(categoryFilter !== c) e.target.style.backgroundColor = "transparent" }}
                          >
                            {c}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cards Slider */}
        <div className="position-relative wow fadeInUp" data-wow-delay="0.3s">
          <button onClick={() => scrollSlider("left")} className="slider-nav-btn slider-nav-prev" aria-label="Scroll left">
            <i className="bi bi-chevron-left"></i>
          </button>

          <div className="test-slider-container" ref={sliderRef}>
          {loading ? (
            <div className="text-center p-5 text-muted w-100"><h5>Loading...</h5></div>
          ) : currentItems.length > 0 ? (
            currentItems.map(item => {
              const testCount = getTestCount(item);
              const includedTests = getIncludedTests(item);
              const includedProfiles = getIncludedProfiles(item);

              return (
                <div key={item.id} className="test-card">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                      <h5 className="test-title m-0 pe-3">{item.name}</h5>
                    </div>
                    <div className="test-badge text-center rounded">
                      <span className="d-block fw-bold fs-5">{testCount}</span>
                      <small>Tests</small>
                    </div>
                  </div>

                  {/* Tests Included with Icons */}
                  <div className="test-included mb-3">
                    <span className="fw-bold text-dark d-block mb-2">
                      {activeTab === "Packages" ? "Profiles Included:" : "Tests Included:"}
                    </span>
                    {activeTab === "Packages" ? (
                      <div className="package-profiles-scroll" style={{ maxHeight: "180px", overflowY: "auto", paddingRight: "5px" }}>
                        {includedProfiles.map(prof => (
                          <div key={prof.id} style={{ marginBottom: "8px" }}>
                            <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#2d6a4f", marginBottom: "4px" }}>
                              {prof.icon} {prof.name}
                            </div>
                            <div className="d-flex flex-wrap gap-1" style={{ paddingLeft: "8px" }}>
                              {(prof.profile_tests || []).map(pt => pt.tests).filter(Boolean).map(t => (
                                <span key={t.id} className="catalog-test-icon-badge">
                                  {t.icon} {t.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="d-flex flex-wrap gap-1">
                        {includedTests.slice(0, 8).map((t, i) => (
                          <span key={t.id || i} className="catalog-test-icon-badge">
                            {t.icon} {t.name}
                          </span>
                        ))}
                        {includedTests.length > 8 && (
                          <span className="catalog-test-icon-badge" style={{ background: "rgba(45,106,79,0.1)", color: "#2d6a4f", fontWeight: 600 }}>
                            +{includedTests.length - 8} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Know More */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <button type="button" className="btn btn-link test-know-more text-primary fw-medium p-0 text-decoration-none"
                      onClick={() => handleKnowMore(item)}>+ Know More</button>
                  </div>

                  <div className="mb-4"></div>

                  {/* Features */}
                  <div className="d-flex flex-wrap justify-content-between text-muted small test-features mt-auto mb-4">
                    <div className="d-flex flex-column text-center" style={{ width: '30%' }}>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>{item.fasting_rule}</span>
                    </div>
                    <div className="d-flex flex-column text-center" style={{ width: '30%' }}>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>Recommended for {item.recommended_for}</span>
                    </div>
                    <div className="d-flex flex-column text-center" style={{ width: '30%' }}>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>Report: {item.report_time}</span>
                    </div>
                  </div>

                  {/* Footer Pricing */}
                  <div className="d-flex justify-content-between align-items-end pt-3 border-top test-footer">
                    <div>
                      <div className="d-flex align-items-baseline">
                        <h4 className="m-0 fw-bold">₹{item.current_price}</h4>
                        {item.old_price && <span className="text-muted text-decoration-line-through ms-2 small">₹{item.old_price}</span>}
                      </div>
                      {item.discount && (
                        <div className="text-warning small fw-bold mt-1">
                          <i className="bi bi-percent"></i> {item.discount}
                        </div>
                      )}
                    </div>
                    <button className="btn btn-primary rounded px-4 py-2 fw-medium"
                      onClick={() => navigate(`/appoinment?test=${encodeURIComponent(item.name)}`)}>
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center p-5 text-muted w-100 bg-white rounded shadow-sm">
              <h5>No {activeTab.toLowerCase()} available right now.</h5>
              <p>Check back later or select another category.</p>
            </div>
          )}
          </div>

          <button onClick={() => scrollSlider("right")} className="slider-nav-btn slider-nav-next" aria-label="Scroll right">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>

        {/* Know More Modal */}
        {modalItem && (
          <div className="know-more-overlay" onClick={() => setModalItem(null)}>
            <div className="know-more-modal" onClick={e => e.stopPropagation()}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="m-0 fw-bold">{modalItem.icon} {modalItem.name}</h4>
                <button className="btn btn-link text-dark fs-4 p-0" onClick={() => setModalItem(null)}>&times;</button>
              </div>

              {activeTab === "Tests" && (
                <div className="text-center py-3">
                  <div className="know-more-test-icon mx-auto mb-3" style={{ width: "60px", height: "60px", fontSize: "1.8rem" }}>{modalItem.icon}</div>
                  <h5 className="fw-bold">{modalItem.name}</h5>
                  <p className="text-muted">{modalItem.description}</p>
                  <div className="d-flex justify-content-center gap-4 mt-3 text-muted small">
                    <span>🕒 {modalItem.report_time}</span>
                    <span>🩸 {modalItem.fasting_rule}</span>
                    <span>👤 {modalItem.recommended_for}</span>
                  </div>
                </div>
              )}

              {activeTab === "Profiles" && (
                <div>
                  <h6 className="text-muted mb-3">{getTestCount(modalItem)} Tests Included</h6>
                  <div className="know-more-accordion-list">
                    {(modalItem.profile_tests || []).map((pt, idx) => {
                      const t = pt.tests;
                      if (!t) return null;
                      return (
                        <div key={idx} className="know-more-accordion-item">
                          <div className="d-flex align-items-center py-3 px-2">
                            <div className="know-more-test-icon me-3">{t.icon}</div>
                            <div>
                              <h6 className="m-0 fw-bold">{t.name}</h6>
                              <small className="text-muted">{t.description}</small>
                            </div>
                            <span className="ms-auto" style={{ fontSize: "0.8rem", color: "#6c757d" }}>₹{t.current_price}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "Packages" && (
                <div>
                  <h6 className="text-muted mb-3">{getIncludedProfiles(modalItem).length} Profiles · {getTestCount(modalItem)} Total Tests</h6>
                  <div className="know-more-accordion-list">
                    {getIncludedProfiles(modalItem).map((prof, idx) => (
                      <div key={idx} className="know-more-accordion-item">
                        <div className="d-flex align-items-center justify-content-between py-3 px-2" style={{ cursor: "pointer" }}
                          onClick={() => toggleAccordion(idx)}>
                          <div className="d-flex align-items-center">
                            <div className="know-more-test-icon me-3">{prof.icon}</div>
                            <div>
                              <h6 className="m-0 fw-bold">{prof.name}</h6>
                              <small className="text-primary">({(prof.profile_tests || []).length} Tests)</small>
                            </div>
                          </div>
                          <div className={`know-more-chevron ${openAccordions[idx] ? 'open' : ''}`}>&#8963;</div>
                        </div>
                        {openAccordions[idx] && (
                          <div className="ps-5 pb-3">
                            <ul className="list-unstyled mb-0">
                              {(prof.profile_tests || []).map(pt => pt.tests).filter(Boolean).map((t, si) => (
                                <li key={si} className="text-muted mb-1 d-flex align-items-center gap-2">
                                  <span>{t.icon}</span> {t.name}
                                  <span className="ms-auto" style={{ fontSize: "0.75rem" }}>₹{t.current_price}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <div>
                  <h4 className="m-0 fw-bold text-primary">₹{modalItem.current_price}</h4>
                  {modalItem.old_price && <small className="text-muted text-decoration-line-through">₹{modalItem.old_price}</small>}
                </div>
                <button className="btn btn-primary rounded px-4 py-2"
                  onClick={() => { setModalItem(null); navigate(`/appoinment?test=${encodeURIComponent(modalItem.name)}`); }}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesContent;