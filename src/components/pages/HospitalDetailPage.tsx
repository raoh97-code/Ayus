import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Star, Users, Calendar, Award, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeedbackSection from '@/components/ui/feedback-section';
import { BaseCrudService } from '@/integrations';
import { Hospitals } from '@/entities/hospitals';
import { Doctors } from '@/entities/doctors';

export default function HospitalDetailPage() {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const [hospital, setHospital] = useState<Hospitals | null>(null);
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalData = async () => {
      if (!hospitalId) return;
      
      try {
        // Fetch hospital details
        const hospitalData = await BaseCrudService.getById<Hospitals>('hospitals', hospitalId);
        setHospital(hospitalData);

        // Fetch doctors affiliated with this hospital
        const { items: allDoctors } = await BaseCrudService.getAll<Doctors>('doctors');
        const hospitalDoctors = allDoctors.filter(doctor => 
          doctor.hospitalAffiliation === hospitalData?.hospitalName
        );
        setDoctors(hospitalDoctors);
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [hospitalId]);

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

  if (!hospital) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[120rem] mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Hospital Not Found</h1>
          <p className="font-paragraph text-lg text-foreground/70 mb-8">The hospital you're looking for doesn't exist.</p>
          <Link to="/hospitals">
            <Button>Back to Hospitals</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/hospitals" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-paragraph text-sm">Back to Hospitals</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div>
                  <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
                    {hospital.hospitalName}
                  </h1>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-paragraph text-sm font-medium text-foreground ml-2">4.8 (245 reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 mb-6">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="font-paragraph text-lg text-foreground/70">
                      {hospital.address}
                    </p>
                  </div>
                </div>
                
                <p className="font-paragraph text-lg text-foreground/70 leading-relaxed">
                  {hospital.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-heading text-2xl font-bold text-foreground">{doctors.length}+</p>
                    <p className="font-paragraph text-sm text-foreground/60">Expert Doctors</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-xl">
                    <Award className="w-8 h-8 text-earthy-brown mx-auto mb-2" />
                    <p className="font-heading text-2xl font-bold text-foreground">15+</p>
                    <p className="font-paragraph text-sm text-foreground/60">Years Experience</p>
                  </div>
                  <div className="text-center p-4 bg-light-gold/20 rounded-xl">
                    <Calendar className="w-8 h-8 text-earthy-brown mx-auto mb-2" />
                    <p className="font-heading text-2xl font-bold text-foreground">500+</p>
                    <p className="font-paragraph text-sm text-foreground/60">Monthly Treatments</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/appointment">
                    <Button size="lg" className="font-paragraph text-base px-8 py-4">
                      <Calendar className="mr-2 w-5 h-5" />
                      Book Appointment
                    </Button>
                  </Link>
                  {hospital.websiteUrl && (
                    <a href={hospital.websiteUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="lg" className="font-paragraph text-base px-8 py-4">
                        <Globe className="mr-2 w-5 h-5" />
                        Visit Website
                      </Button>
                    </a>
                  )}
                </div>
              </div>

              <div className="relative">
                <Image
                  src={hospital.hospitalImage || 'https://static.wixstatic.com/media/3b6749_eed87cb1fe4e4801a2875109f0d6337c~mv2.png?originWidth=576&originHeight=448'}
                  alt={hospital.hospitalName || 'Hospital'}
                  width={600}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {hospital.phoneNumber && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Phone</h3>
                  <p className="font-paragraph text-foreground/70">{hospital.phoneNumber}</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            )}

            {hospital.email && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-earthy-brown" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Email</h3>
                  <p className="font-paragraph text-foreground/70">{hospital.email}</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-light-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-earthy-brown" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Hours</h3>
                <div className="space-y-1">
                  <p className="font-paragraph text-sm text-foreground/70">Mon - Sat: 8:00 AM - 8:00 PM</p>
                  <p className="font-paragraph text-sm text-foreground/70">Sunday: 9:00 AM - 6:00 PM</p>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  View Schedule
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-foreground">
              Our Expert Doctors
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
              Meet our team of experienced Ayurvedic practitioners dedicated to your wellness journey.
            </p>
          </motion.div>

          {doctors.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-foreground/40" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Doctor information coming soon
              </h3>
              <p className="font-paragraph text-foreground/60">
                We're updating our doctor profiles. Please contact the hospital directly for doctor information.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-6">
                        <Image
                          src={doctor.profilePicture || 'https://static.wixstatic.com/media/3b6749_53a7b5ff52f84b16a8364e17be8af7f3~mv2.png?originWidth=192&originHeight=192'}
                          alt={doctor.fullName || 'Doctor'}
                          width={120}
                          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20"
                        />
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                          <div className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                            {doctor.yearsOfExperience || 0}+ years
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        {doctor.fullName}
                      </h3>
                      
                      <p className="font-paragraph text-sm text-primary font-medium mb-3">
                        {doctor.specialization}
                      </p>
                      
                      <p className="font-paragraph text-sm text-foreground/70 leading-relaxed mb-4">
                        {doctor.bio}
                      </p>

                      {doctor.contactEmail && (
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <Mail className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-sm text-foreground/70">{doctor.contactEmail}</span>
                        </div>
                      )}

                      <Button size="sm" className="font-paragraph">
                        Book with Dr. {doctor.fullName?.split(' ')[0]}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-[120rem] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="font-heading text-4xl font-bold text-white">
              Ready to Begin Your Wellness Journey?
            </h2>
            <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto">
              Book your consultation at {hospital.hospitalName} and start your path to holistic healing 
              with our experienced Ayurvedic practitioners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointment">
                <Button variant="secondary" size="lg" className="font-paragraph text-base px-8 py-4">
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/treatments">
                <Button variant="outline" size="lg" className="font-paragraph text-base px-8 py-4 bg-white text-primary hover:bg-white/90">
                  Explore Treatments
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feedback Section */}
      <FeedbackSection />

      <Footer />
    </div>
  );
}