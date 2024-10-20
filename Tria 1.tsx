"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ShiftLog() {
  const [name, setName] = useState("")
  const [handoverInfo, setHandoverInfo] = useState("")
  const [attachments, setAttachments] = useState<FileList | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create a FormData object to handle file uploads
    const formData = new FormData()
    formData.append("name", name)
    formData.append("handoverInfo", handoverInfo)
    if (attachments) {
      for (let i = 0; i < attachments.length; i++) {
        formData.append("attachments", attachments[i])
      }
    }

    try {
      // In a real application, this would be an API call to submit the data
      // For now, we'll just log it to the console
      console.log("Submitting handover:", Object.fromEntries(formData))
      
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form fields after submission
      setName("")
      setHandoverInfo("")
      setAttachments(null)
      
      // Placeholder for success message
      alert("Handover submitted successfully!")
    } catch (error) {
      console.error("Error submitting handover:", error)
      alert("An error occurred while submitting the handover. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Shift Handover Log</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="handoverInfo">Handover Information</Label>
            <Textarea
              id="handoverInfo"
              value={handoverInfo}
              onChange={(e) => setHandoverInfo(e.target.value)}
              placeholder="Enter handover information"
              required
              className="min-h-[150px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments (Photos)</Label>
            <Input
              id="attachments"
              type="file"
              onChange={(e) => setAttachments(e.target.files)}
              accept="image/*"
              multiple
              className="cursor-pointer"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Handover</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
