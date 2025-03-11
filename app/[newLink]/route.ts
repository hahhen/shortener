import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function GET(request: Request, { params }: { params: Promise<{ newLink: string }> }) {
    const supabase = await createClient()
    const { newLink } = await params

    const { data, error } = await supabase
        .from('links')
        .select().eq('newLink', newLink).single()
    if (error) {
        return Response.json({ success: false, error })
    }
    redirect(data.originalLink)
}