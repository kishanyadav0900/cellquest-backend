import React, { useState } from "react";
import { Link } from "react-router-dom";

// Mock Data for tests. 
const testsData = {
  "Full Body Checkup": [
    {
      id: 11,
      title: "Make India Healthy Package 2026",
      testCount: 7,
      included: "Calcium Total, Serum, Cholesterol-Total, Serum, Creatinine, Serum, SGOT/AST ...more",
      fasting: "10 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Reports within 11 Hours",
      currentPrice: "99",
      oldPrice: "499"
    },
    {
      id: 12,
      title: "Live More Screening Package With Free Sugar Test",
      testCount: 67,
      included: "Cholesterol-Total, Serum, Blood Glucose Fasting, Triglycerides, Serum, Liver Function Test ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Reports within 12 Hours",
      isPerPerson: true,
      currentPrice: "475",
      totalPrice: "950",
      oldPrice: "2376",
      membersDropdown: "2 Members",
      addonText: "+ Add 1 more → Pay ₹463/person!"
    },
    {
      id: 13,
      title: "Healthy India 2026 Full Body Checkup With Free Iron Test",
      testCount: 72,
      included: "Cholesterol-Total, Serum, Blood Glucose Fasting, Iron, Serum, Triglycerides, Serum ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Reports within 12 Hours",
      isPerPerson: true,
      currentPrice: "641",
      totalPrice: "1281",
      oldPrice: "3660",
      membersDropdown: "2 Members",
      addonText: "+ Add 1 more → Pay ₹604/person!"
    },
    {
      id: 14,
      title: "Healthians Prime Care Diabetic Checkup",
      testCount: 71,
      included: "Blood Glucose Fasting, Liver Function Test, Kidney Function Test Advance, HbA1c ...more",
      fasting: "10 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Reports within 12 Hours",
      currentPrice: "1179",
      oldPrice: "3929",
      discount: "UPTO 70% OFF"
    },
    {
      id: 15,
      title: "Healthy India 2026 Full Body Checkup Lite",
      testCount: 80,
      included: "Blood Glucose Fasting, TSH Ultra - Sensitive, Vitamin D Total-25 Hydroxy, Liver Function Test ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Reports within 12 Hours",
      isPerPerson: true,
      currentPrice: "910",
      totalPrice: "1819",
      oldPrice: "9096",
      membersDropdown: "2 Members",
      addonText: "+ Add 1 more → Pay ₹864/person!"
    },
    {
      id: 16,
      title: "Healthy India 2026 Full Body Checkup Advance",
      testCount: 83,
      included: "Blood Glucose Fasting, Vitamin B12 Cyanocobalamin, Vitamin D Total-25 Hydroxy, Liver Function Test ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Reports within 12 Hours",
      currentPrice: "2234",
      oldPrice: "7448",
      discount: "UPTO 70% OFF"
    },
    {
      id: 17,
      title: "Healthy India 2026 Full Body Checkup Advance (With HbA1c)",
      testCount: 85,
      included: "Blood Glucose Fasting, Vitamin B12 Cyanocobalamin, Vitamin D Total-25 Hydroxy, Liver Function Test ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Reports within 12 Hours",
      isPerPerson: true,
      currentPrice: "1560",
      totalPrice: "3120",
      oldPrice: "16420",
      membersDropdown: "2 Members",
      addonText: "+ Add 1 more → Pay ₹1396/person!"
    },
    {
      id: 18,
      title: "Healthy India 2026 Full Body Checkup Advance Plus",
      testCount: 89,
      included: "Blood Glucose Fasting, Vitamin B12 Cyanocobalamin, Vitamin D Total-25 Hydroxy, Liver Function Test ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Reports within 12 Hours",
      isPerPerson: true,
      currentPrice: "1572",
      totalPrice: "3144",
      oldPrice: "17466",
      membersDropdown: "2 Members",
      addonText: "+ Add 1 more → Pay ₹1485/person!"
    },
    {
      id: 19,
      title: "Healthy India 2026 Full Body Checkup Prime",
      testCount: 92,
      included: "RA Test Rheumatoid Arthritis Factor, Quantitative, Blood Glucose Fasting, Vitamin B12 Cyanocobalamin, Vitamin D Total-25 Hydroxy ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Reports within 12 Hours",
      isPerPerson: true,
      currentPrice: "1805",
      totalPrice: "3610",
      oldPrice: "18048",
      membersDropdown: "2 Members",
      addonText: "+ Add 1 more → Pay ₹1715/person!"
    },
    {
      id: 20,
      title: "Be Healthy Comprehensive Package (With HbA1c)",
      testCount: 93,
      included: "RA Test Rheumatoid Arthritis Factor, Quantitative, Amylase Enzymatic, Serum, CRP (C Reactive Protein) Quantitative, Serum, Blood Glucose Fasting ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Reports within 12 Hours",
      isPerPerson: true,
      currentPrice: "1773",
      totalPrice: "3545",
      oldPrice: "19696",
      membersDropdown: "2 Members",
      addonText: "+ Add 1 more → Pay ₹1674/person!"
    },
    {
      id: 21,
      title: "Healthians Winter Wellness Package - Male",
      testCount: 99,
      included: "RA Test Rheumatoid Arthritis Factor, Quantitative, Amylase Enzymatic, Serum, CEA-Carcino Embryonic Antigen (Colorectal Cancer Marker Test), ESR Automated ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Male",
      reportTime: "Reports within 12 Hours",
      isPerPerson: true,
      currentPrice: "2130",
      totalPrice: "4260",
      oldPrice: "23666",
      membersDropdown: "2 Members",
      addonText: "Group Complete! 🎉 Price Locked: ₹2130/person!",
      addonTextClass: "text-success fw-bold"
    },
    {
      id: 22,
      title: "Healthians Winter Wellness Package - Female",
      testCount: 102,
      included: "RA Test Rheumatoid Arthritis Factor, Quantitative, Amylase Enzymatic, Serum, CEA-Carcino Embryonic Antigen (Colorectal Cancer Marker Test), CPK, Total ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Female",
      reportTime: "Reports within 13 Hours",
      isPerPerson: true,
      currentPrice: "2130",
      totalPrice: "4260",
      oldPrice: "23666",
      membersDropdown: "2 Members",
      addonText: "Group Complete! 🎉 Price Locked: ₹2130/person!",
      addonTextClass: "text-success fw-bold"
    }
  ],
  "Fever": [
    {
      id: 31,
      title: "Healthians Advance Fever Package",
      testCount: 71,
      included: "Chikungunya IgM Antibody, COMPLETE BLOOD COUNT, CRP (C Reactive Protein) Quantitative, Serum, Dengue IgG Antibody (Immunoassay) ...more",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 22 Hours",
      currentPrice: "2394",
      oldPrice: "7981",
      discount: "UPTO 70% OFF"
    },
    {
      id: 32,
      title: "Healthians Advance Fever Package With H1N1",
      testCount: 73,
      included: "Chikungunya IgM Antibody, COMPLETE BLOOD COUNT, CRP (C Reactive Protein) Quantitative, Serum, Dengue IgG Antibody (Immunoassay) ...more",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 22 Hours",
      currentPrice: "3999",
      oldPrice: "13331",
      discount: "UPTO 70% OFF"
    },
    {
      id: 33,
      title: "Healthians Early Fever Package",
      testCount: 50,
      included: "COMPLETE BLOOD COUNT, Dengue NS1 Antigen Detection - RAPID Card, Malaria Parasite detection by Smear examination, SGOT/AST ...more",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 17 Hours",
      currentPrice: "899",
      oldPrice: "2997",
      discount: "UPTO 70% OFF"
    },
    {
      id: 34,
      title: "Malaria Test",
      testCount: 2,
      included: "Malaria Parasite detection by Smear examination, Malarial Antigen, Vivax & Falciparum",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 18 Hours",
      currentPrice: "301",
      oldPrice: "1005",
      discount: "UPTO 70% OFF"
    },
    {
      id: 35,
      title: "Typhoid Test",
      testCount: 29,
      included: "COMPLETE BLOOD COUNT, Typhi Dot IgM, Widal Profile",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 16 Hours",
      currentPrice: "459",
      oldPrice: "1529",
      discount: "UPTO 70% OFF"
    },
    {
      id: 36,
      title: "Viral Marker Test",
      testCount: 54,
      included: "Chikungunya IgM Antibody, COMPLETE BLOOD COUNT, CRP (C Reactive Protein) Quantitative, Serum, Dengue IgM Antibody (Immunoassay) ...more",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 22 Hours",
      currentPrice: "2201",
      oldPrice: "7338",
      discount: "UPTO 70% OFF"
    }
  ],
  "STD": [
    {
      id: 41,
      title: "HIV Screening Package",
      testCount: 61,
      included: "Blood Glucose Fasting, COMPLETE BLOOD COUNT, HIV 1&2 Antibodies, Kidney Function Test Advance ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 18 Hours",
      currentPrice: "1431",
      oldPrice: "4771",
      discount: "UPTO 70% OFF"
    },
    {
      id: 42,
      title: "STD Screening Package",
      testCount: 64,
      included: "Anti HCV Antibody (qualitative), Blood Glucose Fasting, COMPLETE BLOOD COUNT, Hepatitis B Virus (HBV) HbsAg-Screening Surface Antigen ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 18 Hours",
      currentPrice: "1631",
      oldPrice: "5438",
      discount: "UPTO 70% OFF"
    },
    {
      id: 43,
      title: "STI Detection Package",
      testCount: 4,
      included: "Anti HCV Antibody (qualitative), Hepatitis B Virus (HBV) HbsAg-Screening Surface Antigen, HIV 1&2 Antibodies, RPR",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 18 Hours",
      isPerPerson: true,
      currentPrice: "426",
      totalPrice: "851",
      oldPrice: "3866",
      membersDropdown: "2 Members",
      addonText: "+ Add 1 more → Pay ₹406/person!"
    },
    {
      id: 44,
      title: "HIV-1 RNA Viral Load By PCR - Quantitative Test",
      testCount: 1,
      included: "HIV-1 RNA Viral Load By PCR - Quantitative Test",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 5 D , 10 H",
      currentPrice: "5564",
      oldPrice: "18548",
      discount: "UPTO 70% OFF"
    },
    {
      id: 45,
      title: "HIV 1&2 Antibodies",
      testCount: 1,
      included: "HIV 1&2 Antibodies",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 18 Hours",
      currentPrice: "379",
      oldPrice: "1262",
      discount: "UPTO 70% OFF"
    },
    {
      id: 46,
      title: "HIV-1 & 2 Antibody By Western Blot",
      testCount: 1,
      included: "HIV-1 & 2 Antibody By Western Blot",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 2 D , 7 H",
      currentPrice: "1686",
      oldPrice: "5619",
      discount: "UPTO 70% OFF"
    }
  ],
  "Vitamins": [
    {
      id: 51,
      title: "Vitamin Deficiency Assessment Package",
      testCount: 2,
      included: "Vitamin B12 Cyanocobalamin, Vitamin D Total-25 Hydroxy",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "831",
      oldPrice: "2771",
      discount: "UPTO 70% OFF"
    },
    {
      id: 52,
      title: "Vitamin Plus Package",
      testCount: 3,
      included: "Calcium Total, Serum, Vitamin B12 Cyanocobalamin, Vitamin D Total-25 Hydroxy",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "474",
      oldPrice: "1580",
      discount: "UPTO 70% OFF"
    },
    {
      id: 53,
      title: "Vitamin Screening",
      testCount: 2,
      included: "Vitamin B12 Cyanocobalamin, Vitamin D Total-25 Hydroxy",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "677",
      oldPrice: "2257",
      discount: "UPTO 70% OFF"
    },
    {
      id: 54,
      title: "Vitamin D-1, 25-Dihydroxy",
      testCount: 1,
      included: "Vitamin D-1, 25-Dihydroxy",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 3 D",
      currentPrice: "2424",
      oldPrice: "8081",
      discount: "UPTO 70% OFF"
    },
    {
      id: 55,
      title: "Vitamin D Total-25 Hydroxy",
      testCount: 1,
      included: "Vitamin D Total-25 Hydroxy",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "440",
      oldPrice: "1467",
      discount: "UPTO 70% OFF"
    },
    {
      id: 56,
      title: "Vitamin B12 Cyanocobalamin",
      testCount: 1,
      included: "Vitamin B12 Cyanocobalamin",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 12 Hours",
      currentPrice: "571",
      oldPrice: "1905",
      discount: "UPTO 70% OFF"
    }
  ],
  "Diabetes": [
    {
      id: 61,
      title: "Advance Diabetes Monitoring (Senior Female)",
      testCount: 50,
      included: "Blood Glucose Fasting, E2 - Female Reproductive Hormone Test, HbA1c, Kidney Function Test Advance ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Female",
      reportTime: "Report in 15 Hours",
      currentPrice: "1959",
      oldPrice: "6529",
      discount: "UPTO 70% OFF"
    },
    {
      id: 62,
      title: "Advance Diabetes Monitoring (Senior Male)",
      testCount: 49,
      included: "Blood Glucose Fasting, HbA1c, Kidney Function Test Advance, Lipid Profile ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Male",
      reportTime: "Report in 15 Hours",
      currentPrice: "2211",
      oldPrice: "7371",
      discount: "UPTO 70% OFF"
    },
    {
      id: 63,
      title: "Diabetes Gold Screening Package",
      testCount: 7,
      included: "Blood Glucose Fasting, C-Peptide, Serum (Fasting), GAD - 65 Antibody (for Diabetes Type 1), HbA1c ...more",
      fasting: "10 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 3 D, 5 H",
      isPerPerson: true,
      currentPrice: "1753",
      totalPrice: "3505",
      oldPrice: "12982",
      membersDropdown: "2 Members",
      addonText: "Group Complete! 🎉 Price Locked: ₹1753/person!",
      addonTextClass: "text-success fw-bold"
    },
    {
      id: 64,
      title: "Diabetes Platinum Screening Package",
      testCount: 11,
      included: "Blood Glucose Fasting, C-Peptide, Serum (Fasting), GAD - 65 Antibody (for Diabetes Type 1), HbA1c ...more",
      fasting: "10 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 8 D",
      currentPrice: "7060",
      oldPrice: "23532",
      discount: "UPTO 70% OFF"
    },
    {
      id: 65,
      title: "Diabetes Screening",
      testCount: 24,
      included: "HbA1c, Random Blood Sugar, Urine Routine & Microscopy Extended",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 11 Hours",
      currentPrice: "559",
      oldPrice: "1862",
      discount: "UPTO 70% OFF"
    },
    {
      id: 66,
      title: "Healthians Diabetic Checkup",
      testCount: 44,
      included: "Blood Glucose Fasting, HbA1c, Kidney Function Test Advance, Lipid Profile ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 15 Hours",
      currentPrice: "840",
      oldPrice: "2800",
      discount: "UPTO 70% OFF"
    },
    {
      id: 67,
      title: "Routine Diabetes Care",
      testCount: 59,
      included: "Blood Glucose Fasting, COMPLETE BLOOD COUNT, HbA1c, Kidney Function Test Advance ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 15 Hours",
      currentPrice: "1304",
      oldPrice: "4348",
      discount: "UPTO 70% OFF"
    },
    {
      id: 68,
      title: "Random Blood Sugar",
      testCount: 1,
      included: "Random Blood Sugar",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 9 Hours",
      currentPrice: "99",
      oldPrice: "329",
      discount: "UPTO 70% OFF"
    },
    {
      id: 69,
      title: "Blood Glucose Fasting",
      testCount: 1,
      included: "Blood Glucose Fasting",
      fasting: "10 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 10 Hours",
      currentPrice: "94",
      oldPrice: "314",
      discount: "UPTO 70% OFF"
    }
  ],
  "Heart": [
    {
      id: 71,
      title: "Cardiac Health Assessment Package",
      testCount: 24,
      included: "CRP (C Reactive Protein) Quantitative, Serum, Homocysteine, HsCRP High Sensitivity CRP, Kidney Function Test Advance ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 12 Hours",
      currentPrice: "1426",
      oldPrice: "4752",
      discount: "UPTO 70% OFF"
    },
    {
      id: 72,
      title: "Healthians Extended Heart Care Package",
      testCount: 70,
      included: "COMPLETE BLOOD COUNT, CPK, Total, CRP (C Reactive Protein) Quantitative, Serum, Homocysteine ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "2851",
      oldPrice: "9505",
      discount: "UPTO 70% OFF"
    },
    {
      id: 73,
      title: "Lipid Profile Advance",
      testCount: 9,
      included: "CHOL/HDL RATIO, Cholesterol-Total, Serum, HDL / LDL Cholesterol Ratio, HDL Cholesterol Direct ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "497",
      oldPrice: "1657",
      discount: "UPTO 70% OFF"
    },
    {
      id: 74,
      title: "Lipid Profile-Extended",
      testCount: 10,
      included: "Apolipoproteins B/A1, Serum (Apolipoproteins B, A1, B/A1 Ratio), CHOL/HDL RATIO, Cholesterol-Total, Serum, HDL / LDL Cholesterol Ratio ...more",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 12 Hours",
      currentPrice: "604",
      oldPrice: "2014",
      discount: "UPTO 70% OFF"
    },
    {
      id: 75,
      title: "LDL Cholesterol -Direct",
      testCount: 1,
      included: "LDL Cholesterol -Direct",
      fasting: "10 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 7 Hours",
      currentPrice: "427",
      oldPrice: "1424",
      discount: "UPTO 70% OFF"
    },
    {
      id: 76,
      title: "HDL Cholesterol Direct",
      testCount: 1,
      included: "HDL Cholesterol Direct",
      fasting: "10 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 8 Hours",
      currentPrice: "143",
      oldPrice: "476",
      discount: "UPTO 70% OFF"
    },
    {
      id: 77,
      title: "Cholesterol-Total, Serum",
      testCount: 1,
      included: "Cholesterol-Total, Serum",
      fasting: "10 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 11 Hours",
      currentPrice: "200",
      oldPrice: "667",
      discount: "UPTO 70% OFF"
    }
  ],
  "Thyroid": [
    {
      id: 81,
      title: "Thyroid Package - Advance",
      testCount: 5,
      included: "PTH-Intact Molecule Parathyroid Hormone, T3, Free Free Tri-Iodothyronine, T4, Free Free Thyroxine, TSH Ultra - Sensitive ...more",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 16 Hours",
      currentPrice: "1168",
      oldPrice: "3895",
      discount: "UPTO 70% OFF"
    },
    {
      id: 82,
      title: "Thyroid Package - Preventive",
      testCount: 12,
      included: "Lipid Profile, Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)",
      fasting: "12 hrs Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 12 Hours",
      currentPrice: "487",
      oldPrice: "1624",
      discount: "UPTO 70% OFF"
    },
    {
      id: 83,
      title: "Thyroid Profile-Free (FT3, FT4 & TSH)",
      testCount: 3,
      included: "T3, Free Free Tri-Iodothyronine, T4, Free Free Thyroxine, TSH Ultra - Sensitive",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 12 Hours",
      currentPrice: "624",
      oldPrice: "2081",
      discount: "UPTO 70% OFF"
    },
    {
      id: 84,
      title: "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)",
      testCount: 3,
      included: "T3, Total Tri Iodothyronine, T4, Total Thyroxine, TSH Ultra - Sensitive",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 11 Hours",
      currentPrice: "427",
      oldPrice: "1423",
      discount: "UPTO 70% OFF"
    },
    {
      id: 85,
      title: "TSH Ultra - Sensitive",
      testCount: 1,
      included: "TSH Ultra - Sensitive",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 11 Hours",
      currentPrice: "334",
      oldPrice: "1114",
      discount: "UPTO 70% OFF"
    }
  ],
  "Kidney": [
    {
      id: 91,
      title: "Kidney Function Test Advance",
      testCount: 11,
      included: "BUN Urea Nitrogen, Serum, BUN/Creatinine Ratio, Calcium Total, Serum, Chlorides, Serum ...more",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 15 Hours",
      currentPrice: "427",
      oldPrice: "1423",
      discount: "UPTO 70% OFF"
    },
    {
      id: 92,
      title: "Urea, Serum",
      testCount: 1,
      included: "Urea, Serum",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 11 Hours",
      currentPrice: "163",
      oldPrice: "543",
      discount: "UPTO 70% OFF"
    },
    {
      id: 93,
      title: "Creatinine, Serum",
      testCount: 1,
      included: "Creatinine, Serum",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 10 Hours",
      currentPrice: "190",
      oldPrice: "633",
      discount: "UPTO 70% OFF"
    },
    {
      id: 94,
      title: "BUN Urea Nitrogen, Serum",
      testCount: 1,
      included: "BUN Urea Nitrogen, Serum",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 9 Hours",
      currentPrice: "154",
      oldPrice: "514",
      discount: "UPTO 70% OFF"
    },
    {
      id: 95,
      title: "Albumin, Serum",
      testCount: 1,
      included: "Albumin, Serum",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 9 Hours",
      currentPrice: "130",
      oldPrice: "433",
      discount: "UPTO 70% OFF"
    }
  ],
  "Allergy": [
    {
      id: 101,
      title: "Allergy Screening Package",
      testCount: 2,
      included: "Absolute Eosinophil Count, Blood, IgE Total antibody",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "811",
      oldPrice: "2705",
      discount: "UPTO 70% OFF"
    },
    {
      id: 102,
      title: "Basic Allergy Package",
      testCount: 25,
      included: "COMPLETE BLOOD COUNT, IgE Total antibody",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "462",
      oldPrice: "1540",
      discount: "UPTO 70% OFF"
    },
    {
      id: 103,
      title: "CRD Allergy Panel Test",
      testCount: 1,
      included: "CRD Allergy Panel Test",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 3 D, 6 H",
      currentPrice: "17571",
      oldPrice: "58571",
      discount: "UPTO 70% OFF"
    },
    {
      id: 104,
      title: "FOOD INTOLERANCE TEST",
      testCount: 1,
      included: "FOOD INTOLERANCE TEST",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 3 D",
      currentPrice: "5499",
      oldPrice: "18330",
      discount: "UPTO 70% OFF"
    },
    {
      id: 105,
      title: "WBC-Total Counts Leucocytes",
      testCount: 1,
      included: "WBC-Total Counts Leucocytes",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 9 Hours",
      currentPrice: "199",
      oldPrice: "662",
      discount: "UPTO 70% OFF"
    },
    {
      id: 106,
      title: "Platelet Count Thrombocyte count",
      testCount: 1,
      included: "Platelet Count Thrombocyte count",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 7 Hours",
      currentPrice: "103",
      oldPrice: "343",
      discount: "UPTO 70% OFF"
    },
    {
      id: 107,
      title: "IgE Total antibody",
      testCount: 1,
      included: "IgE Total antibody",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "373",
      oldPrice: "1245",
      discount: "UPTO 70% OFF"
    },
    {
      id: 108,
      title: "Absolute Neutrophil Count, Blood",
      testCount: 1,
      included: "Absolute Neutrophil Count, Blood",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 24 Hours",
      currentPrice: "107",
      oldPrice: "357",
      discount: "UPTO 70% OFF"
    },
    {
      id: 109,
      title: "Absolute Eosinophil Count, Blood",
      testCount: 1,
      included: "Absolute Eosinophil Count, Blood",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 9 Hours",
      currentPrice: "236",
      oldPrice: "786",
      discount: "UPTO 70% OFF"
    }
  ],
  "Cancer": [
    {
      id: 111,
      title: "Cancer Screening Package For Female",
      testCount: 3,
      included: "CA-125 (Ovarian Cancer Marker Test), CA-15.3 (Breast Cancer Marker Test), CEA-Carcino Embryonic Antigen (Colorectal Cancer Marker Test)",
      fasting: "No Fasting Required",
      recommended: "Recommended for Female",
      reportTime: "Report in 13 Hours",
      currentPrice: "699",
      oldPrice: "2330",
      discount: "UPTO 70% OFF"
    },
    {
      id: 112,
      title: "Cancer Screening Package For Male",
      testCount: 3,
      included: "CA-19.9 (Pancreatic Cancer Marker Test), CEA-Carcino Embryonic Antigen (Colorectal Cancer Marker Test), PSA-total Prostate Specific Antigen (Prostate Cancer Marker Test)",
      fasting: "No Fasting Required",
      recommended: "Recommended for Male",
      reportTime: "Report in 13 Hours",
      currentPrice: "699",
      oldPrice: "2330",
      discount: "UPTO 70% OFF"
    },
    {
      id: 113,
      title: "PSA-total Prostate Specific Antigen (Prostate Cancer Marker Test)",
      testCount: 1,
      included: "PSA-total Prostate Specific Antigen (Prostate Cancer Marker Test)",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "99",
      oldPrice: "330",
      discount: "UPTO 70% OFF"
    },
    {
      id: 114,
      title: "PSA-Free Prostate Specific Antigen (Prostate Cancer Marker Test)",
      testCount: 1,
      included: "PSA-Free Prostate Specific Antigen (Prostate Cancer Marker Test)",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "99",
      oldPrice: "330",
      discount: "UPTO 70% OFF"
    },
    {
      id: 115,
      title: "CA-125 (Ovarian Cancer Marker Test)",
      testCount: 1,
      included: "CA-125 (Ovarian Cancer Marker Test)",
      fasting: "No Fasting Required",
      recommended: "Recommended for Everyone",
      reportTime: "Report in 13 Hours",
      currentPrice: "99",
      oldPrice: "330",
      discount: "UPTO 70% OFF"
    }
  ]
};

