import { Link } from "react-router-dom";
import { useAuth } from "../store/authStore";
import {
  bodySmall,
  btnPrimary,
  btnSecondary,
  heading,
  pageBackground,
  pageWrapper,
} from "../styles/Common";

function Profile() {

  const user = useAuth((state) => state.currentUser);

  if (!user) {
    return (
      <div className={`${pageBackground} ${pageWrapper} text-center`}>
        Profile not available.
      </div>
    );
  }

  return (

    <div className={pageBackground}>
    <div className="max-w-5xl mx-auto py-16 px-6">

      <div className="bg-white rounded-3xl border border-[#ECEAE5] shadow-sm p-10">

        <div className="flex flex-col md:flex-row md:items-center gap-8">

          <img
            src={
              user.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={user.name}
            className="w-36 h-36 rounded-full object-cover border-4 border-[#EEF3E8]"
          />

          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#A3B18A]">
              {user.role}
            </p>

            <h1 className={`${heading} mt-2`}>
              {user.name}
            </h1>

            <div className="mt-4 grid gap-2 text-[#6E6964]">
              <p>Student ID: {user.studentId}</p>
              <p>Email: {user.email}</p>
              <p>Mobile: {user.mobile}</p>
            </div>

            <p className={`${bodySmall} mt-5 max-w-xl`}>
              Manage your listings, check your cart, or browse what other students are selling.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/add-product" className={btnPrimary}>
                Sell an Item
              </Link>

              <Link to="/my-products" className={btnSecondary}>
                My Products
              </Link>

              <Link to="/cart" className={btnSecondary}>
                My Cart
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
    </div>
  );
}

export default Profile;
