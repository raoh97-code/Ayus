import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { ArrowRight, Leaf, Heart, Shield, Star, Users, Calendar } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeedbackSection from '@/components/ui/feedback-section';

const treatments = [
  {
    id: 'vaman',
    name: 'Vaman',
    title: 'Therapeutic Vomiting',
    description: 'A cleansing therapy that eliminates toxins from the upper respiratory tract and stomach.',
    image: 'https://static.wixstatic.com/media/3b6749_9349f05cf3624788a6c0f72a0bfeec6c~mv2.png?originWidth=384&originHeight=192',
    benefits: ['Removes excess Kapha', 'Clears respiratory congestion', 'Improves digestion']
  },
  {
    id: 'virechan',
    name: 'Virechan',
    title: 'Purgation Therapy',
    description: 'A purification process that cleanses the small intestine and liver through controlled purgation.',
    image: 'https://static.wixstatic.com/media/3b6749_b95ef52d58a24fda84f0c70d07a66ef8~mv2.png?originWidth=384&originHeight=192',
    benefits: ['Eliminates excess Pitta', 'Detoxifies liver', 'Improves skin health']
  },
  {
    id: 'basti',
    name: 'Basti',
    title: 'Medicated Enema',
    description: 'A therapeutic enema using herbal decoctions and oils to cleanse and nourish the colon.',
    image: 'https://static.wixstatic.com/media/3b6749_8c7f4a2b9d8c4e1f9a5b6c3d7e8f9a0b~mv2.png?originWidth=384&originHeight=192',
    benefits: ['Balances Vata dosha', 'Strengthens digestive system', 'Improves joint health']
  },
  {
    id: 'nasya',
    name: 'Nasya',
    title: 'Nasal Administration',
    description: 'Therapeutic administration of medicated oils through the nasal passages for head and neck disorders.',
    image: 'https://static.wixstatic.com/media/3b6749_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p~mv2.png?originWidth=384&originHeight=192',
    benefits: ['Clears sinuses', 'Improves mental clarity', 'Treats headaches']
  }
];

const features = [
  {
    icon: Leaf,
    title: 'Natural Healing',
    description: 'Authentic Ayurvedic treatments using traditional herbs and natural remedies for holistic wellness.'
  },
  {
    icon: Heart,
    title: 'Personalized Care',
    description: 'Customized treatment plans based on individual constitution and health requirements.'
  },
  {
    icon: Shield,
    title: 'Expert Practitioners',
    description: 'Experienced Ayurvedic doctors and therapists with years of specialized training.'
  },
  {
    icon: Users,
    title: 'Comprehensive Support',
    description: 'Complete healthcare ecosystem with modern facilities and traditional wisdom.'
  }
];

const stats = [
  { number: '5000+', label: 'Patients Treated' },
  { number: '15+', label: 'Years Experience' },
  { number: '25+', label: 'Expert Doctors' },
  { number: '98%', label: 'Success Rate' }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto overflow-hidden">
        <div className="relative min-h-[90vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
          
          <div className="relative z-10 w-full px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h1 className="font-heading text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                    Discover the
                    <span className="text-primary block">Ancient Wisdom</span>
                    of Panchakarma
                  </h1>
                  <p className="font-paragraph text-xl text-foreground/70 leading-relaxed max-w-2xl">
                    Experience authentic Ayurvedic healing through our comprehensive Panchakarma treatments. 
                    Restore balance, eliminate toxins, and rejuvenate your body, mind, and spirit with 
                    time-tested therapies guided by expert practitioners.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/appointment">
                    <Button size="lg" className="font-paragraph text-lg px-8 py-4 w-full sm:w-auto">
                      Book Your Consultation
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/treatments">
                    <Button variant="outline" size="lg" className="font-paragraph text-lg px-8 py-4 w-full sm:w-auto">
                      Explore Treatments
                    </Button>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="font-heading text-3xl font-bold text-primary mb-1">
                        {stat.number}
                      </div>
                      <div className="font-paragraph text-sm text-foreground/70">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://static.wixstatic.com/media/3b6749_cd6ccccf200745628453833b7c13b5ca~mv2.png?originWidth=576&originHeight=576"
                    alt="Ayurvedic healing therapy session"
                    width={600}
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-secondary/20"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-heading text-lg font-bold text-foreground">4.9/5 Rating</div>
                      <div className="font-paragraph text-sm text-foreground/70">From 1000+ patients</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="font-heading text-5xl font-bold text-foreground">
              Why Choose AyurSutra?
            </h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Experience the perfect blend of ancient Ayurvedic wisdom and modern healthcare 
              management for comprehensive wellness solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="font-paragraph text-foreground/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="font-heading text-5xl font-bold text-foreground">
              Our Panchakarma Treatments
            </h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Discover our comprehensive range of authentic Panchakarma therapies designed to 
              detoxify, rejuvenate, and restore your natural balance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/treatments/${treatment.id}`}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
                    <div className="relative overflow-hidden">
                      <Image
                        src={treatment.image}
                        alt={treatment.name}
                        width={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {treatment.name}
                      </h3>
                      <p className="font-paragraph text-sm text-primary font-medium">
                        {treatment.title}
                      </p>
                      <p className="font-paragraph text-foreground/70 text-sm leading-relaxed">
                        {treatment.description}
                      </p>
                      <div className="space-y-2">
                        {treatment.benefits.slice(0, 2).map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span className="font-paragraph text-xs text-foreground/60">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/treatments">
              <Button size="lg" className="font-paragraph text-lg px-8 py-4">
                View All Treatments
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="font-heading text-5xl font-bold">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="font-paragraph text-xl text-white/90 max-w-3xl mx-auto">
              Take the first step towards optimal health and wellness. Our expert practitioners 
              are ready to guide you through a personalized Panchakarma experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointment">
                <Button size="lg" variant="secondary" className="font-paragraph text-lg px-8 py-4 w-full sm:w-auto">
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Consultation
                </Button>
              </Link>
              <Link to="/hospitals">
                <Button size="lg" variant="outline" className="font-paragraph text-lg px-8 py-4 w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                  Find Nearest Center
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