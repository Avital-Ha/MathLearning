import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Puzzle, Calculator, Shapes, FunctionSquare, BarChart2, Clock } from 'lucide-react';

const gamesList = [
  {
    title: 'Fraction Matcher',
    description: 'Match equivalent fractions and decimals in a race against the clock.',
    icon: Puzzle,
    color: 'blue',
    link: createPageUrl('Exercises?topic=2')
  },
  {
    title: 'Algebraic Equations',
    description: 'Solve for x in this fast-paced equation challenge.',
    icon: FunctionSquare,
    color: 'teal',
    link: createPageUrl('Exercises?topic=3')
  },
  {
    title: 'Geometry Genius',
    description: 'Calculate area and perimeter for various shapes.',
    icon: Shapes,
    color: 'purple',
    link: createPageUrl('Exercises?topic=6')
  },
  {
    title: 'Calculation Sprint',
    description: 'How many arithmetic problems can you solve in 60 seconds?',
    icon: Calculator,
    color: 'yellow',
    link: createPageUrl('Exercises?topic=1')
  },
  {
    title: 'Probability Puzzle',
    description: 'Guess the probability of different outcomes.',
    icon: BarChart2,
    color: 'blue',
    link: createPageUrl('Exercises')
  },
  {
    title: 'Timed Tables',
    description: 'Master your multiplication tables under pressure.',
    icon: Clock,
    color: 'teal',
    link: createPageUrl('Exercises')
  }
];

export default function Games() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Math Games</h1>
        <p className="text-gray-600">Sharpen your skills with these fun and interactive challenges!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gamesList.map((game, index) => (
          <Card key={index} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className={`bg-gradient-to-br ${
              game.color === 'blue' ? 'from-blue-100 to-blue-200' :
              game.color === 'teal' ? 'from-teal-100 to-teal-200' :
              game.color === 'purple' ? 'from-purple-100 to-purple-200' :
              'from-yellow-100 to-yellow-200'
            } flex items-center justify-center p-8`}>
              <game.icon className={`w-16 h-16 ${
                game.color === 'blue' ? 'text-blue-600' :
                game.color === 'teal' ? 'text-teal-600' :
                game.color === 'purple' ? 'text-purple-600' :
                'text-yellow-600'
              }`} />
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              <CardTitle className="mb-2">{game.title}</CardTitle>
              <p className="text-gray-600 text-sm flex-1">{game.description}</p>
              <Link to={game.link} className="mt-4">
                <Button className={`w-full group bg-${game.color}-500 hover:bg-${game.color}-600 text-white`}>
                  Play Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}