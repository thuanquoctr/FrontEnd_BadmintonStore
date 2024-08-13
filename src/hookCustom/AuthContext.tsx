import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Account from "../models/Account.model";
interface AuthContextType {
  user: Account | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  getCountCart: (userId: number) => Promise<number>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Account | null>(null);
  const [countCart, setCountCart] = useState<number>(0);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      const tk = jwtDecode(token);
      const username = tk.sub;
      axios
        .get(`http://localhost:8080/api/users/getByUsername/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);
  const getCountCart = async (userId: number): Promise<number> => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/carts/getCountByUserId/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setCountCart(response.data);
      } else {
        setCountCart(0);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/loginAccount",
        { username, password }
      );
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      return true;
    } catch (error) {
      return false;
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout, getCountCart }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
