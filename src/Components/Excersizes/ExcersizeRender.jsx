import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ExerciseRenderer({ exercise, userAnswer, onAnswerChange, disabled }) {
  const renderMultipleChoice = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{exercise.question}</h3>
      <div className="grid gap-3">
        {exercise.options.map((option, index) => (
          <Button
            key={index}
            variant={userAnswer === option ? "default" : "outline"}
            onClick={() => onAnswerChange(option)}
            disabled={disabled}
            className={`p-4 h-auto text-left justify-start ${
              userAnswer === option 
                ? "bg-purple-500 text-white" 
                : "hover:bg-purple-50"
            }`}
          >
            <span className="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center text-sm">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderDragDrop = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">{exercise.question}</h3>
      
      {/* Simplified drag-drop as input for now */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
        <p className="text-gray-600 mb-4">Enter your answer:</p>
        <Input
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          disabled={disabled}
          placeholder="Type your answer here..."
          className="text-lg p-4 rounded-xl"
        />
      </div>
    </div>
  );

  const renderMatching = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">{exercise.question}</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-teal-50">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3 text-green-800">Options</h4>
            <div className="space-y-2">
              {exercise.options?.map((option, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border">
                  {option}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div>
          <p className="text-gray-600 mb-4">Your answer:</p>
          <Input
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            disabled={disabled}
            placeholder="Enter your match..."
            className="text-lg p-4 rounded-xl"
          />
        </div>
      </div>
    </div>
  );

  const renderCalculation = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 inline-block mb-6">
          <h3 className="text-3xl font-bold text-gray-800">{exercise.question}</h3>
        </div>
      </div>
      
      <div className="max-w-md mx-auto">
        <Input
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          disabled={disabled}
          placeholder="Enter your answer..."
          className="text-center text-2xl p-6 rounded-2xl border-2 border-gray-200 focus:border-purple-400"
          type="number"
        />
      </div>
    </div>
  );

  const renderDefault = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">{exercise.question}</h3>
      <Input
        value={userAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
        disabled={disabled}
        placeholder="Enter your answer..."
        className="text-lg p-4 rounded-xl"
      />
    </div>
  );

  switch (exercise.exercise_type) {
    case 'multiple_choice':
      return renderMultipleChoice();
    case 'drag_drop':
      return renderDragDrop();
    case 'matching':
      return renderMatching();
    case 'calculation':
      return renderCalculation();
    default:
      return renderDefault();
  }
}