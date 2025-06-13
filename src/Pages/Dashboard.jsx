
import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Topic } from "@/entities/Topic";
import { UserProgress } from "@/entities/UserProgress";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Trophy, Target, Zap, ArrowRight, Star } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUser = await User.me();

        // If user hasn't completed setup, redirect them
        if (!currentUser.user_type) {
          navigate(createPageUrl("Setup"));
          return;
        }

        setUser(currentUser);

        const allTopics = await Topic.list();
        const gradeTopics = allTopics.filter(topic =>
          topic.grade_level <= currentUser.grade &&
          topic.difficulty <= (currentUser.current_level || 1) + 1
        );
        setTopics(gradeTopics);

        const userProgress = await UserProgress.filter({ user_id: currentUser.id });
        setProgress(userProgress);
      } catch (error) {
        console.error("Error loading dashboard:", error);
        // If there's any auth error, redirect to setup which handles login
        navigate(createPageUrl("Setup"));
      }
      setLoading(false);
    };
    loadData();
  }, [navigate]);

  const getTopicStats = (topicId) => {
    const topicProgress = progress.filter(p => p.topic_id === topicId);
    const completed = topicProgress.filter(p => p.is_correct).length;
    const total = topicProgress.length;
    const accuracy = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, accuracy };
  };

  const getTotalStats = () => {
    const totalExercises = progress.length;
    const correctAnswers = progress.filter(p => p.is_correct).length;
    const totalPoints = progress.reduce((sum, p) => sum + (p.points_earned || 0), 0);
    const accuracy = totalExercises > 0 ? Math.round((correctAnswers / totalExercises) * 100) : 0;

    return { totalExercises, correctAnswers, totalPoints, accuracy };
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded-xl w-64"></div>
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = getTotalStats();

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.first_name}! 🎉
        </h1>
        <p className="text-gray-600">
          Ready to continue your math journey? You're in Grade {user?.grade}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-0">
          <CardContent className="p-4 text-center">
            <Trophy className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-800">{stats.totalPoints}</div>
            <div className="text-sm text-purple-600">Points Earned</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-100 to-green-200 border-0">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-800">{stats.accuracy}%</div>
            <div className="text-sm text-green-600">Accuracy</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-0">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-800">{stats.totalExercises}</div>
            <div className="text-sm text-blue-600">Exercises Done</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-0">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-800">{user?.current_level || 1}</div>
            <div className="text-sm text-yellow-600">Current Level</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link to={createPageUrl("Exercises")}>
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Continue Exercises</h3>
              <p className="text-sm text-gray-600 mb-4">Practice math problems and improve your skills</p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                Start Practicing
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to={createPageUrl("Games")}>
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-teal-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Play Games</h3>
              <p className="text-sm text-gray-600 mb-4">Fun interactive math games and challenges</p>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-full">
                Play Now
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to={createPageUrl("Progress")}>
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">View Progress</h3>
              <p className="text-sm text-gray-600 mb-4">Track your achievements and growth</p>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full">
                View Stats
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Suggested Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Suggested Topics for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.slice(0, 6).map((topic) => {
              const stats = getTopicStats(topic.id);
              return (
                <div
                  key={topic.id}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${
                      topic.color === 'purple' ? 'from-purple-400 to-purple-500' :
                      topic.color === 'teal' ? 'from-teal-400 to-teal-500' :
                      topic.color === 'blue' ? 'from-blue-400 to-blue-500' :
                      'from-yellow-400 to-yellow-500'
                    }`}>
                      <span className="text-white text-lg">📚</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Grade {topic.grade_level}
                    </Badge>
                  </div>

                  <h4 className="font-semibold text-gray-800 mb-2">{topic.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{topic.description}</p>

                  {stats.total > 0 && (
                    <div className="text-xs text-gray-500 mb-3">
                      {stats.completed}/{stats.total} completed • {stats.accuracy}% accuracy
                    </div>
                  )}

                  <Link to={createPageUrl(`Exercises?topic=${topic.id}`)}>
                    <Button size="sm" variant="outline" className="w-full group">
                      Start Topic
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
