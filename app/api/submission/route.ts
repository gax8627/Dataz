import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const submissionSchema = z.object({
  summary: z.string().min(50),
  pdfUrl: z.string().url(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await req.json()
    const { summary, pdfUrl } = submissionSchema.parse(body)

    // Ensure session.user has ID (requires Auth callback config in lib/auth which we added)
    // If not, fetch user by email
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let userId = (session.user as any).id
    if (!userId) {
        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        userId = user.id
    }

    const submission = await prisma.submission.create({
        data: {
            userId,
            summary,
            pdfUrl,
        }
    })

    return NextResponse.json({ submission })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
