import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, Bell, MessageSquare, Activity, Users, Edit, Plus, CheckCircle, AlertCircle, Stethoscope } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useMember } from '@/integrations';

// Mock data for doctor dashboard
const mockDoctorData = {
  profile: {
    name: 'Dr. Priya Sharma',
    specialization: 'Panchakarma Specialist',
    experience: '15 years',
    rating: 4.9,
    totalPatients: 1250,
    hospital: 'Ayur Wellness Center'
  },
  todaySchedule: [
    {
      id: 1,
      time: '09:00 AM',
      patient: 'Rajesh Kumar',
      treatment: 'Basti Therapy',
      type: 'Follow-up',
      status: 'confirmed',
      duration: '60 min'
    },
    {
      id: 2,
      time: '10:30 AM',
      patient: 'Priya Singh',
      treatment: 'Vaman Therapy',
      type: 'Initial Consultation',
      status: 'confirmed',
      duration: '90 min'
    },
    {
      id: 3,
      time: '02:00 PM',
      patient: 'Amit Patel',
      treatment: 'Nasya Therapy',
      type: 'Treatment Session',
      status: 'pending',
      duration: '45 min'
    },
    {
      id: 4,
      time: '03:30 PM',
      patient: 'Sunita Devi',
      treatment: 'Abhyanga Massage',
      type: 'Follow-up',
      status: 'confirmed',
      duration: '60 min'
    }
  ],
  patients: [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 45,
      treatment: 'Panchakarma Detox',
      progress: 75,
      nextSession: '2024-01-15',
      status: 'active',
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      name: 'Priya Singh',
      age: 32,
      treatment: 'Vaman Therapy',
      progress: 30,
      nextSession: '2024-01-16',
      status: 'active',
      phone: '+91 98765 43211'
    },
    {
      id: 3,
      name: 'Amit Patel',
      age: 38,
      treatment: 'Basti Therapy',
      progress: 90,
      nextSession: '2024-01-18',
      status: 'completing',
      phone: '+91 98765 43212'
    }
  ],
  notifications: [
    {
      id: 1,
      type: 'appointment',
      title: 'New Appointment Request',
      message: 'Meera Sharma has requested an appointment for Virechan therapy',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'feedback',
      title: 'Patient Feedback',
      message: 'Rajesh Kumar left a 5-star review for yesterday\'s session',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'schedule',
      title: 'Schedule Change',
      message: 'Tomorrow\'s 11:00 AM appointment has been rescheduled to 2:00 PM',
      time: '1 day ago',
      read: true
    }
  ],
  stats: {
    todayAppointments: 4,
    weeklyPatients: 28,
    monthlyTreatments: 95,
    patientSatisfaction: 4.9
  }
};

