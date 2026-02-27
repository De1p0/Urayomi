import { Routes, Route, useLocation } from "react-router-dom";
import Library from "../pages/Library";


export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<Library />} />
            {/* <Route path="/browse" element={<Browse />} />
            <Route path="/history" element={<History />} />
            <Route path="/search" element={<Search />} /> */}
        </Routes>
    );
}      