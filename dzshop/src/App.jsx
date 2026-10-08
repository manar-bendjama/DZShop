 import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CheckoutPage from './pages/CheckoutPage'
import NotFoundPage from './pages/NotFoundPage'
import MesCommandesPage from './pages/MesCommandesPage'

import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'

import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminProductsPage from './pages/AdminProductsPage'
import AdminOrdersPage from './pages/AdminOrdersPage'
import AdminUsersPage from './pages/AdminUsersPage'

function App() {
  return (
    <AuthProvider>
      <CartProvider>

        <BrowserRouter>

          <Navbar />

          <main className="flex-grow-1">

            <Routes>

              {/* الصفحة الرئيسية */}
              <Route
                path="/"
                element={<HomePage />}
              />

              {/* المنتجات */}
              <Route
                path="/products"
                element={<ProductsPage />}
              />

              {/* تفاصيل المنتج */}
              <Route
                path="/product/:id"
                element={<ProductDetailPage />}
              />

              {/* السلة */}
              <Route
                path="/cart"
                element={<CartPage />}
              />

              {/* تسجيل الدخول */}
              <Route
                path="/login"
                element={<LoginPage />}
              />

              {/* إنشاء حساب */}
              <Route
                path="/register"
                element={<RegisterPage />}
              />

              {/* Checkout - المستخدم يجب أن يكون متصلًا */}
              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <CheckoutPage />
                  </PrivateRoute>
                }
              />

              {/* طلبات المستخدم - المستخدم يجب أن يكون متصلًا */}
              <Route
                path="/mes-commandes"
                element={
                  <PrivateRoute>
                    <MesCommandesPage />
                  </PrivateRoute>
                }
              />

              {/* ========================= */}
              {/* ADMIN */}
              {/* ========================= */}

              {/* Dashboard Admin */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                }
              />

              {/* إدارة المنتجات */}
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <AdminProductsPage />
                  </AdminRoute>
                }
              />

              {/* إدارة الطلبات */}
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <AdminOrdersPage />
                  </AdminRoute>
                }
              />

              {/* إدارة المستخدمين */}
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <AdminUsersPage />
                  </AdminRoute>
                }
              />

              {/* أي رابط غير موجود */}
              <Route
                path="*"
                element={<NotFoundPage />}
              />

            </Routes>

          </main>

          <Footer />

        </BrowserRouter>

      </CartProvider>
    </AuthProvider>
  )
}

export default App