"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Upload, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BookForm {
  title: string
  author: string
  subject: string
  condition: string
  price: string
  description: string
  seller: string
  location: string
  image: string
  whatsapp: string
}

export default function AddBookPage() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<BookForm>({
    title: "",
    author: "",
    subject: "",
    condition: "",
    price: "",
    description: "",
    seller: "",
    location: "",
    image: "",
    whatsapp: "",
  })

  const handleInputChange = (field: keyof BookForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      // For demo purposes, we'll use a placeholder
      const imageUrl = `/placeholder.svg?height=200&width=150&query=${encodeURIComponent(formData.title || "textbook")}`
      handleInputChange("image", imageUrl)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new book object
    const newBook = {
      id: Date.now().toString(),
      title: formData.title,
      author: formData.author,
      subject: formData.subject,
      condition: formData.condition,
      price: Number.parseFloat(formData.price),
      image: formData.image || `/placeholder.svg?height=200&width=150&query=${encodeURIComponent(formData.title)}`,
      seller: formData.seller,
      rating: 5.0, // Default rating for new listings
      location: formData.location,
      whatsapp: formData.whatsapp,
    }

    // Save to localStorage
    const existingBooks = JSON.parse(localStorage.getItem("bookbarter-books") || "[]")
    existingBooks.push(newBook)
    localStorage.setItem("bookbarter-books", JSON.stringify(existingBooks))

    setIsSubmitted(true)

    // Redirect to books page after 2 seconds
    setTimeout(() => {
      router.push("/books")
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-green-200">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Listed Successfully!</h2>
            <p className="text-gray-600 mb-6">Your book has been added to the marketplace.</p>
            <p className="text-sm text-gray-500">Redirecting to browse books...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BookBarter
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link href="/books" className="text-gray-700 hover:text-purple-600 transition-colors">
                Browse Books
              </Link>
              <Link href="/add-book" className="text-purple-600 font-medium">
                List a Book
              </Link>
            </div>
            <Link href="/books">
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent">
                Browse Books
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            List Your Book
          </h1>
          <p className="text-gray-600 text-lg">Help fellow students by sharing your textbooks</p>
        </div>

        {/* Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Book Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Book Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Calculus: Early Transcendentals"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    placeholder="e.g., James Stewart"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Subject and Semester */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger className="border-purple-200 focus:border-purple-400">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Psychology">Psychology</SelectItem>
                      <SelectItem value="Economics">Economics</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Communications">Communications</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Condition and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition *</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                    <SelectTrigger className="border-purple-200 focus:border-purple-400">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent - Like new</SelectItem>
                      <SelectItem value="Good">Good - Minor wear</SelectItem>
                      <SelectItem value="Fair">Fair - Noticeable wear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 9600"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Seller Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="seller">Your Name *</Label>
                  <Input
                    id="seller"
                    placeholder="e.g., Sarah M."
                    value={formData.seller}
                    onChange={(e) => handleInputChange("seller", e.target.value)}
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="e.g., 919876543210"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                  <p className="text-xs text-gray-500">Include country code (e.g., 91 for India)</p>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Campus Location *</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger className="border-purple-200 focus:border-purple-400">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="North Campus">North Campus</SelectItem>
                      <SelectItem value="South Campus">South Campus</SelectItem>
                      <SelectItem value="East Campus">East Campus</SelectItem>
                      <SelectItem value="West Campus">West Campus</SelectItem>
                      <SelectItem value="Science Building">Science Building</SelectItem>
                      <SelectItem value="Business School">Business School</SelectItem>
                      <SelectItem value="Liberal Arts">Liberal Arts</SelectItem>
                      <SelectItem value="Life Sciences">Life Sciences</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Any additional details about the book's condition, included materials, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Book Image (Optional)</Label>
                <div className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <Upload className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload a photo of your book</p>
                  <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image")?.click()}
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    Choose File
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg transition-all duration-300 transform hover:scale-105"
                >
                  List My Book
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-8 bg-blue-50/80 backdrop-blur-sm border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-800 mb-3">💡 Tips for a successful listing:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use clear, well-lit photos of your book</li>
              <li>• Be honest about the book's condition</li>
              <li>• Research fair market prices for your textbook</li>
              <li>• Include any supplementary materials (CDs, access codes, etc.)</li>
              <li>• Provide an active WhatsApp number for quick responses</li>
              <li>• Respond promptly to interested buyers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
