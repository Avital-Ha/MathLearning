import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Exercise } from "@/entities/Exercise";
import { Topic } from "@/entities/Topic";
import { UserProgress } from "@/entities/UserProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Lightbulb, RotateCcw, ArrowRight } from "lucide-react";

import ExerciseRenderer from "../components/exercises/ExerciseRenderer";

export default function Exercises() {
  const [user, setUser] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exerciseComplete, setExerciseComplete] = useState(false);

  useEffect(() => {
    const loadExercise = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);

        // Get topic from URL params if specified
        const urlParams = new URLSearchParams(window.location.search);
        const topicId = urlParams.get('topic');

        let selectedTopic;
        if (topicId) {
          const topics = await Topic.list();
          selectedTopic = topics.find(t => t.id === topicId);
        } else {
          // Get a random topic suitable for the user's level
          const topics = await Topic.list();
          const suitableTopics = topics.filter(t => 
            t.grade_level <= currentUser.grade && 
            t.difficulty <= (currentUser.current_level || 1) + 1
          );
          selectedTopic = suitableTopics[Math.floor(Math.random() * suitableTopics.length)];
        }

        if (selectedTopic) {
          setCurrentTopic(selectedTopic);
          
          // Get exercises for this topic
          const exercises = await Exercise.filter({ topic_id: selectedTopic.id });
          const suitableExercises = exercises.filter(e => 
            e.difficulty_level <= (currentUser.current_level || 1) + 1
          );
          
          if (suitableExercises.length > 0) {
            const randomExercise = suitableExercises[Math.floor(Math.random() * suitableExercises.length)];
            setCurrentExercise(randomExercise);
          }
        }
      } catch (error) {
        console.error("Error loading exercise:", error);
      }
      setLoading(false);
    };
    loadExercise();
  }, []);

  const checkAnswer = async () => {
    if (!currentExercise || !user) return;

    const isCorrect = userAnswer.toLowerCase().trim() === currentExercise.correct_answer.toLowerCase().trim();
    
    setFeedback({
      isCorrect,
      message: isCorrect 
        ? "🎉 Excellent! That's correct!" 
        : "Not quite right. Try again or use the hint!"
    });

    // Save progress
    await UserProgress.create({
      user_id: user.id,
      topic_id: currentExercise.topic_id,
      exercise_id: currentExercise.id,
      is_correct: isCorrect,
      points_earned: isCorrect ? currentExercise.points : 0,
      difficulty_level: currentExercise.difficulty_level
    });

    if (isCorrect) {
      setExerciseComplete(true);
      
      // Update user level based on performance (simple adaptive logic)
      const recentProgress = await UserProgress.filter({ user_id: user.id }, '-created_date', 5);
      const recentCorrect = recentProgress.filter(p => p.is_correct).length;
      
      if (recentCorrect >= 4) {
        // Increase difficulty if doing well
        await User.updateMyUserData({
          current_level: Math.min((user.current_level || 1) + 1, 5)
        });
      }
    }
  };

  const nextExercise = async () => {
    setUserAnswer("");
    setFeedback(null);
    setShowHint(false);
    setExerciseComplete(false);
    
    // Load new exercise
    const exercises = await Exercise.filter({ topic_id: currentTopic.id });
    const suitableExercises = exercises.filter(e => 
      e.difficulty_level <= (user.current_level || 1) + 1
    );
    
    if (suitableExercises.length > 0) {
      const randomExercise = suitableExercises[Math.floor(Math.random() * suitableExercises.length)];
      setCurrentExercise(randomExercise);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded-xl w-64"></div>
          <Card>
            <CardContent className="p-8">
              <div className="h-32 bg-gray-200 rounded-xl"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentExercise || !currentTopic) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <Card>
          <CardContent className="p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Exercises Available</h2>
            <p className="text-gray-600 mb-6">
              We're working on adding more exercises for your level!
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Badge className="bg-purple-100 text-purple-700">
            {currentTopic.category.replace('_', ' ')}
          </Badge>
          <Badge variant="outline">
            Level {currentExercise.difficulty_level}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{currentTopic.title}</h1>
        <p className="text-gray-600">{currentTopic.description}</p>
      </div>

      {/* Exercise Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Exercise</span>
            <Badge className="bg-orange-100 text-orange-700">
              {currentExercise.points} points
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <ExerciseRenderer
            exercise={currentExercise}
            userAnswer={userAnswer}
            onAnswerChange={setUserAnswer}
            disabled={exerciseComplete}
          />

          {/* Hint Section */}
          {currentExercise.hint && (
            <div className="mt-6">
              {!showHint ? (
                <Button
                  variant="outline"
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  Show Hint
                </Button>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-yellow-700 font-medium mb-2">
                    <Lightbulb className="w-4 h-4" />
                    Hint
                  </div>
                  <p className="text-yellow-800">{currentExercise.hint}</p>
                </div>
              )}
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div className={`mt-6 p-4 rounded-xl border ${
              feedback.isCorrect 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2">
                {feedback.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${
                  feedback.isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {feedback.message}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            {!exerciseComplete ? (
              <>
                <Button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Check Answer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setUserAnswer("");
                    setFeedback(null);
                    setShowHint(false);
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </>
            ) : (
              <Button
                onClick={nextExercise}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Next Exercise
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}