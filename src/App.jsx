import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";

// Critical path - load immediately
import Home from "./FirstTimer/Pages/Home/Home";
import About from "./FirstTimer/Pages/About/About";
import RoleSelection from "./FirstTimer/Pages/RoleSelection/RoleSelection";
import Products from "./FirstTimer/Pages/Products/Products";
import ProductDetails from "./FirstTimer/Pages/ProductDetails/ProductDetails";
import NotFound from "./pages/404/NotFound";

// Lazy load auth pages
const FarmerSignup = lazy(() => import("./Farmers/Auth/signup/FarmerSignup"));
const FarmerLogin = lazy(() => import("./Farmers/Auth/login/FarmerLogin"));
const BuyerSignup = lazy(() => import("./Buyers/Auth/signup/BuyerSignup"));
const BuyerLogin = lazy(() => import("./Buyers/Auth/login/BuyerLogin"));
const EmailConfirmed = lazy(() => import("./pages/EmailConfirmed"));
const CheckEmail = lazy(() => import("./pages/CheckEmail"));
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./pages/ForgotPassword/ResetPassword")
);

// Lazy load heavy dashboard components
const Dashboard = lazy(() => import("./Farmers/Dashboard/Dashboard"));
const MyFarms = lazy(() => import("./Farmers/Dashboard/MyFarms/MyFarms"));
const FarmDetail = lazy(() => import("./Farmers/Dashboard/MyFarms/FarmDetail"));
const FarmerProfile = lazy(() =>
  import("./Farmers/Dashboard/Profile/FarmerProfile")
);
const BuyerDashboard = lazy(() => import("./Buyers/Dashboard/BuyerDashboard"));
const BuyerProfile = lazy(() =>
  import("./Buyers/Dashboard/Profile/BuyerProfile")
);

// Lazy load product components
const ProductsList = lazy(() =>
  import("./Farmers/Dashboard/Products/ProductList/ProductList")
);
const ProductsForm = lazy(() =>
  import("./Farmers/Dashboard/Products/ProductsForm/ProductsForm")
);
const ProductDetail = lazy(() =>
  import("./Farmers/Dashboard/Products/ProductDetail/ProductDetail")
);
const MyListings = lazy(() =>
  import("./Farmers/Dashboard/MyListings/MyListings")
);
const Marketplace = lazy(() =>
  import("./Farmers/Dashboard/Marketplace/Marketplace")
);

// Loading fallback component
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
      fontFamily: "var(--outfit)",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid #e8f5e9",
          borderTop: "3px solid #165136",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto 1rem",
        }}
      />
      <p>Loading...</p>
    </div>
  </div>
);

// Wrapper components - needed because your components expect farmId as a prop
// These extract farmId from URL and pass it down
const ProductsListWrapper = () => {
  const { farmId } = useParams();
  return <ProductsList farmId={farmId} />;
};

const ProductFormCreateWrapper = () => {
  const { farmId } = useParams();
  return <ProductsForm farmId={farmId} isEdit={false} />;
};

const ProductFormEditWrapper = () => {
  const { farmId } = useParams();
  return <ProductsForm farmId={farmId} isEdit={true} />;
};

const ProductDetailWrapper = () => {
  const { farmId } = useParams();
  return <ProductDetail farmId={farmId} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about_us" element={<About />} />
          <Route path="/select_role" element={<RoleSelection />} />

          {/* Public Product Routes */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/farmers/signup" element={<FarmerSignup />} />
          <Route path="/farmers/login" element={<FarmerLogin />} />
          <Route path="/buyers/signup" element={<BuyerSignup />} />
          <Route path="/buyers/login" element={<BuyerLogin />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />

          {/* Password Reset Routes */}
          <Route
            path="/farmers/forgot-password"
            element={<ForgotPassword userType="farmer" />}
          />
          <Route
            path="/farmers/reset-password"
            element={<ResetPassword userType="farmer" />}
          />
          <Route
            path="/buyers/forgot-password"
            element={<ForgotPassword userType="buyer" />}
          />
          <Route
            path="/buyers/reset-password"
            element={<ResetPassword userType="buyer" />}
          />

          {/* Farmers Dashboard Routes */}
          <Route path="/farmers/dashboard" element={<Dashboard />}>
            <Route index element={<div>Dashboard Home</div>} />
            <Route path="farms" element={<MyFarms />} />
            <Route path="farms/:id" element={<FarmDetail />} />

            {/* Products Routes - NO LEADING SLASH! */}
            <Route
              path="farms/:farmId/products"
              element={<ProductsListWrapper />}
            />
            <Route
              path="farms/:farmId/products/create"
              element={<ProductFormCreateWrapper />}
            />
            <Route
              path="farms/:farmId/products/:productId"
              element={<ProductDetailWrapper />}
            />
            <Route
              path="farms/:farmId/products/:productId/edit"
              element={<ProductFormEditWrapper />}
            />

            <Route path="profile" element={<FarmerProfile />} />
            <Route path="resources" element={<div>Resources</div>} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="my-listings" element={<MyListings />} />
            <Route path="community" element={<div>Community</div>} />
            <Route path="messages" element={<div>Messages</div>} />
          </Route>

          {/* Buyers Dashboard Routes */}
          <Route path="/buyers/dashboard" element={<BuyerDashboard />}>
            <Route index element={<div>Buyer Dashboard Home</div>} />
            <Route path="profile" element={<BuyerProfile />} />
            <Route path="marketplace" element={<div>Marketplace</div>} />
            <Route path="orders" element={<div>My Orders</div>} />
            <Route path="community" element={<div>Community</div>} />
            <Route path="messages" element={<div>Messages</div>} />
          </Route>
          <Route element={<NotFound />} path="*"></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
