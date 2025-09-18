import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, Bell, MessageSquare, Activity, Heart, Star, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useMember } from '@/integrations';

// Mock data for demonstration
const mockPatientData = {
  currentTreatment: {
    name: 'Panchakarma Detox Program',
    type: 'Basti Therapy',
    progress: 65,
    sessionsCompleted: 13,
    totalSessions: 20,
    nextSession: '2024-01-15T10:00:00',
    doctor: 'Dr. Priya Sharma'
  },
  upcomingSessions: [
    {
      id: 1,
      date: '2024-01-15',
      time: '10:00 AM',
      treatment: 'Basti Therapy',
      doctor: 'Dr. Priya Sharma',
      location: 'Ayur Wellness Center'
    },
    {
      id: 2,
      date: '2024-01-17',
      time: '2:00 PM',
      treatment: 'Abhyanga Massage',
      doctor: 'Dr. Priya Sharma',
      location: 'Ayur Wellness Center'
    }
  ],
  notifications: [
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Session Reminder',
      message: 'Your Basti therapy session is scheduled for tomorrow at 10:00 AM',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'treatment',
      title: 'Treatment Progress Update',
      message: 'You have completed 65% of your Panchakarma program',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'feedback',
      title: 'Feedback Request',
      message: 'Please share your experience with the recent Nasya therapy session',
      time: '2 days ago',
      read: false
    }
  ],
  recentSessions: [
    {
      id: 1,
      date: '2024-01-12',
      treatment: 'Basti Therapy',
      doctor: 'Dr. Priya Sharma',
      status: 'completed',
      feedback: 'Excellent session, feeling much better'
    },
    {
      id: 2,
      date: '2024-01-10',
      treatment: 'Abhyanga Massage',
      doctor: 'Dr. Priya Sharma',
      status: 'completed',
      feedback: 'Very relaxing and therapeutic'
    }
  ]
};

