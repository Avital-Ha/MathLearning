
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Users, GraduationCap, ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Setup() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [grade, setGrade] = useState("");
  const [childName, setChildName] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        
        // If user already has profile set up, redirect to dashboard
        if (currentUser.user_type) {
          navigate(createPageUrl("Dashboard"));
          return;
        }
        
        // Pre-fill name if available
        if (currentUser.full_name) {
          setFirstName(currentUser.full_name.split(' ')[0]);
        }
      } catch (error) {
        // User not logged in, redirect to login
        await User.login();
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const profileData = {
        user_type: userType,
        first_name: firstName,
        current_level: 1
      };
      
      if (userType === "student") {
        profileData.grade = parseInt(grade);
      } else if (userType === "parent") {
        profileData.child_name = childName;
      }
      
      await User.updateMyUserData(profileData);
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Error saving profile:", error);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-9 h-9 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to MathLearning!
            </span>
          </h1>
          <p className="text-gray-600">
            Let's set up your profile to get started
          </p>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>I am a...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => handleUserTypeSelect("student")}
                className="w-full h-16 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-2xl text-lg font-semibold"
              >
                <Calculator className="w-6 h-6 mr-3" />
                Student
              </Button>

              <Button
                onClick={() => handleUserTypeSelect("parent")}
                className="w-full h-16 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white rounded-2xl text-lg font-semibold"
              >
                <Users className="w-6 h-6 mr-3" />
                Parent
              </Button>

              <Button
                onClick={() => handleUserTypeSelect("teacher")}
                className="w-full h-16 bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white rounded-2xl text-lg font-semibold"
              >
                <GraduationCap className="w-6 h-6 mr-3" />
                Teacher
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {userType === "student" && <Calculator className="w-5 h-5 text-blue-500" />}
                {userType === "parent" && <Users className="w-5 h-5 text-teal-500" />}
                {userType === "teacher" && <GraduationCap className="w-5 h-5 text-purple-500" />}
                {userType === "student" ? "Student Profile" : userType === "parent" ? "Parent Profile" : "Teacher Profile"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    {userType === "student" ? "What's your first name?" : "Your first name"}
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="h-12 rounded-xl border-2 border-gray-200"
                    required
                  />
                </div>

                {userType === "student" && (
                  <div className="space-y-2">
                    <Label htmlFor="grade">What grade are you in?</Label>
                    <Select value={grade} onValueChange={setGrade} required>
                      <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200">
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {[6, 7, 8, 9, 10, 11, 12].map((gradeNum) => (
                          <SelectItem key={gradeNum} value={gradeNum.toString()}>
                            Grade {gradeNum}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {userType === "parent" && (
                  <div className="space-y-2">
                    <Label htmlFor="childName">Your child's name</Label>
                    <Input
                      id="childName"
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Enter your child's name"
                      className="h-12 rounded-xl border-2 border-gray-200"
                      required
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={saving || !firstName || (userType === "student" && !grade) || (userType === "parent" && !childName)}
                    className={`flex-1 ${
                      userType === "student" ? "bg-blue-500 hover:bg-blue-600" :
                      userType === "parent" ? "bg-teal-500 hover:bg-teal-600" :
                      "bg-purple-500 hover:bg-purple-600"
                    } text-white`}
                  >
                    {saving ? "Setting up..." : "Get Started!"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to={createPageUrl("Home")} 
            className="text-purple-600 hover:text-purple-700 text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
