import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowLeft, Clock, Heart, Leaf, Calendar, CheckCircle, Star, Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeedbackSection from '@/components/ui/feedback-section';
import { BaseCrudService } from '@/integrations';
import { Treatments } from '@/entities/treatments';

export default function TreatmentDetailPage() {
  const { treatmentId } = useParams<{ treatmentId: string }>();
  const [treatment, setTreatment] = useState<Treatments | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatment = async () => {
      if (!treatmentId) return;
      
      try {
        // First try to find by slug
        const { items } = await BaseCrudService.getAll<Treatments>('treatments');
        let foundTreatment = items.find(t => t.slug === treatmentId);
        
        // If not found by slug, try by ID
        if (!foundTreatment) {
          foundTreatment = items.find(t => t._id === treatmentId);
        }
        
        setTreatment(foundTreatment || null);
      } catch (error) {
        console.error('Error fetching treatment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatment();
  }, [treatmentId]);

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

  if (!treatment) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[120rem] mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Treatment Not Found</h1>
          <p className="font-paragraph text-lg text-foreground/70 mb-8">The treatment you're looking for doesn't exist.</p>
          <Link to="/treatments">
            <Button>Back to Treatments</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const benefits = [
    'Deep detoxification and cleansing',
    'Improved digestion and metabolism',
    'Enhanced mental clarity and focus',
    'Stress reduction and relaxation',
    'Boosted immune system',
    'Better sleep quality',
    'Increased energy levels',
    'Balanced doshas (body constitution)'
  ];

  const process = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Comprehensive assessment of your health condition and constitution'
    },
    {
      step: 2,
      title: 'Preparation Phase',
      description: 'Pre-treatment preparation to ready your body for the therapy'
    },
    {
      step: 3,
      title: 'Main Treatment',
      description: 'The core Panchakarma procedure tailored to your specific needs'
    },
    {
      step: 4,
      title: 'Recovery & Follow-up',
      description: 'Post-treatment care and lifestyle recommendations for lasting benefits'
    }
  ];

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
            <Link to="/treatments" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-paragraph text-sm">Back to Treatments</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div>
                  <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
                    {treatment.treatmentName}
                  </h1>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-paragraph text-sm font-medium text-foreground ml-2">4.9 (156 reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-paragraph text-sm text-foreground/70">60-90 minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-paragraph text-sm text-foreground/70">500+ treatments completed</span>
                    </div>
                  </div>
                </div>
                
                <p className="font-paragraph text-lg text-foreground/70 leading-relaxed">
                  {treatment.cardDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-heading text-lg font-bold text-foreground">Natural</p>
                    <p className="font-paragraph text-sm text-foreground/60">100% Herbal</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-xl">
                    <Leaf className="w-8 h-8 text-earthy-brown mx-auto mb-2" />
                    <p className="font-heading text-lg font-bold text-foreground">Safe</p>
                    <p className="font-paragraph text-sm text-foreground/60">No Side Effects</p>
                  </div>
                  <div className="text-center p-4 bg-light-gold/20 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-earthy-brown mx-auto mb-2" />
                    <p className="font-heading text-lg font-bold text-foreground">Proven</p>
                    <p className="font-paragraph text-sm text-foreground/60">Ancient Wisdom</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/appointment">
                    <Button size="lg" className="font-paragraph text-base px-8 py-4">
                      <Calendar className="mr-2 w-5 h-5" />
                      Book This Treatment
                    </Button>
                  </Link>
                  <Link to="/hospitals">
                    <Button variant="outline" size="lg" className="font-paragraph text-base px-8 py-4">
                      Find Treatment Centers
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={treatment.cardImage || 'https://static.wixstatic.com/media/3b6749_9349f05cf3624788a6c0f72a0bfeec6c~mv2.png?originWidth=384&originHeight=192'}
                  alt={treatment.treatmentName || 'Treatment'}
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

      {/* Detailed Description */}
      <section className="py-20 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                About This Treatment
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-6">
                  {treatment.detailedExplanation || treatment.cardDescription}
                </p>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  This ancient Ayurvedic therapy has been practiced for thousands of years and represents 
                  one of the most effective methods for achieving deep purification and rejuvenation. 
                  Our experienced practitioners follow traditional protocols while ensuring your comfort 
                  and safety throughout the entire process.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                Key Benefits
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-paragraph text-foreground/70">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-20 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-foreground">
              Treatment Process
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
              Our systematic approach ensures you receive the maximum benefits from your treatment 
              while maintaining the highest standards of care and safety.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-heading text-lg font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              Ready to Experience {treatment.treatmentName}?
            </h2>
            <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto">
              Take the first step towards optimal health and wellness. Our experienced practitioners 
              are ready to guide you through this transformative healing journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointment">
                <Button variant="secondary" size="lg" className="font-paragraph text-base px-8 py-4">
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Consultation
                </Button>
              </Link>
              <Link to="/treatments">
                <Button variant="outline" size="lg" className="font-paragraph text-base px-8 py-4 bg-white text-primary hover:bg-white/90">
                  Explore Other Treatments
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