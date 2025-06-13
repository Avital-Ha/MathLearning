import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, GraduationCap, Calculator, Gamepad2, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-400 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Interactive Math Learning
            </span>
          </div>
          <Link to={createPageUrl("Setup")}>
            <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-2 rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-purple-500 bg-clip-text text-transparent">
            Have fun learning math
          </span>
          <br />
          <span className="text-gray-700">with interactive exercises!</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Gamified learning experience designed for students grades 6-12, with adaptive difficulty and real-time feedback.
        </p>

        <Link to={createPageUrl("Setup")}>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all">
            Start Learning Now
          </Button>
        </Link>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center hover:transform hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Gamified Exercises</h3>
            <p className="text-gray-600">Interactive mini-games with drag & drop, drawing tools, and animated puzzles that make learning fun.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center hover:transform hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Adaptive Learning</h3>
            <p className="text-gray-600">Difficulty adjusts automatically based on performance, ensuring optimal challenge level for every student.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center hover:transform hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Complete Curriculum</h3>
            <p className="text-gray-600">Covers arithmetic, algebra, geometry, functions, and statistics aligned with educational standards.</p>
          </div>
        </div>
      </section>

      {/* Role Selection Preview */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Perfect for Everyone</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3 text-blue-800">Students</h3>
            <p className="text-blue-700">Interactive dashboard with personalized learning paths and achievement tracking.</p>
          </div>

          <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-3xl p-8 text-center">
            <Users className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3 text-teal-800">Parents</h3>
            <p className="text-teal-700">Monitor your child's progress and get insights on strengths and areas for improvement.</p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-8 text-center">
            <GraduationCap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3 text-purple-800">Teachers</h3>
            <p className="text-purple-700">Create custom exercises and track student progress across multiple classes.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-white/20 text-center">
        <p className="text-gray-600">
          Built with ❤️ for better math education • 
          <a href="https://github.com" className="text-purple-600 hover:text-purple-700 ml-2">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}