"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"
import { Cloud, FileText, Loader2, X } from "lucide-react"
import { useRouter } from "next/navigation"

const submissionSchema = z.object({
  summary: z.string().min(50, "El resumen debe tener al menos 50 caracteres"),
  pdfUrl: z.string().url("Debes subir el archivo PDF"),
})

export default function SubmissionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0]
    if (selected) {
        if (selected.size > 10 * 1024 * 1024) {
            toast.error("El archivo excede 10MB")
            return
        }
        setFile(selected)
        // Mock upload url for now - In production, upload to Cloudinary here
        form.setValue("pdfUrl", "https://res.cloudinary.com/demo/image/upload/sample.pdf")
        toast.success("Archivo cargado correctamente (Simulado)")
    }
  }, [form])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1 
  })

  async function onSubmit(values: z.infer<typeof submissionSchema>) {
    setIsLoading(true)
    try {
        const response = await fetch("/api/submission", {
            method: "POST",
            body: JSON.stringify(values),
        })

        if (!response.ok) throw new Error("Error al guardar")
        
        toast.success("Entrega enviada correctamente")
        router.push("/dashboard")
    } catch {
        toast.error("Error al enviar entrega")
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
        <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Tu Entrega</h2>
            <p className="text-muted-foreground">Sube tu análisis de mercado para participar.</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Documento de Análisis</CardTitle>
                    <CardDescription>Sube tu reporte en formato PDF (Max 10MB).</CardDescription>
                </CardHeader>
                <CardContent>
                    {!file ? (
                        <div {...getRootProps()} className={`
                            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
                            ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"}
                        `}>
                            <input {...getInputProps()} />
                            <Cloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-sm font-medium">
                                Arrastra tu PDF aquí o haz click para seleccionar
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                                Solo archivos .pdf
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon"
                                onClick={() => { setFile(null); form.setValue("pdfUrl", ""); }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                    {form.formState.errors.pdfUrl && <p className="text-xs text-destructive mt-2">{form.formState.errors.pdfUrl.message}</p>}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Resumen Ejecutivo</CardTitle>
                    <CardDescription>Describe brevemente tu metodología y principales hallazgos (Markdown soportado).</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea 
                        {...form.register("summary")} 
                        className="min-h-[200px] font-mono" 
                        placeholder="# Metodología..." 
                    />
                    {form.formState.errors.summary && <p className="text-xs text-destructive mt-2">{form.formState.errors.summary.message}</p>}
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>Cancelar</Button>
                <Button type="submit" disabled={isLoading || !file}>
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</> : "Confirmar Entrega"}
                </Button>
            </div>
        </form>
    </div>
  )
}
