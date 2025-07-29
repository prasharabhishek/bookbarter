"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BookBarter
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link href="/books" className="text-gray-700 hover:text-purple-600 transition-colors">
                Browse Books
              </Link>
              <Link href="/add-book" className="text-gray-700 hover:text-purple-600 transition-colors">
                List a Book
              </Link>
            </div>
            <div className="md:hidden">
              <Link href="/books">
                <Button variant="outline" size="sm">
                  Browse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                BookBarter
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The smartest way for students to exchange academic books on campus. Save money, help classmates, and build
              a sustainable learning community.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/books">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105"
              >
                Browse Books
              </Button>
            </Link>
            <Link href="/add-book">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg transition-all duration-300 bg-transparent"
              >
                List Your Books
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Why Choose BookBarter?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Quality Guaranteed</h3>
              <p className="text-gray-600">
                All books are verified by students for students. Quality ratings ensure you get what you expect.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-pink-100 to-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-10 w-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Campus Community</h3>
              <p className="text-gray-600">
                Connect with fellow students on your campus. Build relationships while saving money.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Sustainable Learning</h3>
              <p className="text-gray-600">
                Reduce waste and promote sustainability by giving textbooks a second life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who are already saving money and building community through BookBarter.
          </p>
          <Link href="/books">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Browsing Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-purple-100 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              BookBarter
            </span>
          </div>
          <p className="text-gray-600">© 2024 BookBarter. Made with ❤️ for students, by students.</p>
        </div>
      </footer>
    </div>
  )
}
