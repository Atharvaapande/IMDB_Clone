import "./App.css";
import MainLayout from "./layout/MainLayout";
import ListingPage from "./pages/ListingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddNewMovie from "./pages/AddNewMovie";
import EditMovie from "./pages/EditMovie";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<ListingPage />} />
            <Route path="/add-new-movie" element={<AddNewMovie />} />
            <Route path="/edit-movie/:movieId" element={<EditMovie />} />
          </Routes>
        </MainLayout>
      </Provider>
    </Router>
  );
}

export default App;
