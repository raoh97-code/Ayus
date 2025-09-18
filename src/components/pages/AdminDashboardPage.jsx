import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, User, Bell, MessageSquare, Activity, Users, Edit, Plus, CheckCircle, AlertCircle, Shield, Hospital, UserPlus, Settings, BarChart3, Database, Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';

// Mock data for admin dashboard
const mockAdminData = {
  profile: {
    name: 'Admin User',
    role: 'System Administrator',
    hospital: 'AyurSutra Healthcare Network',
    permissions: ['Full Access', 'User Management', 'System Configuration']
  },
  systemStats: {
    totalHospitals: 12,
    totalDoctors: 85,
    totalPatients: 2450,
    monthlyAppointments: 1250,
    systemUptime: '99.9%',
    activeUsers: 156
  },
  recentActivities: [
    {
      id: 1,
      type: 'user_created',
      title: 'New Doctor Registration',
      message: 'Dr. Amit Kumar registered at Wellness Center Mumbai',
      time: '10 minutes ago',
      priority: 'normal'
    },
    {
      id: 2,
      type: 'hospital_updated',
      title: 'Hospital Information Updated',
      message: 'Ayur Wellness Center updated their contact information',
      time: '1 hour ago',
      priority: 'low'
    },
    {
      id: 3,
      type: 'system_alert',
      title: 'High Appointment Volume',
      message: 'Unusual spike in appointment bookings detected',
      time: '2 hours ago',
      priority: 'high'
    }
  ],
  pendingApprovals: [
    {
      id: 1,
      type: 'doctor_verification',
      title: 'Doctor Verification Pending',
      description: 'Dr. Priya Sharma - Panchakarma Specialist',
      submittedBy: 'Wellness Center Delhi',
      submittedDate: '2024-01-14'
    },
    {
      id: 2,
      type: 'hospital_registration',
      title: 'New Hospital Registration',
      description: 'Ayurvedic Healing Center - Bangalore',
      submittedBy: 'Dr. Rajesh Gupta',
      submittedDate: '2024-01-13'
    }
  ]
};

