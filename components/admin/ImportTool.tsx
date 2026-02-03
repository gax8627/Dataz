"use client"

import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function ImportTool() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; count?: number; error?: string } | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setResult(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  })

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setResult(null)

    try {
      const text = await file.text()
      const lines = text.split("\n")
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())

      // Basic validation of headers
      const requiredHeaders = ["source", "latitude", "longitude", "totalarea", "availablearea", "market"]
      const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h))

      if (missingHeaders.length > 0) {
        throw new Error(`Faltan columnas: ${missingHeaders.join(", ")}`)
      }

      const properties = lines
        .slice(1)
        .filter((line) => line.trim() !== "")
        .map((line) => {
          const values = line.split(",").map((v) => v.trim())
          const entry: Record<string, string> = {}
          headers.forEach((header, index) => {
            entry[header] = values[index]
          })
          return {
            source: entry.source,
            externalId: entry.externalid || null,
            latitude: entry.latitude,
            longitude: entry.longitude,
            totalArea: entry.totalarea,
            availableArea: entry.availablearea,
            address: entry.address || null,
            market: entry.market,
          }
        })

      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al subir propiedades")
      }

      setResult({ success: true, count: data.count })
      toast.success(`${data.count} propiedades importadas con éxito`)
      setFile(null)
    } catch (error: unknown) {
      console.error("Import error:", error)
      const message = error instanceof Error ? error.message : "Error desconocido"
      setResult({ success: false, error: message })
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          {file ? (
            <div className="space-y-2">
              <p className="font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="font-medium">Haga clic o arrastre un archivo CSV</p>
              <p className="text-xs text-muted-foreground">
                El archivo debe contener columnas: source, latitude, longitude, totalarea, availablearea, market
              </p>
            </div>
          )}
        </div>
      </div>

      {file && !loading && (
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setFile(null)}>
            <X className="mr-2 h-4 w-4" /> Cancelar
          </Button>
          <Button onClick={handleUpload}>
            <FileText className="mr-2 h-4 w-4" /> Importar Propiedades
          </Button>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <span>Procesando archivo...</span>
        </div>
      )}

      {result && (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${result.success ? "bg-green-500/10 text-green-700" : "bg-red-500/10 text-red-700"}`}>
          {result.success ? (
            <>
              <CheckCircle className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium">Importación exitosa</p>
                <p className="text-sm">Se han procesado {result.count} propiedades.</p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium">Error en la importación</p>
                <p className="text-sm">{result.error}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
