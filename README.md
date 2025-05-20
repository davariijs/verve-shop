# Verve Shop 🛍️

Welcome to Verve Shop! This is a dynamic and responsive e-commerce front-end application built to showcase a paginated list of products, individual product detail pages, and client-side filtering & searching capabilities. The project emphasizes a clean, modular codebase and a visually appealing user interface.

## 🌐 Live Demo

Check out the live version of Verve Shop here:
**[🚀 Launch Verve Shop!](https://verve-shop.netlify.app/)**

## ✨ Features

*   **Product Listing with Pagination:** Browse products in a paginated view.
*   **Product Detail Page:** View detailed information for each product.
*   **Client-Side Search:** Quickly find products by title, description, or brand.
*   **Client-Side Category Filtering:** Filter products based on their category.
*   **Responsive Design:** Adapts attractively to various screen sizes (desktop, tablet, and mobile).
*   **Smooth Scrolling:** Enhanced user experience with smooth scroll animations for navigation.
*   **Image Gallery with Zoom:** Interactive image gallery on product detail pages with zoom functionality.
*   **Hero Section:** Engaging hero section on the main page with animations.
*   **404 Page:** Custom "Page Not Found" page.

## 🛠️ Technologies Used

*   **React:** (v19.1.0) - A JavaScript library for building user interfaces.
*   **React Router DOM:** (v7.6.0) - For client-side routing and navigation.
*   **Tailwind CSS:** (v3.4.17) - A utility-first CSS framework for rapid UI development.
*   **PostCSS** (v8.5.3) & **Autoprefixer** (v10.4.21)
*   **@tanstack/react-query (React Query):** (v5.76.1) - For data fetching, caching, synchronization, and server state management.
*   **Axios:** (v1.9.0) - Promise-based HTTP client for making API requests.
*   **React Icons:** (v5.5.0) - A comprehensive library for including popular icons in your React projects.
*   **use-debounce:** (v10.0.4) - A React hook to debounce a value (used for search input).

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development purposes.

### Prerequisites

*   Node.js (v18.x or later recommended)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/davariijs/verve-shop.git
    cd verve-shop
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Set up Environment Variables:**
    This project uses an API to fetch product data. You need to configure the base URL for this API.
    *   Create a `.env` file in the root of your project by copying the example file:
        ```bash
        cp .env.example .env
        ```
    *   Open the newly created `.env` file and set the `REACT_APP_API_BASE_URL`.

### Available Scripts

In the project directory, you can run:

*   **`npm start`** or **`yarn start`**
    Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

*   **`npm run build`** or **`yarn build`**
    Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.


## 🎨 Design & Styling

*   Styling is primarily handled by **Tailwind CSS**, a utility-first CSS framework.
*   Custom color palette defined in `tailwind.config.js` includes:
    *   Primary Color: `#800020` (Rich Burgundy)
    *   Accent Color: `#B08D57` (Old Gold / Bronze)
    *   And various text, background, and border colors for a cohesive look.
*   Responsive design ensures a good user experience across devices.
*   Icons are provided by **React Icons**.


---

Enjoy exploring Verve Shop! 🌟