import Loading from '@/components/common/Loading';
import { deleteAllCookies } from '@/utils/app';
import { AuthActions } from '@/valtio/auth.state';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignOutPage = () => {
  const router = useRouter();
  useEffect(() => {
    const logout = () => {
      localStorage.clear();
      deleteAllCookies();
      AuthActions.setUser(null);
      router.push('/');
    };
    logout();
  }, [router]);
  return <Loading />;
};

export default SignOutPage;
