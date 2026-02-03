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
import { useLanguage } from "@/lib/i18n/LanguageContext"

const submissionSchema = z.object({
  summary: z.string().min(50, "Description must be at least 50 characters"),
  pdfUrl: z.string().url("Please upload the property inventory file"),
})

export default function SubmissionPage() {
  const { t } = useLanguage()
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
            toast.error("File exceeds 10MB")
            return
        }
        setFile(selected)
        form.setValue("pdfUrl", "https://res.cloudinary.com/demo/image/upload/inventory.pdf")
        toast.success("File uploaded successfully (Mock)")
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

        if (!response.ok) throw new Error("Save failed")
        
        toast.success("Inventory submitted correctly")
        router.push("/dashboard")
    } catch {
        toast.error("Error submitting inventory")
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
        <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">{t("dashboard.submission.title")}</h2>
            <p className="text-muted-foreground">{t("dashboard.submission.desc")}</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Inventory Document</CardTitle>
                    <CardDescription>Upload your inventory in PDF or CSV format (Max 10MB).</CardDescription>
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
                                Drag your file here or click to select
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                                Accepts PDF or CSV
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
                    <CardTitle>Notes & Methodology</CardTitle>
                    <CardDescription>Include any specific details about the data source or building specs.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea 
                        {...form.register("summary")} 
                        className="min-h-[200px] font-mono" 
                        placeholder="# Specifications..." 
                    />
                    {form.formState.errors.summary && <p className="text-xs text-destructive mt-2">{form.formState.errors.summary.message}</p>}
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={isLoading || !file}>
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Confirm Submission"}
                </Button>
            </div>
        </form>
    </div>
  )
}
