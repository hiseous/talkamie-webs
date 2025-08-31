
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthLayout from '@repo/ui/components/auth/AuthLayout';
import { AuthProvider } from '@repo/ui/components/auth-provider/AuthProvider';

type LayoutProps = {
  children?: React.ReactNode;
}
export default function Layout(props: LayoutProps){
  return (
    <GoogleOAuthProvider
        clientId={process.env.VITE_GOOGLE_AUTH_CLIENT_ID ?? ''}
    >
      <AuthProvider>
        <AuthLayout>
          {props.children}
        </AuthLayout>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}