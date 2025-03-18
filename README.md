
**Jobby-App: A Smart and Seamless Job Search Platform**

### **Overview**
Jobby-App is a modern job search platform designed to simplify the job-hunting experience for candidates and streamline recruitment for employers. With an intuitive interface and robust backend functionality, the app ensures smooth navigation, secure authentication, and real-time job updates.

## **Core Features and Functionalities**

### **1. Authentication & Authorization**
- **Login Route**
  - Users must log in with valid credentials to access job listings and details.
  - If invalid credentials are provided, an error message received from the response is displayed.
  - Upon successful login, users are redirected to the **Home Route**.
  - Unauthenticated users attempting to access **Home, Jobs, or Job Item Details Routes** are redirected to the **Login Route**.
  - Authenticated users accessing the **Login Route** are redirected to the **Home Route**.

### **2. Home Route**
- When an authenticated user accesses the **Home Route**:
  - Clicking the **Find Jobs** button navigates to the **Jobs Route**.

### **3. Jobs Route**
- When an authenticated user accesses the **Jobs Route**:
  - A **GET request** is made to the **Profile API** to fetch user profile data.
  - A **loader** is displayed while fetching data.
  - On successful data retrieval, the response is displayed.
  - If the request fails, a **Failure View** is shown, with a **Retry** button to retry fetching data.

- **Fetching Job Listings:**
  - A **GET request** is made to the **Jobs API** with query parameters: `employment_type`, `minimum_package`, and `search`, initially set to empty strings.
  - A **loader** is displayed while fetching jobs.
  - On success, the job listings are displayed.
  - If the request fails, a **Failure View** is shown, with a **Retry** button to fetch data again.

- **Search Functionality:**
  - When a user enters a keyword in the search input and clicks the search button, a **GET request** is made to the **Jobs API**.
  - A **loader** is displayed while fetching results.
  - Upon success, the job listings are updated based on the search query.

- **Filtering Jobs:**
  - **Employment Type Selection:**
    - When employment type options (e.g., Full-Time, Part-Time) are selected, a **GET request** is made with `employment_type` as a list of selected IDs.
    - Jobs are updated accordingly.
  
  - **Salary Range Selection:**
    - When a salary range is chosen, a **GET request** is made with `minimum_package` set to the selected range ID.
    - Job listings update based on salary preference.
  
  - **Multiple Filters:**
    - If multiple filters are applied, a **GET request** is made combining all applied filters.
    - Example URL for filtering:
      ```
      https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=
      ```

- **Empty Job List Handling:**
  - If no jobs match the search and filters, a **No Jobs View** is displayed.

- **Navigation to Job Details Page:**
  - Clicking on a job listing navigates the user to the **Job Item Details Route**.

### **4. Job Item Details Route**
- When an authenticated user accesses a **Job Item Details Page**:
  - A **GET request** is made to fetch detailed job information using `jwt_token` and job `id`.
  - A **loader** is displayed while fetching data.
  - Upon success, the job details and similar job listings are shown.
  - If the request fails, a **Failure View** with a **Retry** button is displayed.
  - Clicking the **Visit** button opens the corresponding company website in a new tab.

### **5. Not Found Route**
- If a user enters an invalid URL, they are redirected to the **Not Found Route**.

### **6. Header Navigation**
- The **website logo** redirects to the **Home Route**.
- The **Home link** navigates to the **Home Route**.
- The **Jobs link** navigates to the **Jobs Route**.
- The **Logout button** logs out the user and redirects to the **Login Route**.

## **Conclusion**
Jobby-App provides a seamless job search and application experience with secure authentication, robust search and filtering mechanisms, and real-time job updates. Whether users are job seekers or recruiters, Jobby-App simplifies the hiring process, making job hunting efficient and hassle-free.


