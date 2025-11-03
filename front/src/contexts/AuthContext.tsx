import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/subscription';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    // TODO: Supabase 연동 시 실제 로그인 구현
    await new Promise(resolve => setTimeout(resolve, 1000)); // 시뮬레이션
    
    // 임시 사용자 데이터
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
      provider: 'email'
    });
    setIsLoading(false);
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    // TODO: Supabase 연동 시 실제 회원가입 구현
    await new Promise(resolve => setTimeout(resolve, 1000)); // 시뮬레이션
    
    // 임시 사용자 데이터
    setUser({
      id: '1',
      email,
      name,
      provider: 'email'
    });
    setIsLoading(false);
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    // TODO: Supabase 연동 시 실제 Google OAuth 구현
    await new Promise(resolve => setTimeout(resolve, 1000)); // 시뮬레이션
    
    // 임시 사용자 데이터
    setUser({
      id: '2',
      email: 'user@gmail.com',
      name: 'Google User',
      provider: 'google',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google'
    });
    setIsLoading(false);
  };

  const signInWithGithub = async () => {
    setIsLoading(true);
    // TODO: Supabase 연동 시 실제 GitHub OAuth 구현
    await new Promise(resolve => setTimeout(resolve, 1000)); // 시뮬레이션
    
    // 임시 사용자 데이터
    setUser({
      id: '3',
      email: 'user@github.com',
      name: 'GitHub User',
      provider: 'github',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=github'
    });
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    // TODO: Supabase 연동 시 실제 로그아웃 구현
    await new Promise(resolve => setTimeout(resolve, 500)); // 시뮬레이션
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithGithub,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