export default function DoctorDashboardPage() {
  const { member } = useMember();
  const [activeTab, setActiveTab] = useState('schedule');

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
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="font-heading text-4xl font-bold text-foreground">
                    Welcome, {mockDoctorData.profile.name}
                  </h1>
                  <p className="font-paragraph text-lg text-foreground/70">
                    {mockDoctorData.profile.specialization} • {mockDoctorData.profile.experience} experience
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="font-paragraph text-sm text-foreground/60">Rating:</span>
                  <span className="font-paragraph text-sm font-bold text-primary">
                    ⭐ {mockDoctorData.profile.rating}/5
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-paragraph text-sm text-foreground/60">Total Patients:</span>
                  <span className="font-paragraph text-sm font-bold text-foreground">
                    {mockDoctorData.profile.totalPatients}+
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-paragraph text-sm text-foreground/60">Hospital:</span>
                  <span className="font-paragraph text-sm font-bold text-foreground">
                    {mockDoctorData.profile.hospital}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Today's Appointments</p>
                        <p className="font-heading text-2xl font-bold text-foreground">
                          {mockDoctorData.stats.todayAppointments}
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
                        <Users className="w-6 h-6 text-earthy-brown" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Weekly Patients</p>
                        <p className="font-heading text-2xl font-bold text-foreground">
                          {mockDoctorData.stats.weeklyPatients}
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
                        <Activity className="w-6 h-6 text-earthy-brown" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Monthly Treatments</p>
                        <p className="font-heading text-2xl font-bold text-foreground">
                          {mockDoctorData.stats.monthlyTreatments}
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
                        <MessageSquare className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Patient Satisfaction</p>
                        <p className="font-heading text-2xl font-bold text-foreground">
                          {mockDoctorData.stats.patientSatisfaction}/5
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="schedule" className="font-paragraph">Today's Schedule</TabsTrigger>
                <TabsTrigger value="patients" className="font-paragraph">My Patients</TabsTrigger>
                <TabsTrigger value="notifications" className="font-paragraph">Notifications</TabsTrigger>
                <TabsTrigger value="profile" className="font-paragraph">Profile</TabsTrigger>
              </TabsList>

              {/* Today's Schedule Tab */}
              <TabsContent value="schedule" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-heading text-xl">Today's Schedule</CardTitle>
                        <Button size="sm" className="font-paragraph">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Appointment
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockDoctorData.todaySchedule.map((appointment) => (
                          <div key={appointment.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-secondary/20">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Clock className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-3 mb-1">
                                  <h4 className="font-heading text-base font-semibold text-foreground">
                                    {appointment.time}
                                  </h4>
                                  <Badge 
                                    variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                                    className="font-paragraph text-xs"
                                  >
                                    {appointment.status}
                                  </Badge>
                                </div>
                                <p className="font-paragraph text-sm text-foreground/70">
                                  <strong>{appointment.patient}</strong> • {appointment.treatment}
                                </p>
                                <p className="font-paragraph text-xs text-foreground/60">
                                  {appointment.type} • {appointment.duration}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" className="font-paragraph">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" className="font-paragraph">
                                Start Session
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Patients Tab */}
              <TabsContent value="patients" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-heading text-xl">My Patients</CardTitle>
                        <Button size="sm" className="font-paragraph">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Patient
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockDoctorData.patients.map((patient) => (
                          <div key={patient.id} className="p-4 border border-secondary/20 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-heading text-base font-semibold text-foreground">
                                    {patient.name}
                                  </h4>
                                  <p className="font-paragraph text-sm text-foreground/70">
                                    Age: {patient.age} • {patient.phone}
                                  </p>
                                </div>
                              </div>
                              <Badge 
                                variant={patient.status === 'active' ? 'default' : 'secondary'}
                                className="font-paragraph"
                              >
                                {patient.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-paragraph text-sm text-foreground/70">
                                    Treatment: {patient.treatment}
                                  </span>
                                  <span className="font-paragraph text-sm font-medium text-primary">
                                    {patient.progress}%
                                  </span>
                                </div>
                                <div className="w-full bg-secondary/20 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${patient.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="font-paragraph text-sm text-foreground/60">
                                  Next Session: {patient.nextSession}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm" className="font-paragraph">
                                    View History
                                  </Button>
                                  <Button size="sm" className="font-paragraph">
                                    Update Treatment
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
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
                        {mockDoctorData.notifications.map((notification) => (
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
                                notification.type === 'feedback' ? 'bg-secondary/20' :
                                'bg-light-gold/20'
                              }`}>
                                {notification.type === 'appointment' && <Calendar className="w-4 h-4 text-primary" />}
                                {notification.type === 'feedback' && <MessageSquare className="w-4 h-4 text-earthy-brown" />}
                                {notification.type === 'schedule' && <Clock className="w-4 h-4 text-earthy-brown" />}
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

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">Doctor Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-heading text-base font-semibold text-foreground mb-2">
                              Professional Information
                            </h4>
                            <div className="space-y-2">
                              <p className="font-paragraph text-sm">
                                <strong>Name:</strong> {mockDoctorData.profile.name}
                              </p>
                              <p className="font-paragraph text-sm">
                                <strong>Specialization:</strong> {mockDoctorData.profile.specialization}
                              </p>
                              <p className="font-paragraph text-sm">
                                <strong>Experience:</strong> {mockDoctorData.profile.experience}
                              </p>
                              <p className="font-paragraph text-sm">
                                <strong>Hospital:</strong> {mockDoctorData.profile.hospital}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-heading text-base font-semibold text-foreground mb-2">
                              Performance Metrics
                            </h4>
                            <div className="space-y-2">
                              <p className="font-paragraph text-sm">
                                <strong>Patient Rating:</strong> ⭐ {mockDoctorData.profile.rating}/5
                              </p>
                              <p className="font-paragraph text-sm">
                                <strong>Total Patients:</strong> {mockDoctorData.profile.totalPatients}+
                              </p>
                              <p className="font-paragraph text-sm">
                                <strong>Monthly Treatments:</strong> {mockDoctorData.stats.monthlyTreatments}
                              </p>
                              <p className="font-paragraph text-sm">
                                <strong>Patient Satisfaction:</strong> {mockDoctorData.stats.patientSatisfaction}/5
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 pt-4 border-t border-secondary/20">
                        <Button className="font-paragraph">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                        <Button variant="outline" className="font-paragraph">
                          View Public Profile
                        </Button>
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