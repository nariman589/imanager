import { AuthContext } from "components/hocs/requireAuth.tsx/store";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
