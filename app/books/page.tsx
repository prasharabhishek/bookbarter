"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Star, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ClientWrapper } from "@/components/client-wrapper"
import { useMemo } from "react"

interface Book {
  id: string
  title: string
  author: string
  subject: string
  semester: string
  condition: string
  price: number
  image: string
  seller: string
  rating: number
  location: string
  whatsapp: string
}

const dummyBooks: Book[] = [
  {
    id: "1",
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    subject: "Mathematics",
    semester: "Fall 2024",
    condition: "Good",
    price: 960,
    image: "/placeholder.svg?height=200&width=150",
    seller: "Sarah M.",
    rating: 4.5,
    location: "North Campus",
    whatsapp: "919876543210",
  },
  {
    id: "2",
    title: "Introduction to Psychology",
    author: "David G. Myers",
    subject: "Psychology",
    semester: "Spring 2024",
    condition: "Excellent",
    price: 680,
    image: "/placeholder.svg?height=200&width=150",
    seller: "Mike R.",
    rating: 5.0,
    location: "South Campus",
    whatsapp: "919876543211",
  },
  {
    id: "3",
    title: "Organic Chemistry",
    author: "Paula Yurkanis Bruice",
    subject: "Chemistry",
    semester: "Fall 2024",
    condition: "Fair",
    price: 760,
    image: "/placeholder.svg?height=200&width=150",
    seller: "Emma L.",
    rating: 4.0,
    location: "Science Building",
    whatsapp: "919876543212",
  },
  {
    id: "4",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    subject: "Economics",
    semester: "Spring 2024",
    condition: "Good",
    price: 880,
    image: "/placeholder.svg?height=200&width=150",
    seller: "Alex K.",
    rating: 4.2,
    location: "Business School",
    whatsapp: "919876543213",
  },
  {
    id: "5",
    title: "Campbell Biology",
    author: "Jane B. Reece",
    subject: "Biology",
    semester: "Fall 2024",
    condition: "Excellent",
    price: 1120,
    image: "/placeholder.svg?height=200&width=150",
    seller: "Lisa P.",
    rating: 4.8,
    location: "Life Sciences",
    whatsapp: "919876543214",
  },
  {
    id: "6",
    title: "The Art of Public Speaking",
    author: "Stephen E. Lucas",
    subject: "Communications",
    semester: "Spring 2024",
    condition: "Good",
    price: 600,
    image: "/placeholder.svg?height=200&width=150",
    seller: "Jordan T.",
    rating: 4.3,
    location: "Liberal Arts",
    whatsapp: "919876543215",
  },
]

function BooksContent() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")

  useEffect(() => {
    // Load books from localStorage or use dummy data
    const savedBooks = localStorage.getItem("bookbarter-books")
    if (savedBooks) {
      try {
        const parsedBooks = JSON.parse(savedBooks)
        setBooks([...dummyBooks, ...parsedBooks])
      } catch {
        setBooks(dummyBooks)
      }
    } else {
      setBooks(dummyBooks)
    }
  }, [])

  useEffect(() => {
    let filtered = books

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedSubject !== "all") {
      filtered = filtered.filter((book) => book.subject === selectedSubject)
    }

    if (selectedCondition !== "all") {
      filtered = filtered.filter((book) => book.condition === selectedCondition)
    }

    setFilteredBooks(filtered)
  }, [books, searchTerm, selectedSubject, selectedCondition])

  const subjects: string[] = useMemo(
    () => Array.from(new Set(books.map((book) => book.subject))),
    [books],
  )

  const conditions: string[] = useMemo(
    () => Array.from(new Set(books.map((book) => book.condition))),
    [books],
  )


  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "bg-green-100 text-green-800"
      case "Good":
        return "bg-blue-100 text-blue-800"
      case "Fair":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleWhatsAppContact = (book: Book) => {
    const message = encodeURIComponent(
      `Hi ${book.seller}! I'm interested in your book "${book.title}" listed on BookBarter for ₹${book.price}. Is it still available?`,
    )
    const whatsappUrl = `https://wa.me/${book.whatsapp}?text=${message}`
    window.open(whatsappUrl, "_blank")
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
              <Link href="/books" className="text-purple-600 font-medium">
                Browse Books
              </Link>
              <Link href="/add-book" className="text-gray-700 hover:text-purple-600 transition-colors">
                List a Book
              </Link>
            </div>
            <Link href="/add-book">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                List a Book
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Browse Books
          </h1>
          <p className="text-gray-600 text-lg">Find the perfect textbooks for your courses from fellow students</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 mb-8 border border-purple-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="border-purple-200 focus:border-purple-400">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger className="border-purple-200 focus:border-purple-400">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="bg-white/80 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <CardHeader className="p-4">
                <div className="aspect-[3/4] relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {book.title}
                </CardTitle>
                <p className="text-sm text-gray-600">{book.author}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {book.subject}
                    </Badge>
                    <Badge className={getConditionColor(book.condition)}>{book.condition}</Badge>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{book.rating}</span>
                    <span className="text-sm text-gray-500">• {book.seller}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {book.location}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-purple-600">₹{book.price}</span>
                    <Button
                      size="sm"
                      onClick={() => handleWhatsAppContact(book)}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
            <Link href="/add-book">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                List the First Book
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BooksPage() {
  return (
    <ClientWrapper>
      <BooksContent />
    </ClientWrapper>
  )
}
