import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { ProductPage } from "./pages";
import ProductCreatePage from "./pages/ProductCreatePage";
import Layout from "./components/Layout";
import PurchasePage from "./pages/PurchasePage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="create" element={<ProductCreatePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="purchase/:productId" element={<PurchasePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
