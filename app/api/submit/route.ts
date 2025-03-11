import { createClient } from "@/utils/supabase/server"

export async function POST(request: Request) {
    const supabase = await createClient()
    const res = await request.json()
    const { originalLink, newLink } = res
    try {
        const { data, error } = await supabase
            .from('links')
            .upsert({ originalLink: originalLink, newLink: newLink })
            .select()
        if (error) {
            return Response.json({ success: false, error })
        }
        return Response.json({ success: true, data })
    } catch (error) {
        return Response.json({ success: false, error })
    }
}