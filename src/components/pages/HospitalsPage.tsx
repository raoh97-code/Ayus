import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { MapPin, Phone, Mail, Globe, Search, Star, Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeedbackSection from '@/components/ui/feedback-section';
import { BaseCrudService } from '@/integrations';
import { Hospitals } from '@/entities/hospitals';

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospitals[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Hospitals>('hospitals');
        setHospitals(items);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-12"
          >
            <h1 className="font-heading text-6xl font-bold text-foreground">
              Ayurvedic Treatment Centers
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
              Discover certified Ayurvedic hospitals and wellness centers offering authentic Panchakarma treatments. 
              Find the perfect facility for your healing journey with experienced practitioners and modern amenities.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search hospitals by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-base font-paragraph border-2 border-secondary/20 focus:border-primary rounded-xl"
              />
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <p className="font-paragraph text-sm text-foreground/60 text-center">
              {filteredHospitals.length} treatment center{filteredHospitals.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          {/* Hospitals Grid */}
          {filteredHospitals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-12 h-12 text-foreground/40" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                No hospitals found
              </h3>
              <p className="font-paragraph text-foreground/60 mb-8">
                Try adjusting your search terms or browse all available treatment centers.
              </p>
              <Button onClick={() => setSearchTerm('')} variant="outline">
                Clear Search
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHospitals.map((hospital, index) => (
                <motion.div
                  key={hospital._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/hospitals/${hospital._id}`}>
                    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden h-full">
                      <div className="relative overflow-hidden">
                        <Image
                          src={hospital.hospitalImage || 'https://static.wixstatic.com/media/3b6749_b35c3b21aff04ddb898095532046f454~mv2.png?originWidth=384&originHeight=192'}
                          alt={hospital.hospitalName || 'Hospital'}
                          width={400}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-paragraph text-sm font-medium text-foreground">4.8</span>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {hospital.hospitalName}
                          </h3>
                          
                          <div className="flex items-start space-x-2 mb-3">
                            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                              {hospital.address}
                            </p>
                          </div>

                          <p className="font-paragraph text-sm text-foreground/70 leading-relaxed mb-4">
                            {hospital.description}
                          </p>
                        </div>

                        <div className="space-y-3 border-t border-secondary/20 pt-4">
                          {hospital.phoneNumber && (
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-primary" />
                              <span className="font-paragraph text-sm text-foreground/70">{hospital.phoneNumber}</span>
                            </div>
                          )}
                          
                          {hospital.email && (
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-primary" />
                              <span className="font-paragraph text-sm text-foreground/70">{hospital.email}</span>
                            </div>
                          )}

                          {hospital.websiteUrl && (
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4 text-primary" />
                              <span className="font-paragraph text-sm text-primary hover:text-primary/80 transition-colors">
                                Visit Website
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-secondary/20">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4 text-primary" />
                              <span className="font-paragraph text-xs text-foreground/60">15+ Doctors</span>
                            </div>
                          </div>
                          <span className="font-paragraph text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                            View Details →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
              Ready to Start Your Treatment?
            </h2>
            <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto">
              Choose from our network of certified Ayurvedic treatment centers and begin your journey 
              to wellness with experienced practitioners and authentic Panchakarma therapies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointment">
                <Button variant="secondary" size="lg" className="font-paragraph text-base px-8 py-4">
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