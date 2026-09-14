
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/supabase-client';

export function useAuth() {
    const router = useRouter();
    const supabase = createClient();

    const logout = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    return {
        logout,
    };
}