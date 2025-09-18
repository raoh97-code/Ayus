import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { Hospitals } from '@/entities/hospitals';
import { Treatments } from '@/entities/treatments';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM'
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  hospital: string;
  treatment: string;
  preferredDate: Date | undefined;
  preferredTime: string;
  symptoms: string;
  medicalHistory: string;
}

export default function AppointmentPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState<Hospitals[]>([]);
  const [treatments, setTreatments] = useState<Treatments[]>([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp] = useState(Math.floor(100000 + Math.random() * 900000).toString());

  // Form data
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    hospital: '',
    treatment: '',
    preferredDate: undefined,
    preferredTime: '',
    symptoms: '',
    medicalHistory: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hospitalsData, treatmentsData] = await Promise.all([
          BaseCrudService.getAll<Hospitals>('hospitals'),
          BaseCrudService.getAll<Treatments>('treatments')
        ]);
        setHospitals(hospitalsData.items);
        setTreatments(treatmentsData.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sendOtp = () => {
    if (!formData.phone) {
      alert('Please enter your phone number');
      return;
    }
    // Simulate OTP sending
    setOtpSent(true);
    alert(`OTP sent to ${formData.phone}: ${generatedOtp}`);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      alert('OTP verified successfully!');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = () => {
    if (!otpVerified) {
      alert('Please verify your phone number with OTP');
      return;
    }
    
    // Simulate appointment booking
    alert('Appointment booked successfully! You will receive a confirmation email shortly.');
    setStep(4); // Success step
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        alert('Please fill in all required fields');
        return;
      }
    } else if (step === 2) {
      if (!formData.hospital || !formData.treatment || !formData.preferredDate || !formData.preferredTime) {
        alert('Please complete all appointment details');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center space-y-6 mb-12">
              <h1 className="font-heading text-5xl font-bold text-foreground">
                Book Your Appointment
              </h1>
              <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
                Schedule your consultation with our experienced Ayurvedic practitioners. 
                Begin your journey to holistic wellness today.
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-paragraph text-sm font-medium ${
                      step >= stepNumber 
                        ? 'bg-primary text-white' 
                        : 'bg-secondary/20 text-foreground/60'
                    }`}>
                      {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                    </div>
                    {stepNumber < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        step > stepNumber ? 'bg-primary' : 'bg-secondary/20'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                      Personal Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="font-paragraph text-sm font-medium">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Enter your first name"
                          className="font-paragraph"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="font-paragraph text-sm font-medium">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Enter your last name"
                          className="font-paragraph"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-paragraph text-sm font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          className="font-paragraph"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-paragraph text-sm font-medium">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                          className="font-paragraph"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="font-paragraph text-sm font-medium">
                          Date of Birth
                        </Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="font-paragraph"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address" className="font-paragraph text-sm font-medium">
                          Address
                        </Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Enter your address"
                          className="font-paragraph"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={nextStep} className="font-paragraph px-8">
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                      Appointment Details
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-paragraph text-sm font-medium">
                          Select Hospital *
                        </Label>
                        <Select value={formData.hospital} onValueChange={(value) => handleInputChange('hospital', value)}>
                          <SelectTrigger className="font-paragraph">
                            <SelectValue placeholder="Choose a hospital" />
                          </SelectTrigger>
                          <SelectContent>
                            {hospitals.map((hospital) => (
                              <SelectItem key={hospital._id} value={hospital._id}>
                                {hospital.hospitalName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="font-paragraph text-sm font-medium">
                          Select Treatment *
                        </Label>
                        <Select value={formData.treatment} onValueChange={(value) => handleInputChange('treatment', value)}>
                          <SelectTrigger className="font-paragraph">
                            <SelectValue placeholder="Choose a treatment" />
                          </SelectTrigger>
                          <SelectContent>
                            {treatments.map((treatment) => (
                              <SelectItem key={treatment._id} value={treatment._id}>
                                {treatment.treatmentName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-paragraph text-sm font-medium">
                          Preferred Date *
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-paragraph"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.preferredDate ? format(formData.preferredDate, 'PPP') : 'Pick a date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.preferredDate}
                              onSelect={(date) => handleInputChange('preferredDate', date)}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="font-paragraph text-sm font-medium">
                          Preferred Time *
                        </Label>
                        <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                          <SelectTrigger className="font-paragraph">
                            <SelectValue placeholder="Choose a time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="symptoms" className="font-paragraph text-sm font-medium">
                        Current Symptoms or Concerns
                      </Label>
                      <Textarea
                        id="symptoms"
                        value={formData.symptoms}
                        onChange={(e) => handleInputChange('symptoms', e.target.value)}
                        placeholder="Describe your current health concerns or symptoms"
                        className="font-paragraph min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicalHistory" className="font-paragraph text-sm font-medium">
                        Medical History
                      </Label>
                      <Textarea
                        id="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                        placeholder="Any relevant medical history, allergies, or current medications"
                        className="font-paragraph min-h-[100px]"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button onClick={prevStep} variant="outline" className="font-paragraph px-8">
                        Previous
                      </Button>
                      <Button onClick={nextStep} className="font-paragraph px-8">
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                      Verification & Confirmation
                    </h2>
                    
                    {/* OTP Verification */}
                    <div className="bg-secondary/10 p-6 rounded-xl space-y-4">
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        Phone Verification
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70">
                        We'll send a verification code to {formData.phone} to confirm your appointment.
                      </p>
                      
                      {!otpSent ? (
                        <Button onClick={sendOtp} className="font-paragraph">
                          <Phone className="mr-2 w-4 h-4" />
                          Send OTP
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex space-x-4">
                            <Input
                              type="text"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              placeholder="Enter 6-digit OTP"
                              className="font-paragraph"
                              maxLength={6}
                              disabled={otpVerified}
                            />
                            {!otpVerified && (
                              <Button onClick={verifyOtp} variant="outline">
                                Verify
                              </Button>
                            )}
                          </div>
                          {otpVerified && (
                            <div className="flex items-center space-x-2 text-primary">
                              <CheckCircle className="w-4 h-4" />
                              <span className="font-paragraph text-sm font-medium">Phone verified successfully</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Appointment Summary */}
                    <div className="bg-white border border-secondary/20 p-6 rounded-xl space-y-4">
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        Appointment Summary
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-sm">
                              {formData.firstName} {formData.lastName}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-sm">{formData.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-sm">{formData.phone}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-sm">
                              {hospitals.find(h => h._id === formData.hospital)?.hospitalName}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-sm">
                              {formData.preferredDate ? format(formData.preferredDate, 'PPP') : ''}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-sm">{formData.preferredTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button onClick={prevStep} variant="outline" className="font-paragraph px-8">
                        Previous
                      </Button>
                      <Button onClick={handleSubmit} className="font-paragraph px-8" disabled={!otpVerified}>
                        Confirm Appointment
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-6 py-8"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                    
                    <h2 className="font-heading text-3xl font-bold text-foreground">
                      Appointment Confirmed!
                    </h2>
                    
                    <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
                      Your appointment has been successfully booked. You will receive a confirmation email 
                      with all the details shortly. Our team will contact you 24 hours before your appointment.
                    </p>

                    <div className="bg-primary/5 p-6 rounded-xl max-w-md mx-auto">
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                        Appointment Details
                      </h3>
                      <div className="space-y-2 text-left">
                        <p className="font-paragraph text-sm">
                          <strong>Date:</strong> {formData.preferredDate ? format(formData.preferredDate, 'PPP') : ''}
                        </p>
                        <p className="font-paragraph text-sm">
                          <strong>Time:</strong> {formData.preferredTime}
                        </p>
                        <p className="font-paragraph text-sm">
                          <strong>Hospital:</strong> {hospitals.find(h => h._id === formData.hospital)?.hospitalName}
                        </p>
                        <p className="font-paragraph text-sm">
                          <strong>Treatment:</strong> {treatments.find(t => t._id === formData.treatment)?.treatmentName}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={() => window.location.href = '/'} className="font-paragraph px-8">
                        Return to Home
                      </Button>
                      <Button onClick={() => setStep(1)} variant="outline" className="font-paragraph px-8">
                        Book Another Appointment
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}