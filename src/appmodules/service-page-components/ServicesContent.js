import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../admin/services/api";

// Test catalog data — sourced from CellQuest lab menu
const testsData = {
  "Individual": [
    { id: 1, title: "ADA", testCount: 1, included: "ADA (Adenosine Deaminase)", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "300", oldPrice: "700", discount: "57% OFF" },
    { id: 2, title: "AFP", testCount: 1, included: "Alpha-Fetoprotein", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "250", oldPrice: "900", discount: "72% OFF" },
    { id: 3, title: "AMH", testCount: 1, included: "Anti-Müllerian Hormone", fasting: "No Fasting Required", recommended: "Recommended for Female", reportTime: "Report: Same Day", currentPrice: "650", oldPrice: "2000", discount: "68% OFF" },
    { id: 4, title: "Amylase", testCount: 1, included: "Amylase (Serum)", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "90", oldPrice: "300", discount: "70% OFF" },
    { id: 5, title: "Anti-CCP", testCount: 1, included: "Anti-Cyclic Citrullinated Peptide", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "375", oldPrice: "1200", discount: "69% OFF" },
    { id: 6, title: "Beta HCG", testCount: 1, included: "Beta Human Chorionic Gonadotropin", fasting: "No Fasting Required", recommended: "Recommended for Female", reportTime: "Report: Same Day", currentPrice: "200", oldPrice: "700", discount: "71% OFF" },
    { id: 7, title: "CB-NAAT For MTB (Gene Xpert)", testCount: 1, included: "CB-NAAT for Mycobacterium Tuberculosis", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Next Day 8 PM", currentPrice: "1800", oldPrice: "3200", discount: "44% OFF" },
    { id: 8, title: "CBC", testCount: 1, included: "Complete Blood Count", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "80", oldPrice: "250", discount: "68% OFF" },
    { id: 9, title: "CRP", testCount: 1, included: "C-Reactive Protein", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "100", oldPrice: "350", discount: "71% OFF" },
    { id: 10, title: "Culture & Sensitivity - Aerobic Blood", testCount: 1, included: "Blood Culture & Sensitivity (Aerobic)", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: 5 Days", currentPrice: "150", oldPrice: "1300", discount: "88% OFF" },
    { id: 11, title: "Culture and Sensitivity - URINE", testCount: 1, included: "Urine Culture & Sensitivity", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: 3 Days", currentPrice: "150", oldPrice: "700", discount: "79% OFF" },
    { id: 12, title: "Dual Marker", testCount: 1, included: "Dual Marker Test (Pregnancy Screening)", fasting: "No Fasting Required", recommended: "Recommended for Pregnant Women", reportTime: "Report: Same Day", currentPrice: "700", oldPrice: "2500", discount: "72% OFF" },
    { id: 13, title: "Estradiol (E2)", testCount: 1, included: "Estradiol Hormone", fasting: "No Fasting Required", recommended: "Recommended for Female", reportTime: "Report: Same Day", currentPrice: "200", oldPrice: "700", discount: "71% OFF" },
    { id: 14, title: "FSH", testCount: 1, included: "Follicle Stimulating Hormone", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "100", oldPrice: "500", discount: "80% OFF" },
    { id: 15, title: "Hb Electrophoresis by HPLC", testCount: 1, included: "Hemoglobin Electrophoresis (HPLC method)", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "350", oldPrice: "1000", discount: "65% OFF" },
    { id: 16, title: "HBA1c", testCount: 1, included: "Glycated Hemoglobin", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "120", oldPrice: "550", discount: "78% OFF" },
    { id: 17, title: "Insulin - Fasting", testCount: 1, included: "Fasting Insulin", fasting: "10-12 hrs Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "200", oldPrice: "600", discount: "67% OFF" },
    { id: 18, title: "Lactate Dehydrogenase (LDH) Serum", testCount: 1, included: "LDH Serum", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "150", oldPrice: "500", discount: "70% OFF" },
    { id: 19, title: "Luteinising Hormone (LH)", testCount: 1, included: "LH Hormone", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "100", oldPrice: "500", discount: "80% OFF" },
    { id: 20, title: "Lipase (Serum)", testCount: 1, included: "Lipase Enzyme Level", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "120", oldPrice: "500", discount: "76% OFF" },
    { id: 21, title: "Progesterone", testCount: 1, included: "Progesterone Hormone", fasting: "No Fasting Required", recommended: "Recommended for Female", reportTime: "Report: Same Day", currentPrice: "225", oldPrice: "750", discount: "70% OFF" },
    { id: 22, title: "Prolactin", testCount: 1, included: "Prolactin Hormone", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "100", oldPrice: "500", discount: "80% OFF" },
    { id: 23, title: "Prostate Specific Antigen (PSA Free)", testCount: 1, included: "PSA Free", fasting: "No Fasting Required", recommended: "Recommended for Male", reportTime: "Report: Same Day", currentPrice: "350", oldPrice: "1000", discount: "65% OFF" },
    { id: 24, title: "Prostate Specific Antigen (PSA Total)", testCount: 1, included: "PSA Total", fasting: "No Fasting Required", recommended: "Recommended for Male", reportTime: "Report: Same Day", currentPrice: "250", oldPrice: "750", discount: "67% OFF" },
    { id: 25, title: "Quadruple Marker", testCount: 1, included: "Quadruple Marker Test (Pregnancy)", fasting: "No Fasting Required", recommended: "Recommended for Pregnant Women", reportTime: "Report: Next Day 8 PM", currentPrice: "1400", oldPrice: "4500", discount: "69% OFF" },
    { id: 26, title: "Rheumatoid Factor (RA) - Qualitative", testCount: 1, included: "RA Factor Qualitative", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "120", oldPrice: "350", discount: "66% OFF" },
    { id: 27, title: "Rheumatoid Factor (RA) - Quantitative", testCount: 1, included: "RA Factor Quantitative", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "180", oldPrice: "550", discount: "67% OFF" },
    { id: 28, title: "Testosterone - Total", testCount: 1, included: "Total Testosterone", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "175", oldPrice: "550", discount: "68% OFF" },
    { id: 29, title: "Thyroid Profile Free", testCount: 3, included: "FT3, FT4, TSH", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "150", oldPrice: "750", discount: "80% OFF" },
    { id: 30, title: "Thyroid Profile Total", testCount: 3, included: "T3, T4, TSH", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "80", oldPrice: "450", discount: "82% OFF" },
    { id: 31, title: "Torch 10", testCount: 10, included: "TORCH Panel (10 Parameters)", fasting: "No Fasting Required", recommended: "Recommended for Pregnant Women", reportTime: "Report: Same Day", currentPrice: "750", oldPrice: "2500", discount: "70% OFF" },
    { id: 32, title: "Torch 5 IgG", testCount: 5, included: "TORCH IgG Panel", fasting: "No Fasting Required", recommended: "Recommended for Pregnant Women", reportTime: "Report: Same Day", currentPrice: "460", oldPrice: "1800", discount: "74% OFF" },
    { id: 33, title: "Torch 5 IgM", testCount: 5, included: "TORCH IgM Panel", fasting: "No Fasting Required", recommended: "Recommended for Pregnant Women", reportTime: "Report: Same Day", currentPrice: "460", oldPrice: "1800", discount: "74% OFF" },
    { id: 34, title: "Total IgE", testCount: 1, included: "Immunoglobulin E Total", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "200", oldPrice: "800", discount: "75% OFF" },
    { id: 35, title: "Triple Marker", testCount: 1, included: "Triple Marker Test (Pregnancy)", fasting: "No Fasting Required", recommended: "Recommended for Pregnant Women", reportTime: "Report: Same Day", currentPrice: "850", oldPrice: "3000", discount: "72% OFF" },
    { id: 36, title: "Thyroid Stimulating Hormone (TSH)", testCount: 1, included: "TSH Ultra-Sensitive", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "30", oldPrice: "250", discount: "88% OFF" },
    { id: 37, title: "Vitamin B12", testCount: 1, included: "Vitamin B12 (Cyanocobalamin)", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "180", oldPrice: "900", discount: "80% OFF" },
    { id: 38, title: "25-Hydroxy Vitamin D (Vitamin-D)", testCount: 1, included: "Vitamin D Total", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "280", oldPrice: "1200", discount: "77% OFF" },
  ],
  "Package": [
    { id: 101, title: "Kidney Function Test with Electrolytes", testCount: 12, included: "Urea, Creatinine, Uric Acid, BUN, Na+, K+, Cl+, Phosphorus, Calcium, eGFR", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "140", oldPrice: "600", discount: "77% OFF" },
    { id: 102, title: "AMH Plus", testCount: 9, included: "LH, FSH, PRL, E2, Testosterone Total & Free, AMH, TSH, Progesterone", fasting: "No Fasting Required", recommended: "Recommended for Female", reportTime: "Report: Same Day", currentPrice: "1400", oldPrice: "4000", discount: "65% OFF" },
    { id: 103, title: "Antenatal Panel - Basic", testCount: 9, included: "Blood Group, Urine R/M, HbsAg, HIV 1&2, Anti HCV, VDRL, TSH, CBC, Glucose-Random", fasting: "No Fasting Required", recommended: "Recommended for Pregnant Women", reportTime: "Report: Same Day", currentPrice: "320", oldPrice: "1000", discount: "68% OFF" },
    { id: 104, title: "Antenatal Panel - Premium", testCount: 10, included: "Blood Group, Urine R/M, HBsAg, HIV, Anti HCV, VDRL, Thyroid Profile, CBC, Glucose, Hb Electrophoresis", fasting: "No Fasting Required", recommended: "Recommended for Pregnant Women", reportTime: "Report: Same Day", currentPrice: "800", oldPrice: "2800", discount: "71% OFF" },
    { id: 105, title: "Antenatal Panel - Special", testCount: 9, included: "Blood Group, Urine R/M, HBsAg, HIV, Anti HCV, VDRL, Thyroid Profile Total, CBC, Glucose-R", fasting: "No Fasting Required", recommended: "Recommended for Pregnant Women", reportTime: "Report: Same Day", currentPrice: "550", oldPrice: "1800", discount: "69% OFF" },
    { id: 106, title: "Arthritis One", testCount: 8, included: "CBC, RF, C-RP, ANA, LFT, KFT-Mini, ASO, TSH", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "600", oldPrice: "2000", discount: "70% OFF" },
    { id: 107, title: "Arthritis One Plus", testCount: 10, included: "CBC, RF, C-RP, ANA(IFA), TSH, LFT, KFT-Mini, ASO, Anti-CCP, Vitamin-D", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "1200", oldPrice: "4000", discount: "70% OFF" },
    { id: 108, title: "Arthritis Basic Panel", testCount: 4, included: "C-RP, RA Factor-Qualitative, Uric Acid, ASO", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "200", oldPrice: "700", discount: "71% OFF" },
    { id: 109, title: "Dengue Profile (Quantitative)", testCount: 3, included: "Dengue IgG, IgM, NS1 Antigen (ELISA)", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "500", oldPrice: "1800", discount: "72% OFF" },
    { id: 110, title: "Fertility Profile 3", testCount: 6, included: "LH, FSH, PRL, E2, TSH, Testosterone Total", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "500", oldPrice: "2500", discount: "80% OFF" },
    { id: 111, title: "Fertility Profile 1", testCount: 3, included: "LH, FSH, Prolactin", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "275", oldPrice: "1000", discount: "73% OFF" },
    { id: 112, title: "Fertility Profile 2", testCount: 5, included: "LH, FSH, PRL, E2, TSH", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "375", oldPrice: "1500", discount: "75% OFF" },
    { id: 113, title: "Fertility Profile 4", testCount: 7, included: "LH, FSH, PRL, E2, TSH, DHEAS, Progesterone", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "850", oldPrice: "3000", discount: "72% OFF" },
    { id: 114, title: "Fever Profile 2", testCount: 6, included: "CBC, ESR, P/S, Urine R/M, Malaria Antigen, Widal Test", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "210", oldPrice: "750", discount: "72% OFF" },
    { id: 115, title: "Fever Profile 3", testCount: 6, included: "CBC, ESR, Urine R/M, Malaria Antigen, Typhi Dot, ALT/SGPT", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "300", oldPrice: "1200", discount: "75% OFF" },
    { id: 116, title: "Fever Profile 4", testCount: 5, included: "CBC, ESR, Malaria Antigen, Chikungunya IgG/IgM, Dengue IgG/IgM", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "600", oldPrice: "2000", discount: "70% OFF" },
    { id: 117, title: "Fever Profile 1", testCount: 3, included: "Malaria Parasite Identification, CBC, Widal Test", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "150", oldPrice: "500", discount: "70% OFF" },
    { id: 118, title: "CellQ Advance", testCount: 10, included: "CBC, Glucose(F), KFT, Electrolyte, Lipid Profile, LFT, Thyroid, HbA1c, Urine R/M, Iron Studies", fasting: "10-12 hrs Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "550", oldPrice: "2500", discount: "78% OFF" },
    { id: 119, title: "CellQ Premium", testCount: 11, included: "CBC, Glucose(F), KFT, Electrolyte, Lipid Profile, LFT, Thyroid, HbA1c, Urine R/M, Iron Studies, Vitamin Profile", fasting: "10-12 hrs Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "800", oldPrice: "3000", discount: "73% OFF" },
    { id: 120, title: "CellQ Platinum", testCount: 13, included: "CBC, Glucose(F), KFT, Electrolyte, Lipid Profile, LFT, Thyroid, HbA1c, Urine R/M, Iron Studies, Vitamin Profile, CRP, RA Factor", fasting: "10-12 hrs Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "900", oldPrice: "4000", discount: "78% OFF" },
    { id: 121, title: "CellQ Basic", testCount: 7, included: "CBC, Glucose(F), KFT, Electrolyte, Lipid Profile, LFT, Thyroid", fasting: "10-12 hrs Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "350", oldPrice: "2000", discount: "83% OFF" },
    { id: 122, title: "HPV Profile", testCount: 2, included: "HPV PCR, LBC PAP Test", fasting: "No Fasting Required", recommended: "Recommended for Female", reportTime: "Report: Same Day", currentPrice: "1400", oldPrice: "3000", discount: "53% OFF" },
    { id: 123, title: "Lipid Profile", testCount: 9, included: "Cholesterol, Triglycerides, HDL, Non-HDL, LDL, VLDL, Chol/HDL Ratio, LDL/HDL, HDL/LDL Ratio", fasting: "10-12 hrs Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "90", oldPrice: "600", discount: "85% OFF" },
    { id: 124, title: "Liver Function Test with GGT", testCount: 12, included: "Bilirubin Total/Direct/Indirect, ALT, AST, ALP, GGT, Total Protein, Albumin, Globulin, A/G Ratio", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "120", oldPrice: "600", discount: "80% OFF" },
    { id: 125, title: "Pre-Operative Panel", testCount: 11, included: "CBC, LFT, KFT, Electrolyte, Glucose-R, HIV, HbsAg, HCV, PT-INR, aPTT, Urine R/M", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "600", oldPrice: "2000", discount: "70% OFF" },
    { id: 126, title: "Viral Profile - Quantitative", testCount: 4, included: "HCV, HIV, HbsAg, VDRL (all by CLIA)", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "400", oldPrice: "1500", discount: "73% OFF" },
    { id: 127, title: "Vitamin Profile", testCount: 2, included: "Vitamin D, Vitamin B12", fasting: "No Fasting Required", recommended: "Recommended for Everyone", reportTime: "Report: Same Day", currentPrice: "350", oldPrice: "2000", discount: "83% OFF" },
  ]
};

const categories = Object.keys(testsData);

function ServicesContent() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Individual");
  const [modalTest, setModalTest] = useState(null);
  const [openAccordions, setOpenAccordions] = useState({});
  const [priceOverrides, setPriceOverrides] = useState({});
  const sliderRef = useRef(null);

  const [dbTests, setDbTests] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);

  // Fetch admin-managed tests AND price overrides from Supabase
  useEffect(() => {
    const fetchFromDB = async () => {
      try {
        const { data } = await supabase.from("test_prices").select("*");
        if (data && data.length > 0) {
          const priceMap = {};
          const dynamicTests = [];
          const dynamicTags = new Set();

          data.forEach((row) => {
            // Price override for hardcoded tests
            priceMap[row.test_name] = row;

            // If this DB test has tags, it's a dynamically managed catalog item
            if (row.tags) {
              row.tags.split(",").forEach(tag => dynamicTags.add(tag.trim()));
              dynamicTests.push(row);
            }
          });

          setPriceOverrides(priceMap);
          setDbTests(dynamicTests);
          // Only add categories NOT already in static list
          const newCats = [...dynamicTags].filter(t => !categories.includes(t));
          setDbCategories(newCats);
        }
      } catch (err) {
        console.error("Failed to fetch test data from DB", err);
      }
    };
    fetchFromDB();
  }, []);

  // Reset slider to start when category changes
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  }, [activeCategory]);

  // All categories = static + any new dynamic ones from DB
  const allCategories = [...categories, ...dbCategories];

  // Build the current test list: merge hardcoded + DB tests for this category
  const staticTests = (testsData[activeCategory] || []).map((test) => {
    const override = priceOverrides[test.title];
    if (override) {
      return {
        ...test,
        currentPrice: override.current_price || test.currentPrice,
        oldPrice: override.old_price || test.oldPrice,
        discount: override.discount || test.discount,
      };
    }
    return test;
  });

  // Collect static test names to avoid duplicates
  const staticNames = new Set(staticTests.map(t => t.title));

  // DB-only tests (admin added new ones not in static data)
  const extraDbTests = dbTests
    .filter(t => {
      const tags = (t.tags || "").split(",").map(s => s.trim());
      return tags.includes(activeCategory) && !staticNames.has(t.test_name);
    })
    .map(t => ({
      id: `db-${t.id}`,
      title: t.test_name,
      testCount: t.test_count || "1",
      included: t.included_tests || t.test_name,
      fasting: t.fasting_rule || "No Fasting Required",
      recommended: `Recommended for ${t.recommended_for || "Everyone"}`,
      reportTime: `Report: ${t.report_time || "N/A"}`,
      currentPrice: String(t.current_price),
      oldPrice: t.old_price ? String(t.old_price) : undefined,
      discount: t.discount,
      type: t.type,
    }));

  const currentTests = [...staticTests, ...extraDbTests];

  const handleKnowMore = (test) => {
    setModalTest(test);
    setOpenAccordions({});
  };

  const toggleAccordion = (index) => {
    setOpenAccordions(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="container-fluid container-service py-5 bg-light-mint">
      <div className="container pt-5">

        {/* Dynamic Header */}
        <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "800px" }}>
          <h1 className="display-6 mb-4 fw-bold text-primary">
            {activeCategory} packages in Gurgaon
          </h1>
        </div>

        {/* Category Pill Tabs */}
        <div className="d-flex flex-wrap justify-content-center mb-5 wow fadeInUp" data-wow-delay="0.2s">
        {allCategories.map((cat) => (
            <button
              key={cat}
              className={`btn rounded-pill px-4 py-2 m-2 fw-medium test-category-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => { setActiveCategory(cat); setModalTest(null); }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Card Slider */}
        <div className="test-slider-container wow fadeInUp" data-wow-delay="0.3s" ref={sliderRef}>
          {currentTests.length > 0 ? (
            currentTests.map((test) => (
              <div key={test.id} className="test-card">

                {/* Card Header */}
                <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                  <h5 className="test-title m-0 pe-3">{test.title}</h5>
                  <div className="test-badge text-center rounded">
                    <span className="d-block fw-bold fs-5">{test.testCount}</span>
                    <small>Tests</small>
                  </div>
                </div>

                {/* Tests Included */}
                <div className="test-included mb-4">
                  <span className="fw-bold text-dark">Tests Included:</span> <span className="text-muted">{test.included.replace(/\s*\.\.\.more/gi, "")}</span>
                </div>

                {/* Know More row */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button
                    type="button"
                    className="btn btn-link test-know-more text-primary fw-medium p-0 text-decoration-none"
                    onClick={() => handleKnowMore(test)}
                  >
                    + Know More
                  </button>
                </div>

                <div className="mb-4"></div>

                {/* Features (Icons text) */}
                <div className="d-flex flex-wrap justify-content-between text-muted small test-features mt-auto mb-4">
                  <div className="d-flex flex-column text-center" style={{ width: '30%' }}>
                    <span className="text-muted" style={{ fontSize: '0.7rem' }}>{test.fasting}</span>
                  </div>
                  <div className="d-flex flex-column text-center" style={{ width: '30%' }}>
                    <span className="text-muted" style={{ fontSize: '0.7rem' }}>{test.recommended}</span>
                  </div>
                  <div className="d-flex flex-column text-center" style={{ width: '30%' }}>
                    <span className="text-muted" style={{ fontSize: '0.7rem' }}>{test.reportTime}</span>
                  </div>
                </div>

                {/* Footer Pricing & Button */}
                <div className="d-flex justify-content-between align-items-end pt-3 border-top test-footer">
                  <div>
                    {test.isPerPerson ? (
                      <>
                        <div className="d-flex align-items-baseline">
                          <h4 className="m-0 fw-bold text-primary">₹{test.currentPrice}</h4>
                          <span className="text-primary ms-1 small">per person</span>
                        </div>
                        <div className="mt-1 d-flex align-items-baseline">
                          <span className="fw-bold text-dark me-1">₹{test.totalPrice}</span>
                          <span className="text-muted text-decoration-line-through small">₹{test.oldPrice}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex align-items-baseline">
                          <h4 className="m-0 fw-bold">₹{test.currentPrice}</h4>
                          <span className="text-muted text-decoration-line-through ms-2 small">₹{test.oldPrice}</span>
                        </div>
                        {test.discount && (
                          <div className="text-warning small fw-bold mt-1">
                            <i className="bi bi-percent"></i> {test.discount}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <button className="btn btn-primary rounded px-4 py-2 fw-medium" onClick={() => navigate(`/appoinment?test=${encodeURIComponent(test.title)}`)}>Book Now</button>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center p-5 text-muted w-100 bg-white rounded shadow-sm">
              <h5>No tests available for {activeCategory} right now.</h5>
              <p>Check back later or select another category.</p>
            </div>
          )}
        </div>

        {/* Know More Modal */}
        {modalTest && (
          <div className="know-more-overlay" onClick={() => setModalTest(null)}>
            <div className="know-more-modal" onClick={(e) => e.stopPropagation()}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="m-0 fw-bold">Test Included: {modalTest.testCount} Tests</h4>
                <button className="btn btn-link text-dark fs-4 p-0" onClick={() => setModalTest(null)}>
                  &times;
                </button>
              </div>
              {(() => {
                const displayTests = modalTest.detailedTests || (modalTest.testCount === 1 ? [{
                  name: modalTest.included,
                  subCount: 1,
                  subtests: [modalTest.included]
                }] : null);

                return displayTests ? (
                  <div className="know-more-accordion-list">
                    {displayTests.map((dt, idx) => (
                      <div key={idx} className="know-more-accordion-item">
                        <div
                          className="d-flex align-items-center justify-content-between py-3 px-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleAccordion(idx)}
                        >
                          <div className="d-flex align-items-center">
                            <div className="know-more-test-icon me-3">🧪</div>
                            <div>
                              <h6 className="m-0 fw-bold">{dt.name}</h6>
                              <small className="text-primary">({dt.subCount} Test)</small>
                            </div>
                          </div>
                          <div className={`know-more-chevron ${openAccordions[idx] ? 'open' : ''}`}>
                            &#8963;
                          </div>
                        </div>
                        {openAccordions[idx] && (
                          <div className="ps-5 pb-3">
                            <ul className="list-unstyled mb-0">
                              {dt.subtests.map((st, si) => (
                                <li key={si} className="text-muted mb-1">• {st}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted py-4">
                    <p>Detailed test information will be available soon.</p>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center wow fadeInUp" data-wow-delay="0.4s">
          <Link to="" className="btn bg-light-mint text-primary fw-bold py-3 px-5 rounded-pill view-all-btn">
            View All Tests for {activeCategory}
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ServicesContent;