export default function DashboardPage() {
  const { member } = useMember();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
                Welcome back, {member?.contact?.firstName || 'Patient'}!
              </h1>
              <p className="font-paragraph text-lg text-foreground/70">
                Track your wellness journey and manage your treatments
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="overview" className="font-paragraph">Overview</TabsTrigger>
                <TabsTrigger value="sessions" className="font-paragraph">Sessions</TabsTrigger>
                <TabsTrigger value="progress" className="font-paragraph">Progress</TabsTrigger>
                <TabsTrigger value="notifications" className="font-paragraph">Notifications</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Activity className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-paragraph text-sm text-foreground/60">Current Treatment</p>
                            <p className="font-heading text-lg font-semibold text-foreground">
                              {mockPatientData.currentTreatment.type}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-earthy-brown" />
                          </div>
                          <div>
                            <p className="font-paragraph text-sm text-foreground/60">Sessions Completed</p>
                            <p className="font-heading text-lg font-semibold text-foreground">
                              {mockPatientData.currentTreatment.sessionsCompleted}/{mockPatientData.currentTreatment.totalSessions}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-light-gold/20 rounded-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-earthy-brown" />
                          </div>
                          <div>
                            <p className="font-paragraph text-sm text-foreground/60">Next Session</p>
                            <p className="font-heading text-lg font-semibold text-foreground">
                              Jan 15, 10:00 AM
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-paragraph text-sm text-foreground/60">Progress</p>
                            <p className="font-heading text-lg font-semibold text-foreground">
                              {mockPatientData.currentTreatment.progress}%
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Current Treatment Progress */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">Current Treatment Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-heading text-lg font-semibold text-foreground">
                            {mockPatientData.currentTreatment.name}
                          </h3>
                          <Badge variant="secondary" className="font-paragraph">
                            {mockPatientData.currentTreatment.type}
                          </Badge>
                        </div>
                        <p className="font-paragraph text-sm text-foreground/70 mb-4">
                          Under the care of {mockPatientData.currentTreatment.doctor}
                        </p>
                        <Progress value={mockPatientData.currentTreatment.progress} className="h-3" />
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-paragraph text-sm text-foreground/60">
                            {mockPatientData.currentTreatment.sessionsCompleted} of {mockPatientData.currentTreatment.totalSessions} sessions completed
                          </span>
                          <span className="font-paragraph text-sm font-medium text-primary">
                            {mockPatientData.currentTreatment.progress}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Upcoming Sessions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">Upcoming Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockPatientData.upcomingSessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-heading text-base font-semibold text-foreground">
                                  {session.treatment}
                                </h4>
                                <p className="font-paragraph text-sm text-foreground/70">
                                  {session.date} at {session.time} • {session.doctor}
                                </p>
                                <p className="font-paragraph text-xs text-foreground/60">
                                  {session.location}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="font-paragraph">
                              Reschedule
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Sessions Tab */}
              <TabsContent value="sessions" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">Recent Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockPatientData.recentSessions.map((session) => (
                          <div key={session.id} className="p-4 border border-secondary/20 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <Badge 
                                  variant={session.status === 'completed' ? 'default' : 'secondary'}
                                  className="font-paragraph"
                                >
                                  {session.status}
                                </Badge>
                                <h4 className="font-heading text-base font-semibold text-foreground">
                                  {session.treatment}
                                </h4>
                              </div>
                              <span className="font-paragraph text-sm text-foreground/60">
                                {session.date}
                              </span>
                            </div>
                            <p className="font-paragraph text-sm text-foreground/70 mb-2">
                              Conducted by {session.doctor}
                            </p>
                            {session.feedback && (
                              <div className="bg-primary/5 p-3 rounded-lg">
                                <p className="font-paragraph text-sm text-foreground/70">
                                  <strong>Your feedback:</strong> {session.feedback}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Progress Tab */}
              <TabsContent value="progress" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">Treatment Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 relative">
                          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#558B2F"
                              strokeWidth="2"
                              strokeDasharray={`${mockPatientData.currentTreatment.progress}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-heading text-2xl font-bold text-foreground">
                              {mockPatientData.currentTreatment.progress}%
                            </span>
                          </div>
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                          Overall Progress
                        </h3>
                        <p className="font-paragraph text-sm text-foreground/70">
                          You're making excellent progress on your wellness journey!
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-primary/5 rounded-lg">
                          <h4 className="font-heading text-base font-semibold text-foreground mb-2">
                            Sessions Completed
                          </h4>
                          <p className="font-paragraph text-2xl font-bold text-primary">
                            {mockPatientData.currentTreatment.sessionsCompleted}
                          </p>
                        </div>
                        <div className="text-center p-4 bg-secondary/20 rounded-lg">
                          <h4 className="font-heading text-base font-semibold text-foreground mb-2">
                            Sessions Remaining
                          </h4>
                          <p className="font-paragraph text-2xl font-bold text-earthy-brown">
                            {mockPatientData.currentTreatment.totalSessions - mockPatientData.currentTreatment.sessionsCompleted}
                          </p>
                        </div>
                        <div className="text-center p-4 bg-light-gold/20 rounded-lg">
                          <h4 className="font-heading text-base font-semibold text-foreground mb-2">
                            Estimated Completion
                          </h4>
                          <p className="font-paragraph text-sm font-bold text-earthy-brown">
                            Feb 15, 2024
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockPatientData.notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 rounded-lg border ${
                              notification.read 
                                ? 'border-secondary/20 bg-white' 
                                : 'border-primary/20 bg-primary/5'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                notification.type === 'appointment' ? 'bg-primary/10' :
                                notification.type === 'treatment' ? 'bg-secondary/20' :
                                'bg-light-gold/20'
                              }`}>
                                {notification.type === 'appointment' && <Calendar className="w-4 h-4 text-primary" />}
                                {notification.type === 'treatment' && <Activity className="w-4 h-4 text-earthy-brown" />}
                                {notification.type === 'feedback' && <MessageSquare className="w-4 h-4 text-earthy-brown" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-heading text-base font-semibold text-foreground mb-1">
                                  {notification.title}
                                </h4>
                                <p className="font-paragraph text-sm text-foreground/70 mb-2">
                                  {notification.message}
                                </p>
                                <span className="font-paragraph text-xs text-foreground/60">
                                  {notification.time}
                                </span>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}