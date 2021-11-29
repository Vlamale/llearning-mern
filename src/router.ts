import { LOGIN_PAGE, REGISTRATION_PAGE, SECTION_LIST_PAGE, SECTION_PAGE, USER_PAGE } from "./const/routes";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import SectionListPage from "./pages/SectionListPage";
import SectionPage from "./pages/SectionPage";
import UserPage from "./pages/UserPage";

export const authRoutes = [
    {
        path: SECTION_LIST_PAGE,
        Component: SectionListPage
    },
    {
        path: USER_PAGE,
        Component: UserPage
    },
    {
        path: SECTION_PAGE,
        Component: SectionPage
    }
]

export const routes = [
    {
        path: REGISTRATION_PAGE,
        Component: RegistrationPage
    },
    {
        path: LOGIN_PAGE,
        Component: LoginPage
    }
]