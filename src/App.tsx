import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpinnerLoading from "./components/common/SpinnerLoading";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/user/HomePage";
import LoginPage from "./pages/user/LoginPage";
import RegisterAccountPage from "./pages/user/RegisterAccountPage";
import ProductDetailPage from "./pages/user/ProductDetailPage";
import SlideBar from "./components/admin/SlideBar";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminProductPage from "./pages/admin/AdminProductPage";
import AdminCategoryPage from "./pages/admin/AdminCategoryPage";
import AdminAccountPage from "./pages/admin/AdminAccountPage";
import AdminCommentPage from "./pages/admin/AdminCommentPage";
import AdminAddProductPage from "./pages/admin/AdminAddProductPage";
import { AuthProvider } from "./hookCustom/AuthContext";
import CartPage from "./pages/user/CartPage";
import HeartPage from "./pages/user/HeartPage";
import OrderPage from "./pages/user/OrderPage";
import AddAddress from "./pages/user/AddAddress";
import HistoryOrderPage from "./pages/user/HistoryOrderPage";
import AdminOrder from "./pages/admin/AdminOrder";
import StatusOrder from "./pages/user/StatusOrder";
import AdminStatusOrder from "./pages/admin/AdminStatusOrder";

// Lazy load components
// const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
// const RegisterAccountPage = React.lazy(
//   () => import("./pages/user/RegisterAccountPage")
// );
// const HomePage = React.lazy(() => import("./pages/user/HomePage"));
// const SlideBar = React.lazy(() => import("./components/admin/SlideBar"));
// const AdminDashboardPage = React.lazy(
//   () => import("./pages/admin/AdminDashboardPage")
// );
// const AdminProductPage = React.lazy(
//   () => import("./pages/admin/AdminProductPage")
// );
// const AdminCategoryPage = React.lazy(
//   () => import("./pages/admin/AdminCategoryPage")
// );
// const AdminAccountPage = React.lazy(
//   () => import("./pages/admin/AdminAccountPage")
// );
// const AdminCommentPage = React.lazy(
//   () => import("./pages/admin/AdminCommentPage")
// );
// const ProductDetailPage = React.lazy(
//   () => import("./pages/user/ProductDetailPage")
// );
// const AdminAddProductPage = React.lazy(
//   () => import("./pages/admin/AdminAddProductPage")
// );
// const LoginPage = React.lazy(() => import("./pages/user/LoginPage"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Route for user section */}
          <Route
            path="/"
            element={
              <Suspense fallback={<SpinnerLoading />}>
                <MainLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/loginAccount"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path="/registerAccount"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <RegisterAccountPage />
                </Suspense>
              }
            />
            <Route
              path="/productDetail/:id"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <ProductDetailPage />
                </Suspense>
              }
            />
            <Route
              path="/cartPage"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <CartPage />
                </Suspense>
              }
            />
            <Route
              path="/heartPage"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <HeartPage />
                </Suspense>
              }
            />
            <Route
              path="/orderPage"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <OrderPage />
                </Suspense>
              }
            />
            <Route
              path="/addAddress"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <AddAddress />
                </Suspense>
              }
            />
            <Route
              path="/historyOrder"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <HistoryOrderPage />
                </Suspense>
              }
            />
            <Route
              path="/statusOrder/:id"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <StatusOrder />
                </Suspense>
              }
            />
          </Route>

          {/* Route for admin section */}
          <Route
            path="/admin"
            element={
              <Suspense fallback={<SpinnerLoading />}>
                <SlideBar />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <AdminDashboardPage />
                </Suspense>
              }
            />
            <Route
              path="managerOrder"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <AdminOrder />
                </Suspense>
              }
            />
            <Route
              path="managerProduct"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <AdminProductPage />
                </Suspense>
              }
            />
            <Route
              path="managerCategory"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <AdminCategoryPage />
                </Suspense>
              }
            />
            <Route
              path="managerAccount"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <AdminAccountPage />
                </Suspense>
              }
            />
            <Route
              path="managerComment"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <AdminCommentPage />
                </Suspense>
              }
            />
            <Route
              path="addProduct"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <AdminAddProductPage />
                </Suspense>
              }
            />
            <Route
              path="adminStatusOrder/:id"
              element={
                <Suspense fallback={<SpinnerLoading />}>
                  <AdminStatusOrder />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
