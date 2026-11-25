पुणेरी वडापाव | Puneri Vada Pav
A responsive food-ordering website for पुणेरी वडापाव, built using
HTML, CSS, and JavaScript. The website presents a Marathi-style snack
centre with a food menu, special offers, gallery, customer reviews,
shopping cart, and an order form.
Features
- Responsive navigation bar with a mobile hamburger menu
- Hero section and About Us information
- Food menu with category tabs:
  - वडापाव
  - मिसळ
  - Snacks
  - Drinks
- Food cards with images, descriptions, prices, and Add to Cart /
  Order Now actions
- Special food section and combo offers
- Food gallery and customer reviews
- Shopping cart with:
  - Add items
  - Increase or decrease quantity
  - Remove individual items
  - Clear cart
  - Automatic quantity and price totals
- Order form with customer name, mobile number, delivery address, and
  special instructions
- Payment method selection: Cash on Delivery, UPI, or Pay at Counter
- Order confirmation toast message
- Contact information, opening hours, and Google Maps embed
- Scroll animations, navbar scroll effect, and back-to-top button
Technologies Used
- HTML5 -- website structure
- CSS3 -- layout, styling, responsive design, and animations
- JavaScript -- menu tabs, mobile navigation, cart operations,
  form validation, and notifications
- Google Fonts -- Yatra One, Mukta, and Poppins
- Google Maps Embed -- location display
Project Structure
Keep all three files in the same folder:
Puneri-Vada-Pav/
├── index.html
├── style.css
├── script.js
└── README.md

How to Run the Project
Option 1: Open in a browser
1. Create a folder named Puneri-Vada-Pav.
2. Place index.html, style.css, and script.js inside it.
3. Make sure the filenames match the project structure above.
4. Double-click index.html to open the website in your browser.
Option 2: Run using Visual Studio Code
1. Open Visual Studio Code.
2. Select File → Open Folder and choose the project folder.
3. Open index.html.
4. Right-click inside the editor and select Open with Live Server
   (if the Live Server extension is installed).
5. The website will open in your default browser.
How to Place an Order
1. Open the Menu section.
2. Select a category such as वडापाव, मिसळ, Snacks, or Drinks.
3. Click the plus button to add a food item to the cart, or click
   Order Now.
4. Go to the Cart / Order section.
5. Update quantities or remove items as needed.
6. Enter your name, 10-digit mobile number, and delivery address.
7. Select a payment option.
8. Click Place Order to see the confirmation message.
Important Notes
- This is a front-end demonstration project made with HTML, CSS,
  and JavaScript.
- The cart is maintained in JavaScript memory while the page is open;
  it is not saved to a database or local storage.
- Submitting the order displays a confirmation message in the browser.
  It does not send the order to a shop, save it on a server, or
  trigger a real delivery.
- UPI and other payment options are selection options in the interface
  only. No payment gateway or actual payment processing is connected.
- Product images and Google Fonts are loaded from external services,
  so an internet connection may be required for those assets.
- Update the sample contact details, address, opening hours, menu,
  prices, and map embed before using the site for a real business.
Customization
- Menu items and prices: Edit the food cards in index.html.
- Images: Replace the image URLs in the src attributes and the
  corresponding data-img attributes on menu buttons.
- Colours and typography: Update the CSS variables near the top of
  style.css.
- Cart and order behaviour: Update the JavaScript in script.js.
- Contact and location: Edit the Contact section and Google Maps
  embed in index.html.
Author
Puneri Vada Pav -- Food Ordering Website
Made with ❤️ using HTML, CSS, and JavaScript.
