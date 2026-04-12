import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./views/Product/Components/ProductDetail/ProductDetail";
import Loading from "./components/Loading/Loading";
import Home from "./views/Home/Home";
import Product from "./views/Product/Product";
import Blog from "./views/Blog/Blog";
import Wishlist from "./views/Wishlist/Wishlist";
import AddPlant from "./views/Backend/AddPlant/AddPlant";
import AdminRoute from "./views/Backend/AdminRoute";
import BackendLogin from "./views/Backend/Login/BackendLogin";
import Dashboard from "./views/Backend/Dashboard/Dashboard";
import PageLoader from "./components/Loading/PageLoader";
import AllPlants from "./views/Backend/AllPlants/AllPlants";
import ImagesPlants from "./views/Backend/ImagesPlants/ImagesPlants";
import AddImages from "./views/Backend/AddImages/AddImages";


function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLoader><Suspense fallback={<Loading />}><Home /></Suspense></PageLoader>} />
      <Route path="/products" element={<PageLoader><Suspense fallback={<Loading />}><Product /></Suspense></PageLoader>} />
      <Route path="/products/:idProduct" element={<PageLoader><Suspense fallback={<Loading />}><ProductDetail /></Suspense></PageLoader>} />
      <Route path="/blog" element={<PageLoader><Suspense fallback={<Loading />}><Blog /></Suspense></PageLoader>} />
      <Route path="/wishlist" element={<PageLoader><Suspense fallback={<Loading />}><Wishlist /></Suspense></PageLoader>} />

      {/* backend */}
      <Route path="/admin/login" element={<BackendLogin />} />
      <Route
        path="/admin/plants/add"
        element={
          <AdminRoute>
            <AddPlant />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/plants/allplants"
        element={
          <AdminRoute>
            <AllPlants plantId="6"/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/plants/allimages"
        element={
          <AdminRoute>
            <ImagesPlants/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/plants/addimages"
        element={
          <AdminRoute>
            <AddImages/>
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;