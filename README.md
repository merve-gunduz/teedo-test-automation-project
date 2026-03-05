# TEEDO Web & Mobile Test Automation Project

## Project Overview
This project was created as part of the TEEDO QA Automation training assignment.

The goal of the project is to automate an end-to-end user scenario on both **Web** and **Mobile** platforms using modern automation tools.

The automated scenario includes:

- Product search
- Applying filters
- Selecting a product
- Adding the product to the cart
- Verifying the cart without login

---

# Technologies Used

## Web Automation
- Playwright
- TypeScript
- Page Object Model (POM)

## Mobile Automation
- Maestro
- Android

---

# Project Structure
TEEDO_Odev2_Proje
│
├── docs
│ └── Project_Report.md
│
├── web-playwright
│ ├── pages
│ ├── tests
│ ├── utils
│ └── playwright.config.ts
│
├── mobile-maestro
│ └── flows
│
└── README.md


---

# Web Test Scenario

Hepsiburada web application automation flow:

1. Open homepage
2. Search for **Adidas ayakkabı**
3. Apply product filters
4. Select a product
5. Add product to cart
6. Verify product exists in cart
7. Verify user is not forced to login

---

# Mobile Test Scenario

Hepsiburada mobile application automation flow:

1. Launch application
2. Search product
3. Apply filters
4. Select product
5. Add product to cart
6. Validate cart content

---

# Running Web Tests

Install dependencies


npm install


Install Playwright browsers


npx playwright install


Run tests


npx playwright test


View HTML report


npx playwright show-report


---

# Running Mobile Tests

Run Maestro flow


maestro test flows/01_search_and_filter_add_to_cart.yaml


---

# Test Automation Design

This project follows **Page Object Model (POM)** architecture.

Benefits:

- Clean test structure
- Reusable components
- Easier maintenance
- Better readability

---

# Author

Merve Gündüz  
