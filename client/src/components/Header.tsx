import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogoutMutation } from "@/redux/slices/api";
import { handleError } from "./utils/handleError";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateIsOwner } from "@/redux/slices/compilerSlice";

const Header = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );

  const currentUser = useSelector(
    (state: RootState) => state.appSlice.currentUser
  );

  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(updateIsLoggedIn(false));
      dispatch(updateCurrentUser({}));
      dispatch(updateIsOwner(false));
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold select-none">
        {" "}
        Codepen
      </Link>
      <ul className=" flex gap-2">
        <li>
          <Link to="/compiler">
            <Button variant="secondary">Compiler</Button>
          </Link>
        </li>
        {/* <li>
          <Link to="/all-codes">
            <Button variant="secondary" disabled={isLoading}>
              All Codes
            </Button>
          </Link>
        </li> */}

        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">
                <Button variant="blue">Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <Button variant="blue">Signup</Button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/my-codes">
                <Button variant="blue" disabled={isLoading}>
                  My Codes
                </Button>
              </Link>
            </li>
            <li>
              <Button
                onClick={handleLogout}
                variant="outline"
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </Button>
            </li>
            <li>
              <Avatar>
                <AvatarImage src={currentUser.picture} />
                <AvatarFallback className="capitalize">
                  {currentUser.username?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
