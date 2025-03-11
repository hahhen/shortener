import { createClient } from "@/utils/supabase/server";

export default async function Layout({ children }) {

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return children
}