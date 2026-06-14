import { NavLink } from "react-router-dom";
import { useAuth } from "../store/authStore";

import {
  navbar,
  navContainer,
  navBrand,
  navLinks,
  navLink,
  navLinkActive,
  btnPrimary,
} from "../styles/Common";

function Header() {
  const currentUser = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  return (
    <header className={navbar}>
      <div className={navContainer}>
        <NavLink to="/" className={navBrand}>
          CampusResell
        </NavLink>

        <div className={navLinks}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? navLinkActive : navLink
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? navLinkActive : navLink
            }
          >
            Products
          </NavLink>

          {currentUser && (
            <>
              <NavLink
                to="/add-product"
                className={({ isActive }) =>
                  isActive ? navLinkActive : navLink
                }
              >
                Sell
              </NavLink>

              <NavLink
                to="/my-products"
                className={({ isActive }) =>
                  isActive ? navLinkActive : navLink
                }
              >
                My Products
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? navLinkActive : navLink
                }
              >
                Cart
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? navLinkActive : navLink
                }
              >
                Profile
              </NavLink>
            </>
          )}

          {currentUser?.role === "ADMIN" && (
            <>
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  isActive ? navLinkActive : navLink
                }
              >
                Admin
              </NavLink>

              <NavLink
                to="/user-management"
                className={({ isActive }) =>
                  isActive ? navLinkActive : navLink
                }
              >
                Users
              </NavLink>
            </>
          )}
        </div>

        <div>
          {currentUser ? (
            <button onClick={logout} className={btnPrimary}>
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink to="/register" className={navLink}>
                Register
              </NavLink>

              <NavLink to="/login" className={btnPrimary}>
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
