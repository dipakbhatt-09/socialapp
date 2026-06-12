import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/layout/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

import Home from "./pages/home/home"
import Profile from "./pages/profile/profile"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

import Notification from "./pages/notifications/Notification"
import Search from "./pages/search/search"

function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* PUBLIC ROUTES */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* PROTECTED ROUTES */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                {/* MY PROFILE */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* OTHER USER PROFILE */}
                <Route
                    path="/profile/:id"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <Notification />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/search"
                    element={
                        <ProtectedRoute>
                            <Search />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    )
}

export default App