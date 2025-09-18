import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MessageSquare, Heart, CheckCircle, User } from 'lucide-react';

interface FeedbackData {
  name: string;
  email: string;
  rating: number;
  category: string;
  message: string;
}

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    rating: 5,
    message: 'The Panchakarma treatment at AyurSutra completely transformed my health. The doctors are incredibly knowledgeable and the facilities are world-class.',
    treatment: 'Panchakarma Detox',
    avatar: 'https://static.wixstatic.com/media/3b6749_a1b2c3d4e5f6789012345678901234567890abcd~mv2.png?originWidth=96&originHeight=96'
  },
  {
    id: 2,
    name: 'Priya Singh',
    location: 'Delhi',
    rating: 5,
    message: 'Amazing experience with Basti therapy. The staff was professional and caring throughout my treatment journey. Highly recommended!',
    treatment: 'Basti Therapy',
    avatar: 'https://static.wixstatic.com/media/3b6749_b2c3d4e5f6789012345678901234567890abcde~mv2.png?originWidth=96&originHeight=96'
  },
  {
    id: 3,
    name: 'Amit Patel',
    location: 'Bangalore',
    rating: 5,
    message: 'The Vaman therapy helped me overcome chronic digestive issues. The holistic approach and personalized care made all the difference.',
    treatment: 'Vaman Therapy',
    avatar: 'https://static.wixstatic.com/media/3b6749_c3d4e5f6789012345678901234567890abcdef~mv2.png?originWidth=96&originHeight=96'
  }
];

export default function FeedbackSection() {
  const [feedback, setFeedback] = useState<FeedbackData>({
    name: '',
    email: '',
    rating: 0,
    category: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleInputChange = (field: keyof FeedbackData, value: string | number) => {
    setFeedback(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.name || !feedback.email || !feedback.rating || !feedback.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Simulate feedback submission
    console.log('Feedback submitted:', feedback);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFeedback({
        name: '',
        email: '',
        rating: 0,
        category: '',
        message: ''
      });
    }, 3000);
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isActive = interactive ? 
        (hoveredRating > 0 ? starValue <= hoveredRating : starValue <= feedback.rating) :
        starValue <= rating;
      
      return (
        <Star
          key={index}
          className={`w-5 h-5 cursor-pointer transition-colors ${
            isActive ? 'text-yellow-500 fill-current' : 'text-gray-300'
          }`}
          onClick={interactive ? () => handleInputChange('rating', starValue) : undefined}
          onMouseEnter={interactive ? () => setHoveredRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
        />
      );
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-[120rem] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="font-heading text-5xl font-bold text-foreground">
            Patient Testimonials & Feedback
          </h2>
          <p className="font-paragraph text-lg text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            Your experience matters to us. Read what our patients say about their healing journey 
            and share your own feedback to help us serve you better.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg h-full">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="font-paragraph text-sm text-foreground/60">
                        {testimonial.location} • {testimonial.treatment}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                    "{testimonial.message}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              {!isSubmitted ? (
                <>
                  <div className="text-center space-y-4 mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <MessageSquare className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-2xl font-semibold text-foreground">
                      Share Your Experience
                    </h3>
                    <p className="font-paragraph text-foreground/70">
                      Help us improve our services by sharing your feedback about your treatment experience.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-paragraph text-sm font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={feedback.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          className="font-paragraph"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-paragraph text-sm font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={feedback.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          className="font-paragraph"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-paragraph text-sm font-medium">
                          Overall Rating *
                        </Label>
                        <div className="flex items-center space-x-1">
                          {renderStars(feedback.rating, true)}
                          <span className="ml-3 font-paragraph text-sm text-foreground/60">
                            {feedback.rating > 0 ? `${feedback.rating}/5` : 'Select rating'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="font-paragraph text-sm font-medium">
                          Feedback Category
                        </Label>
                        <Select value={feedback.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className="font-paragraph">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="treatment">Treatment Experience</SelectItem>
                            <SelectItem value="staff">Staff & Service</SelectItem>
                            <SelectItem value="facilities">Facilities & Amenities</SelectItem>
                            <SelectItem value="booking">Booking Process</SelectItem>
                            <SelectItem value="overall">Overall Experience</SelectItem>
                            <SelectItem value="suggestion">Suggestions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-paragraph text-sm font-medium">
                        Your Feedback *
                      </Label>
                      <Textarea
                        id="message"
                        value={feedback.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please share your detailed feedback about your experience with us..."
                        className="font-paragraph min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="text-center">
                      <Button type="submit" size="lg" className="font-paragraph px-8 py-4">
                        <Heart className="mr-2 w-5 h-5" />
                        Submit Feedback
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center space-y-6 py-8"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h3 className="font-heading text-2xl font-semibold text-foreground">
                    Thank You for Your Feedback!
                  </h3>
                  
                  <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
                    Your feedback is invaluable to us. We appreciate you taking the time to share your experience 
                    and help us improve our services for all patients.
                  </p>

                  <div className="bg-primary/5 p-6 rounded-xl max-w-md mx-auto">
                    <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                      Your Feedback Summary
                    </h4>
                    <div className="space-y-2 text-left">
                      <p className="font-paragraph text-sm">
                        <strong>Rating:</strong> {renderStars(feedback.rating)} ({feedback.rating}/5)
                      </p>
                      <p className="font-paragraph text-sm">
                        <strong>Category:</strong> {feedback.category || 'General'}
                      </p>
                      <p className="font-paragraph text-sm">
                        <strong>Name:</strong> {feedback.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <div className="bg-primary/5 rounded-2xl p-8">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Ready to Start Your Wellness Journey?
            </h3>
            <p className="font-paragraph text-foreground/70 mb-6">
              Join thousands of satisfied patients who have experienced the healing power of authentic Ayurveda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="font-paragraph">
                Book Your Consultation
              </Button>
              <Button variant="outline" size="lg" className="font-paragraph">
                Learn More About Treatments
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}