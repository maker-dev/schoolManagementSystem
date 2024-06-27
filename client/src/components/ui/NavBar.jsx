import React, { useState, useEffect, useRef, useCallback } from 'react';
import menu_icon from '../../assets/icons/menu_icon.svg';
import x from '../../assets/icons/x.svg';
import SideBar from './SideBar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user profile icon
import api from '../../api/apiToken';  // Import your API utility

export default function NavBar() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState(null);

    const logOut = useCallback(() => {
        setLoading(true);
        Cookies.remove('token');
        Cookies.set('userRole', null);
        navigate('/');
        setLoading(false);
    }, [navigate]);

    const fetchUser = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.post('user');

            if (response.status === 200) {
                setUser(response.data);
            } else if (response.status === 400) {
                setUser(null);
            } else if (response.status === 401) {
                logOut();
            } else {
                console.error("Server Error");
            }
        } catch (e) {
            console.error("Server Error", e);
            setUser(null);
        }
        setLoading(false);
    }, [logOut]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleMenu = () => {
        setIsHidden(!isHidden);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    let userName = '';
    let userInitials = '';

    if (user) {
        if (user.role === "Admin") {
            userName = user.name;
        } else {
            userName = `${user.firstName} ${user.lastName}`;
        }
        userInitials = userName.split(" ").map(name => name[0].toUpperCase()).join(""); // Capitalize initials
    }

    return (
        <div className="flex flex-col w-full relative">
            <div className={`fixed inset-0 transition-transform duration-300 ease-in-out ${isHidden ? '-translate-x-full' : 'translate-x-0'} md:hidden z-50`}>
                <div className="flex justify-between p-4 bg-teal-600">
                    <div className="text-white font-bold text-2xl">UNIVERTECH</div>
                    <button onClick={handleMenu}>
                        <img src={x} alt="close icon" />
                    </button>
                </div>
                <SideBar />
            </div>
            <div className="flex justify-between items-center px-6 py-4 w-full bg-teal-600 shadow-lg">
                <div className="flex items-center">
                    <button onClick={handleMenu} className="md:hidden mr-4">
                        <img src={menu_icon} alt="menu icon" />
                    </button>
                    <div className="text-white font-bold text-2xl">UNIVERS-TIC</div>
                </div>
                <div className="relative flex items-center">
                    <div className="flex items-center cursor-pointer relative" onClick={toggleDropdown}>
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl text-white">
                            {userInitials}
                        </div>
                        <span className="ml-2 text-white font-bold hidden md:inline">{userName}</span>
                        {isDropdownOpen && (
                            <div ref={dropdownRef} className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                {/* Profile Link */}
                                <button
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                                    onClick={() => {
                                        if (user.role === "Admin") {
                                            navigate('/Admin/profile');
                                        } else if (user.role === "Teacher") {
                                            navigate('/Teacher/profile');
                                        } else if (user.role === "Student") {
                                            navigate('/Student/profile');
                                        }
                                        setIsDropdownOpen(false); // Close dropdown after navigation
                                    }}
                                >
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                    Profile
                                </button>
                                {/* Logout Button */}
                                <button
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                                    onClick={logOut}
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                    Se Déconnecter
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    );
}
