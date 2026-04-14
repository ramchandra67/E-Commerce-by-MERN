import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Navbar() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const loadCart = async () => {
            if (!userId) return setCartCount(0);
            try {
                const res = await api.get(`/cart/${userId}`);
                const total = res.data.items.reduce(
                    (sum, item) => sum + item.quantity, 0
                );
                setCartCount(total);
            } catch (err) {
                console.error(err);
            }
        }
        loadCart();
        window.addEventListener("cartUpdated", loadCart);
        
        return () => {
            window.removeEventListener("cartUpdated", loadCart);
        }
    }, [userId]);

    const logout = () => {
        localStorage.clear();
        setCartCount(0);
        navigate("/login");
    }

    return (
        <nav className="bg-[#131921] text-white px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow-md">
            <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center border border-transparent hover:border-white p-1 rounded-sm transition-all">
                    <span className="text-xl font-bold tracking-tight">
                        Rudraksha<span className="text-[#febd69] font-normal">Store</span>
                    </span>
                </Link>

                <div className="hidden lg:flex flex-col border border-transparent hover:border-white p-1 rounded-sm cursor-pointer ml-2">
                    <span className="text-gray-400 text-[11px] leading-none ml-3">Deliver to Rudraksha</span>
                    <div className="flex items-center leading-none mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="text-xs font-bold">Lucknow 226028</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                {!userId ? (
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium border border-transparent hover:border-white p-1 rounded-sm">
                            Login
                        </Link>
                        <Link to="/signup" className="text-sm font-medium border border-transparent hover:border-white p-1 rounded-sm text-[#febd69]">
                            Signup
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col border border-transparent hover:border-white p-1 rounded-sm cursor-default">
                            <span className="text-[11px] leading-none text-gray-300">Hello, Rudraksha</span>
                            <span className="text-xs font-bold mt-1">Account & Lists</span>
                        </div>
                        <button onClick={logout} className="text-sm font-medium hover:text-[#febd69] transition-colors border border-transparent hover:border-white p-1 rounded-sm">
                            Logout
                        </button>
                    </div>
                )}

                <Link to="/cart" className="relative flex items-end border border-transparent hover:border-white p-1 rounded-sm">
                    <div className="relative flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 left-3 bg-[#f90] text-black text-[11px] font-bold px-1.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <span className="text-sm font-bold ml-1 mb-0.5 hidden sm:block">Cart</span>
                </Link>
            </div>
        </nav>
    )
}