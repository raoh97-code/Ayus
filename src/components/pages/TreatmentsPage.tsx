import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Search, Leaf, Calendar, Clock, Heart, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeedbackSection from '@/components/ui/feedback-section';
import { BaseCrudService } from '@/integrations';
import { Treatments } from '@/entities/treatments';

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatments[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Treatments>('treatments');
        setTreatments(items);
      } catch (error) {
        console.error('Error fetching treatments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  const filteredTreatments = treatments.filter(treatment =>
    treatment.treatmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    treatment.cardDescription?.toLowerCase().includes(searchTerm.toLowerCase())
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
              Panchakarma Treatments
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
              Discover the ancient wisdom of Panchakarma through our comprehensive range of authentic 
              Ayurvedic treatments. Each therapy is designed to detoxify, rejuvenate, and restore your 
              natural balance for optimal health and wellness.
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
                placeholder="Search treatments..."
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
              {filteredTreatments.length} treatment{filteredTreatments.length !== 1 ? 's' : ''} available
            </p>
          </motion.div>

          {/* Treatments Grid */}
          {filteredTreatments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-12 h-12 text-foreground/40" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                No treatments found
              </h3>
              <p className="font-paragraph text-foreground/60 mb-8">
                Try adjusting your search terms or browse all available treatments.
              </p>
              <Button onClick={() => setSearchTerm('')} variant="outline">
                Clear Search
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTreatments.map((treatment, index) => (
                <motion.div
                  key={treatment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/treatments/${treatment.slug || treatment._id}`}>
                    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden h-full">
                      <div className="relative overflow-hidden">
                        <Image
                          src={treatment.cardImage || 'https://static.wixstatic.com/media/3b6749_9349f05cf3624788a6c0f72a0bfeec6c~mv2.png?originWidth=384&originHeight=192'}
                          alt={treatment.treatmentName || 'Treatment'}
                          width={400}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center space-x-2 text-white">
                            <Clock className="w-4 h-4" />
                            <span className="font-paragraph text-sm">60-90 minutes</span>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {treatment.treatmentName}
                          </h3>
                          
                          <p className="font-paragraph text-sm text-foreground/70 leading-relaxed mb-4">
                            {treatment.cardDescription}
                          </p>
                        </div>

                        <div className="space-y-3 border-t border-secondary/20 pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4 text-primary" />
                                <span className="font-paragraph text-xs text-foreground/60">Holistic Healing</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Leaf className="w-4 h-4 text-primary" />
                                <span className="font-paragraph text-xs text-foreground/60">Natural</span>
                              </div>
                            </div>
                            <span className="font-paragraph text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                              Learn More →
                            </span>
                          </div>
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

      {/* Benefits Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="font-heading text-4xl font-bold">
              Benefits of Panchakarma
            </h2>
            <p className="font-paragraph text-lg text-white/90 max-w-3xl mx-auto">
              Experience the transformative power of authentic Ayurvedic treatments designed to 
              cleanse, heal, and rejuvenate your entire being.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                { icon: Heart, title: 'Detoxification', description: 'Deep cleansing of toxins from body and mind' },
                { icon: Leaf, title: 'Natural Healing', description: 'Gentle, chemical-free therapeutic approach' },
                { icon: Calendar, title: 'Stress Relief', description: 'Profound relaxation and mental clarity' },
                { icon: ArrowRight, title: 'Rejuvenation', description: 'Renewed energy and vitality' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="font-paragraph text-sm text-white/80">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="font-heading text-4xl font-bold text-foreground">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
              Choose the perfect Panchakarma treatment for your needs and start your path to 
              optimal health and wellness with our experienced practitioners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointment">
                <Button size="lg" className="font-paragraph text-base px-8 py-4">
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Consultation
                </Button>
              </Link>
              <Link to="/hospitals">
                <Button variant="outline" size="lg" className="font-paragraph text-base px-8 py-4">
                  Find Treatment Centers
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