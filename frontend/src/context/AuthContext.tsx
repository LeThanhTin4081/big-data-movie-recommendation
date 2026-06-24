"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Định nghĩa thông tin người dùng
export interface User {
  name: string;
  email: string;
  userId: number; // User ID dùng để lấy gợi ý phim (1 - 943)
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Khi component mount, kiểm tra xem có user đã đăng nhập trong localStorage chưa
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("t3v_play_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Lỗi khi đọc user từ localStorage:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Đăng nhập (API thật)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const loggedInUser: User = data.user;
        setUser(loggedInUser);
        localStorage.setItem("t3v_play_user", JSON.stringify(loggedInUser));
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: data.error || "Email hoặc mật khẩu không chính xác!" };
      }
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: "Không thể kết nối đến máy chủ đăng nhập!" };
    }
  };

  // Đăng ký (API thật)
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const loggedInUser: User = data.user;
        setUser(loggedInUser);
        localStorage.setItem("t3v_play_user", JSON.stringify(loggedInUser));
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: data.error || "Đăng ký không thành công!" };
      }
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: "Không thể kết nối đến máy chủ đăng ký!" };
    }
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("t3v_play_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
}