export default function AdminDashboardPage() {
  const { member } = useMember();
  const [activeTab, setActiveTab] = useState('overview');
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddHospitalOpen, setIsAddHospitalOpen] = useState(false);
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);

  // Form states
  const [newHospital, setNewHospital] = useState({
    hospitalName: '',
    address: '',
    phoneNumber: '',
    email: '',
    description: '',
    websiteUrl: ''
  });

  const [newDoctor, setNewDoctor] = useState({
    fullName: '',
    specialization: '',
    contactEmail: '',
    yearsOfExperience: '',
    bio: '',
    hospitalAffiliation: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hospitalsData, doctorsData] = await Promise.all([
          BaseCrudService.getAll('hospitals'),
          BaseCrudService.getAll('doctors')
        ]);
        setHospitals(hospitalsData.items);
        setDoctors(doctorsData.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddHospital = async () => {
    try {
      const hospitalData = {
        ...newHospital,
        _id: crypto.randomUUID()
      };
      
      await BaseCrudService.create('hospitals', hospitalData);
      
      // Refresh hospitals list
      const { items } = await BaseCrudService.getAll('hospitals');
      setHospitals(items);
      
      // Reset form
      setNewHospital({
        hospitalName: '',
        address: '',
        phoneNumber: '',
        email: '',
        description: '',
        websiteUrl: ''
      });
      
      setIsAddHospitalOpen(false);
      alert('Hospital added successfully!');
    } catch (error) {
      console.error('Error adding hospital:', error);
      alert('Failed to add hospital. Please try again.');
    }
  };

  const handleAddDoctor = async () => {
    try {
      const doctorData = {
        ...newDoctor,
        _id: crypto.randomUUID(),
        yearsOfExperience: parseInt(newDoctor.yearsOfExperience) || 0
      };
      
      await BaseCrudService.create('doctors', doctorData);
      
      // Refresh doctors list
      const { items } = await BaseCrudService.getAll('doctors');
      setDoctors(items);
      
      // Reset form
      setNewDoctor({
        fullName: '',
        specialization: '',
        contactEmail: '',
        yearsOfExperience: '',
        bio: '',
        hospitalAffiliation: ''
      });
      
      setIsAddDoctorOpen(false);
      alert('Doctor added successfully!');
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Failed to add doctor. Please try again.');
    }
  };

  const generatePatientId = () => {
    const prefix = 'AYR';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDoctors = doctors.filter(doctor =>
    doctor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="font-heading text-4xl font-bold text-foreground">
                    Admin Dashboard
                  </h1>
                  <p className="font-paragraph text-lg text-foreground/70">
                    {mockAdminData.profile.role} • {mockAdminData.profile.hospital}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="font-paragraph text-sm text-foreground/60">System Status:</span>
                  <Badge variant="default" className="bg-green-500">
                    Online ({mockAdminData.systemStats.systemUptime})
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-paragraph text-sm text-foreground/60">Active Users:</span>
                  <span className="font-paragraph text-sm font-bold text-foreground">
                    {mockAdminData.systemStats.activeUsers}
                  </span>
                </div>
              </div>
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Hospital className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Hospitals</p>
                        <p className="font-heading text-2xl font-bold text-foreground">
                          {mockAdminData.systemStats.totalHospitals}
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
                        <p className="font-paragraph text-sm text-foreground/60">Doctors</p>
                        <p className="font-heading text-2xl font-bold text-foreground">
                          {mockAdminData.systemStats.totalDoctors}
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
                        <User className="w-6 h-6 text-earthy-brown" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Patients</p>
                        <p className="font-heading text-2xl font-bold text-foreground">
                          {mockAdminData.systemStats.totalPatients}
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
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Monthly Appointments</p>
                        <p className="font-heading text-2xl font-bold text-foreground">
                          {mockAdminData.systemStats.monthlyAppointments}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-earthy-brown" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">System Uptime</p>
                        <p className="font-heading text-2xl font-bold text-foreground">
                          {mockAdminData.systemStats.systemUptime}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-light-gold/20 rounded-full flex items-center justify-center">
                        <Activity className="w-6 h-6 text-earthy-brown" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Active Users</p>
                        <p className="font-heading text-2xl font-bold text-foreground">
                          {mockAdminData.systemStats.activeUsers}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
                <TabsTrigger value="overview" className="font-paragraph">Overview</TabsTrigger>
                <TabsTrigger value="hospitals" className="font-paragraph">Hospitals</TabsTrigger>
                <TabsTrigger value="doctors" className="font-paragraph">Doctors</TabsTrigger>
                <TabsTrigger value="patients" className="font-paragraph">Patients</TabsTrigger>
                <TabsTrigger value="analytics" className="font-paragraph">Analytics</TabsTrigger>
                <TabsTrigger value="settings" className="font-paragraph">Settings</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Activities */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="font-heading text-xl">Recent System Activities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockAdminData.recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3 p-3 bg-background rounded-lg">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                activity.priority === 'high' ? 'bg-destructive/10' :
                                activity.priority === 'normal' ? 'bg-primary/10' :
                                'bg-secondary/20'
                              }`}>
                                {activity.type === 'user_created' && <UserPlus className="w-4 h-4 text-primary" />}
                                {activity.type === 'hospital_updated' && <Hospital className="w-4 h-4 text-earthy-brown" />}
                                {activity.type === 'system_alert' && <AlertCircle className="w-4 h-4 text-destructive" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-heading text-sm font-semibold text-foreground">
                                  {activity.title}
                                </h4>
                                <p className="font-paragraph text-sm text-foreground/70">
                                  {activity.message}
                                </p>
                                <span className="font-paragraph text-xs text-foreground/60">
                                  {activity.time}
                                </span>
                              </div>
                              {activity.priority === 'high' && (
                                <Badge variant="destructive" className="text-xs">High</Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Pending Approvals */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="font-heading text-xl">Pending Approvals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockAdminData.pendingApprovals.map((approval) => (
                            <div key={approval.id} className="p-4 border border-secondary/20 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-heading text-sm font-semibold text-foreground">
                                  {approval.title}
                                </h4>
                                <Badge variant="secondary" className="text-xs">Pending</Badge>
                              </div>
                              <p className="font-paragraph text-sm text-foreground/70 mb-2">
                                {approval.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="font-paragraph text-xs text-foreground/60">
                                  Submitted by {approval.submittedBy} on {approval.submittedDate}
                                </span>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline" className="text-xs">
                                    Review
                                  </Button>
                                  <Button size="sm" className="text-xs">
                                    Approve
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>

              {/* Hospitals Tab */}
              <TabsContent value="hospitals" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-heading text-xl">Hospital Management</CardTitle>
                        <Dialog open={isAddHospitalOpen} onOpenChange={setIsAddHospitalOpen}>
                          <DialogTrigger asChild>
                            <Button className="font-paragraph">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Hospital
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="font-heading">Add New Hospital</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-paragraph text-sm">Hospital Name *</Label>
                                  <Input
                                    value={newHospital.hospitalName}
                                    onChange={(e) => setNewHospital({...newHospital, hospitalName: e.target.value})}
                                    placeholder="Enter hospital name"
                                  />
                                </div>
                                <div>
                                  <Label className="font-paragraph text-sm">Phone Number</Label>
                                  <Input
                                    value={newHospital.phoneNumber}
                                    onChange={(e) => setNewHospital({...newHospital, phoneNumber: e.target.value})}
                                    placeholder="Enter phone number"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="font-paragraph text-sm">Address</Label>
                                <Input
                                  value={newHospital.address}
                                  onChange={(e) => setNewHospital({...newHospital, address: e.target.value})}
                                  placeholder="Enter full address"
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-paragraph text-sm">Email</Label>
                                  <Input
                                    type="email"
                                    value={newHospital.email}
                                    onChange={(e) => setNewHospital({...newHospital, email: e.target.value})}
                                    placeholder="Enter email address"
                                  />
                                </div>
                                <div>
                                  <Label className="font-paragraph text-sm">Website URL</Label>
                                  <Input
                                    value={newHospital.websiteUrl}
                                    onChange={(e) => setNewHospital({...newHospital, websiteUrl: e.target.value})}
                                    placeholder="Enter website URL"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="font-paragraph text-sm">Description</Label>
                                <Textarea
                                  value={newHospital.description}
                                  onChange={(e) => setNewHospital({...newHospital, description: e.target.value})}
                                  placeholder="Enter hospital description"
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsAddHospitalOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleAddHospital}>
                                  Add Hospital
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-4 h-4" />
                          <Input
                            placeholder="Search hospitals..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        {filteredHospitals.map((hospital) => (
                          <div key={hospital._id} className="p-4 border border-secondary/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-heading text-base font-semibold text-foreground">
                                {hospital.hospitalName}
                              </h4>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                            <p className="font-paragraph text-sm text-foreground/70 mb-2">
                              {hospital.address}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-foreground/60">
                              {hospital.phoneNumber && (
                                <span>📞 {hospital.phoneNumber}</span>
                              )}
                              {hospital.email && (
                                <span>✉️ {hospital.email}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Doctors Tab */}
              <TabsContent value="doctors" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-heading text-xl">Doctor Management</CardTitle>
                        <Dialog open={isAddDoctorOpen} onOpenChange={setIsAddDoctorOpen}>
                          <DialogTrigger asChild>
                            <Button className="font-paragraph">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Doctor
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="font-heading">Add New Doctor</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-paragraph text-sm">Full Name *</Label>
                                  <Input
                                    value={newDoctor.fullName}
                                    onChange={(e) => setNewDoctor({...newDoctor, fullName: e.target.value})}
                                    placeholder="Enter doctor's full name"
                                  />
                                </div>
                                <div>
                                  <Label className="font-paragraph text-sm">Specialization</Label>
                                  <Input
                                    value={newDoctor.specialization}
                                    onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})}
                                    placeholder="Enter specialization"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-paragraph text-sm">Contact Email</Label>
                                  <Input
                                    type="email"
                                    value={newDoctor.contactEmail}
                                    onChange={(e) => setNewDoctor({...newDoctor, contactEmail: e.target.value})}
                                    placeholder="Enter email address"
                                  />
                                </div>
                                <div>
                                  <Label className="font-paragraph text-sm">Years of Experience</Label>
                                  <Input
                                    type="number"
                                    value={newDoctor.yearsOfExperience}
                                    onChange={(e) => setNewDoctor({...newDoctor, yearsOfExperience: e.target.value})}
                                    placeholder="Enter years of experience"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="font-paragraph text-sm">Hospital Affiliation</Label>
                                <Select value={newDoctor.hospitalAffiliation} onValueChange={(value) => setNewDoctor({...newDoctor, hospitalAffiliation: value})}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select hospital" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {hospitals.map((hospital) => (
                                      <SelectItem key={hospital._id} value={hospital.hospitalName || ''}>
                                        {hospital.hospitalName}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="font-paragraph text-sm">Biography</Label>
                                <Textarea
                                  value={newDoctor.bio}
                                  onChange={(e) => setNewDoctor({...newDoctor, bio: e.target.value})}
                                  placeholder="Enter doctor's biography"
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsAddDoctorOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleAddDoctor}>
                                  Add Doctor
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-4 h-4" />
                          <Input
                            placeholder="Search doctors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        {filteredDoctors.map((doctor) => (
                          <div key={doctor._id} className="p-4 border border-secondary/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-heading text-base font-semibold text-foreground">
                                  {doctor.fullName}
                                </h4>
                                <p className="font-paragraph text-sm text-primary">
                                  {doctor.specialization}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  View Profile
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-foreground/60">
                              <span>🏥 {doctor.hospitalAffiliation}</span>
                              <span>📧 {doctor.contactEmail}</span>
                              <span>⏱️ {doctor.yearsOfExperience} years</span>
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
                        <CardTitle className="font-heading text-xl">Patient Management</CardTitle>
                        <Button className="font-paragraph" onClick={() => alert(`New Patient ID: ${generatePatientId()}`)}>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Generate Patient ID
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-16">
                        <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Database className="w-12 h-12 text-foreground/40" />
                        </div>
                        <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                          Patient Management System
                        </h3>
                        <p className="font-paragraph text-foreground/60 mb-8">
                          Comprehensive patient management features including registration, medical records, 
                          treatment history, and appointment scheduling.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                          <Button variant="outline" className="font-paragraph">
                            View All Patients
                          </Button>
                          <Button variant="outline" className="font-paragraph">
                            Medical Records
                          </Button>
                          <Button variant="outline" className="font-paragraph">
                            Treatment Reports
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">System Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-16">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <BarChart3 className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                          Advanced Analytics Dashboard
                        </h3>
                        <p className="font-paragraph text-foreground/60 mb-8">
                          Comprehensive analytics including appointment trends, treatment success rates, 
                          revenue analysis, and system performance metrics.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                          <Button variant="outline" className="font-paragraph">
                            Appointment Analytics
                          </Button>
                          <Button variant="outline" className="font-paragraph">
                            Revenue Reports
                          </Button>
                          <Button variant="outline" className="font-paragraph">
                            Treatment Success
                          </Button>
                          <Button variant="outline" className="font-paragraph">
                            System Performance
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">System Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-16">
                        <div className="w-24 h-24 bg-light-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Settings className="w-12 h-12 text-earthy-brown" />
                        </div>
                        <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                          System Configuration
                        </h3>
                        <p className="font-paragraph text-foreground/60 mb-8">
                          Configure system settings, user permissions, notification preferences, 
                          backup schedules, and security settings.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                          <Button variant="outline" className="font-paragraph">
                            User Permissions
                          </Button>
                          <Button variant="outline" className="font-paragraph">
                            System Configuration
                          </Button>
                          <Button variant="outline" className="font-paragraph">
                            Security Settings
                          </Button>
                        </div>
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