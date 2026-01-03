# Food Order App - Implementation Documentation

This document provides a comprehensive overview of the React Food Order application built as part of Section 18 of the React Complete Guide course.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Components](#components)
4. [State Management](#state-management)
5. [Custom Hooks](#custom-hooks)
6. [Utilities](#utilities)
7. [API Integration](#api-integration)
8. [Running the Application](#running-the-application)

---

## Project Overview

The Food Order App is a complete React application that allows users to:

- Browse a menu of available meals
- Add meals to a shopping cart
- Adjust quantities in the cart
- Proceed to checkout
- Submit orders to a backend server

### Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Context API** - State management
- **useReducer** - Complex state logic
- **Custom Hooks** - Reusable HTTP logic
- **HTML Dialog API** - Modal implementation

---

## Architecture

```
src/
├── App.jsx                 # Root component with context providers
├── main.jsx                # React entry point
├── index.css               # Global styles
├── assets/
│   └── logo.jpg            # App logo
├── components/
│   ├── Header.jsx          # App header with cart button
│   ├── Meals.jsx           # Meals list container
│   ├── MealItem.jsx        # Individual meal card
│   ├── Modal.jsx           # Reusable modal component
│   ├── Cart.jsx            # Shopping cart modal
│   ├── CartItem.jsx        # Individual cart item
│   ├── Checkout.jsx        # Checkout form modal
│   └── Error.jsx           # Error display component
├── store/
│   ├── CartContext.jsx     # Cart state management
│   └── UserProgressContext.jsx  # UI state (which modal is open)
├── hooks/
│   └── useHttp.js          # Custom HTTP hook
└── util/
    └── formatting.js       # Currency formatting utility
```

---

## Components

### Header (`components/Header.jsx`)

The app header displays the logo, title, and cart button.

**Features:**
- Displays the ReactFood logo and brand name
- Shows cart button with dynamic item count
- Clicking cart button opens the Cart modal

**Key Implementation:**
```jsx
const totalCartItems = cartCtx.items.reduce((total, item) => {
  return total + item.quantity;
}, 0);
```

### Meals (`components/Meals.jsx`)

Container component that fetches and displays all available meals.

**Features:**
- Fetches meals from backend on mount
- Displays loading state while fetching
- Shows error message if fetch fails
- Renders grid of MealItem components

**Key Implementation:**
```jsx
const { data: loadedMeals, isLoading, error } = useHttp(
  'http://localhost:3000/meals',
  requestConfig,
  []
);
```

### MealItem (`components/MealItem.jsx`)

Individual meal card component.

**Features:**
- Displays meal image, name, price, and description
- "Add to Cart" button adds meal to cart context
- Price formatted as currency

**Props:**
- `meal` - Object containing `id`, `name`, `price`, `description`, `image`

### Modal (`components/Modal.jsx`)

Reusable modal component using the HTML `<dialog>` element.

**Features:**
- Uses `useRef` to control dialog element
- Opens/closes based on `open` prop
- Renders via React Portal to `#modal` div
- Supports custom className for styling

**Props:**
- `open` - Boolean to control visibility
- `onClose` - Callback when modal closes
- `className` - Additional CSS classes
- `children` - Modal content

**Key Implementation:**
```jsx
useEffect(() => {
  const modal = dialog.current;
  if (open) {
    modal.showModal();
  }
  return () => modal.close();
}, [open]);
```

### Cart (`components/Cart.jsx`)

Shopping cart modal displaying added items.

**Features:**
- Lists all cart items with quantities
- Shows total price
- +/- buttons to adjust quantities
- "Close" button to dismiss
- "Go to Checkout" button (only shown when cart has items)

**Key Implementation:**
```jsx
const cartTotal = cartCtx.items.reduce(
  (totalPrice, item) => totalPrice + item.quantity * item.price,
  0
);
```

### CartItem (`components/CartItem.jsx`)

Individual item row in the cart.

**Features:**
- Displays item name, quantity, and price
- Increment/decrement buttons for quantity

**Props:**
- `name` - Item name
- `quantity` - Current quantity
- `price` - Item price
- `onIncrease` - Callback to add one
- `onDecrease` - Callback to remove one

### Checkout (`components/Checkout.jsx`)

Checkout form modal for order submission.

**Features:**
- Displays total order amount
- Form fields: Full Name, Email, Street, Postal Code, City
- Form validation (required fields)
- Submits order to backend via POST
- Shows loading state during submission
- Displays success message after order
- Error handling for failed submissions

**Form Fields:**
| Field | Name Attribute | Type |
|-------|----------------|------|
| Full Name | `name` | text |
| E-Mail Address | `email` | email |
| Street | `street` | text |
| Postal Code | `postal-code` | text |
| City | `city` | text |

### Error (`components/Error.jsx`)

Simple error display component.

**Props:**
- `title` - Error title
- `message` - Error description

---

## State Management

### CartContext (`store/CartContext.jsx`)

Manages the shopping cart state using `useReducer`.

**State Shape:**
```javascript
{
  items: [
    {
      id: string,
      name: string,
      price: number,
      description: string,
      image: string,
      quantity: number
    }
  ]
}
```

**Actions:**
| Action | Description |
|--------|-------------|
| `ADD_ITEM` | Adds item to cart or increments quantity if exists |
| `REMOVE_ITEM` | Decrements quantity or removes if quantity is 1 |
| `CLEAR_CART` | Removes all items from cart |

**Context Value:**
```javascript
{
  items: [],        // Array of cart items
  addItem: (item) => {},    // Add item to cart
  removeItem: (id) => {},   // Remove item by ID
  clearCart: () => {}       // Clear all items
}
```

### UserProgressContext (`store/UserProgressContext.jsx`)

Manages which modal is currently displayed.

**State:**
- `progress`: `''` | `'cart'` | `'checkout'`

**Context Value:**
```javascript
{
  progress: '',           // Current progress state
  showCart: () => {},     // Show cart modal
  hideCart: () => {},     // Hide cart modal
  showCheckout: () => {}, // Show checkout modal
  hideCheckout: () => {}  // Hide checkout modal
}
```

---

## Custom Hooks

### useHttp (`hooks/useHttp.js`)

Custom hook for handling HTTP requests with loading and error states.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string | Request URL |
| `config` | object | Fetch config (method, headers, etc.) |
| `initialData` | any | Initial data value |

**Return Value:**
```javascript
{
  data,        // Response data
  isLoading,   // Boolean loading state
  error,       // Error message if any
  sendRequest, // Function to trigger request
  clearData    // Function to reset data to initial
}
```

**Behavior:**
- Automatically sends GET requests on mount
- POST/PUT/DELETE requests must be triggered manually via `sendRequest`
- Handles JSON parsing automatically
- Captures and exposes error messages

---

## Utilities

### Currency Formatter (`util/formatting.js`)

Provides consistent currency formatting across the app.

```javascript
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Usage: currencyFormatter.format(12.99) → "$12.99"
```

---

## API Integration

### Backend Endpoints

The app communicates with an Express backend running on `http://localhost:3000`.

#### GET /meals

Fetches available meals.

**Response:**
```json
[
  {
    "id": "m1",
    "name": "Mac & Cheese",
    "price": "8.99",
    "description": "Creamy cheddar cheese...",
    "image": "images/mac-and-cheese.jpg"
  }
]
```

#### POST /orders

Submits a new order.

**Request Body:**
```json
{
  "order": {
    "items": [
      {
        "id": "m1",
        "name": "Mac & Cheese",
        "price": "8.99",
        "quantity": 2
      }
    ],
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "street": "123 Main St",
      "postal-code": "12345",
      "city": "New York"
    }
  }
}
```

**Response (Success):**
```json
{
  "message": "Order created!"
}
```

**Response (Error):**
```json
{
  "message": "Missing data: Email, name, street, postal code or city is missing."
}
```

---

## Running the Application

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
# Install frontend dependencies
cd "attachments/18 Practice Project - Food Order/01-starting-project"
npm install

# Install backend dependencies
cd backend
npm install
```

### Starting the Servers

**Backend (Terminal 1):**
```bash
cd "attachments/18 Practice Project - Food Order/01-starting-project/backend"
npm start
# Server runs on http://localhost:3000
```

**Frontend (Terminal 2):**
```bash
cd "attachments/18 Practice Project - Food Order/01-starting-project"
npm run dev
# App runs on http://localhost:5173
```

### Application URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| Meals Endpoint | http://localhost:3000/meals |
| Orders Endpoint | http://localhost:3000/orders |

---

## Key React Concepts Demonstrated

1. **Component Composition** - Breaking UI into reusable components
2. **Context API** - Sharing state across component tree
3. **useReducer** - Managing complex state with actions
4. **Custom Hooks** - Extracting reusable logic (useHttp)
5. **useEffect** - Side effects for data fetching and modal control
6. **useRef** - Direct DOM manipulation for dialog element
7. **Portals** - Rendering modals outside component hierarchy
8. **Controlled Forms** - Form handling with FormData API
9. **Conditional Rendering** - Loading, error, and success states
10. **Event Handling** - User interactions and form submissions

---

## File Summary

| File | Lines | Purpose |
|------|-------|---------|
| `App.jsx` | 21 | Root component with providers |
| `Header.jsx` | 31 | Header with cart button |
| `Meals.jsx` | 27 | Meals list with data fetching |
| `MealItem.jsx` | 28 | Individual meal card |
| `Modal.jsx` | 23 | Reusable modal component |
| `Cart.jsx` | 52 | Cart modal |
| `CartItem.jsx` | 17 | Cart item row |
| `Checkout.jsx` | 119 | Checkout form |
| `Error.jsx` | 9 | Error display |
| `CartContext.jsx` | 79 | Cart state management |
| `UserProgressContext.jsx` | 43 | UI progress state |
| `useHttp.js` | 46 | HTTP hook |
| `formatting.js` | 4 | Currency formatter |
