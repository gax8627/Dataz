import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const registerSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Correo inválido"),
  company: z.string().min(2, "La empresa es requerida"),
  role: z.string().min(1, "El rol es requerido"), // Using min 1 for select value
  segment: z.string().min(1, "El segmento es requerido"),
  phone: z.string().min(10, "Teléfono inválido"),
  linkedin: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, company, role, segment, phone, linkedin } = registerSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "El correo ya está registrado." }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        company,
        role,
        segment,
        phone,
        linkedin,
      },
    })

    // Send Welcome Email
    if (process.env.RESEND_API_KEY) {
        try {
            await resend.emails.send({
                from: "onboarding@resend.dev", // Using default for dev, change to verified domain later
                to: email,
                subject: "Bienvenido a la Competencia Predice el Mercado 2026",
                html: `
                    <div style="font-family: sans-serif; color: #333;">
                        <h1>¡Registro Exitoso!</h1>
                        <p>Hola ${name},</p>
                        <p>Gracias por registrarte en la competencia de Datoz. Estamos emocionados de ver tu análisis.</p>
                        <p>Próximos pasos:</p>
                        <ul>
                            <li>Revisa las reglas en el portal.</li>
                            <li>Descarga el dataset (disponible próximamente).</li>
                            <li>Prepara tu predicción antes del 15 de marzo.</li>
                        </ul>
                        <p>Saludos,<br>El equipo de Datoz</p>
                    </div>
                `
            })
        } catch (emailError) {
            console.error("Error sending email:", emailError)
            // Functionality continues even if email fails
        }
    }

    return NextResponse.json({ user })
  } catch (error) {
    if (error instanceof z.ZodError) {
        return NextResponse.json({ error: "Datos inválidos", details: (error as any).errors }, { status: 400 })
    }
    console.error(error)
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 })
  }
}