const categories = Object.keys(testsData);

function ServicesContent() {
  const [activeCategory, setActiveCategory] = useState("Full Body Checkup");

  const currentTests = testsData[activeCategory] || [];

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
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn rounded-pill px-4 py-2 m-2 fw-medium test-category-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Card Slider */}
        <div className="test-slider-container wow fadeInUp" data-wow-delay="0.3s">
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
                  <span className="fw-bold text-dark">Tests Included:</span> <span className="text-muted">{test.included}</span>
                </div>

                {/* Know More & Members row */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <a href="#" className="test-know-more text-primary fw-medium">
                    + Know More
                  </a>
                  {test.membersDropdown && (
                    <div className="bg-light-mint text-dark px-3 py-1 rounded small fw-medium" style={{ cursor: "pointer" }}>
                      {test.membersDropdown} <i className="bi bi-chevron-down ms-1"></i>
                    </div>
                  )}
                </div>

                {/* Addon Text */}
                {test.addonText && (
                  <div className={`text-center small mb-3 border-top border-bottom py-2 border-dashed ${test.addonTextClass || 'text-muted'}`}>
                    {test.addonText}
                  </div>
                )}

                {/* Spacer to push footer down if there is no addon text */}
                {!test.addonText && <div className="mb-4"></div>}

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
                  <button className="btn btn-primary rounded px-4 py-2 fw-medium">Book Now</button>
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