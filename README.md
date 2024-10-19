# Weather App with TailwindCSS

Project-live-link->  https://ayushsingharyan.github.io/weather-app-with-tailwindCSS/

This is a simple weather application that shows the current weather based on the user's location, built using **TailwindCSS** for styling and vanilla JavaScript for the logic. The app fetches weather data from a weather API and displays it on a clean, minimal interface.


## Features
- **Live weather updates:** Automatically fetches and displays the current weather data based on the user's geolocation.
- **Search history:** The app fetches and displays the weather data for recently searched cities.
- **Minimal UI with TailwindCSS:** Styled using TailwindCSS, making the app responsive and easy to customize.
- **API Integration:** Fetches data from an external weather API.

## Prerequisites
- **Node.js** installed on your system (version >= 12.0.0).
- A **weather API key** from [OpenWeatherMap](https://openweathermap.org/api) (or any other weather service API).

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AyushSinghAryan/weather-app-with-tailwindCSS.git
   cd weather-app-with-tailwindCSS

2. Install dependencies: Ensure you are in the project directory and run:
   ```bash
    npm install

3. Configure Tailwind: The TailwindCSS configuration is done via the tailwind.config.js file. Tailwind is already set up to generate a custom CSS file based on your project needs. You can modify the tailwind.config.js file to customize the theme and add additional styles if required.

4. API Setup: Open the script.js file and locate the line where the weather API is being called. Insert your API key in the appropriate place:
      ```bash

   const API_KEY = 'YOUR_API_KEY';  // Replace 'YOUR_API_KEY' with your actual API key

5. Run the project: After setting up the API key and Tailwind, you can run the project:
      ```bash
   npm run start
This command will start a development server and open the app in your default browser.

6. Build for production: To build the project for production, use the following command:
      ```bash
   npm run build
This will create the production-ready files in the dist/ directory.

Usage
Accessing the app: The app will use the browser's geolocation API to get the current location and fetch weather data for that region.
Search history: The app allows you to view weather data for recently searched cities.
Customize styles: If you wish to customize the look and feel of the app, you can modify the Tailwind configuration in tailwind.config.js and add custom styles in style.css.

Dependencies
TailwindCSS - For responsive and customizable CSS styles.
Node.js & npm - For managing dependencies and scripts.
Geolocation API - To fetch the user's current location.
OpenWeatherMap API - To get live weather data.
Contributing

Feel free to submit issues or pull requests to help improve the project. Contributions are welcome!
