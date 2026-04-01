import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Upload from "./pages/Upload";
import VideoLibrary from "./pages/VideoLibrary";
import AdminDashboard from "./pages/AdminDashboard";
import EditorDashboard from "./pages/EditorDashboard";
import Layout from "./components/Layout";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />

<Route
  path="/upload"
  element={
    <ProtectedRoute>
      <Layout>
        <Upload />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/library"
  element={
    <ProtectedRoute>
      <Layout>
        <VideoLibrary />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <Layout>
        <AdminDashboard />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/editor"
  element={
    <ProtectedRoute role="editor">
      <Layout>
        <EditorDashboard />
      </Layout>
    </ProtectedRoute>
  }
/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;