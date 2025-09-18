import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, Camera } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useMember } from '@/integrations';

export default function ProfilePage() {
  const { member } = useMember();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: member?.contact?.firstName || '',
    lastName: member?.contact?.lastName || '',
    nickname: member?.profile?.nickname || '',
    email: member?.loginEmail || '',
    phone: member?.contact?.phones?.[0] || '',
    title: member?.profile?.title || '',
    bio: '',
    address: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, you would update the member profile here
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const getInitials = () => {
    const firstName = member?.contact?.firstName || '';
    const lastName = member?.contact?.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

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
                My Profile
              </h1>
              <p className="font-paragraph text-lg text-foreground/70">
                Manage your personal information and account settings
              </p>
            </div>

            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-8">
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={member?.profile?.photo?.url} />
                      <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="text-center md:text-left space-y-2">
                    <h2 className="font-heading text-3xl font-bold text-foreground">
                      {member?.contact?.firstName} {member?.contact?.lastName}
                    </h2>
                    {member?.profile?.nickname && (
                      <p className="font-paragraph text-lg text-primary">
                        @{member.profile.nickname}
                      </p>
                    )}
                    <p className="font-paragraph text-foreground/70">
                      Member since {member?._createdDate ? new Date(member._createdDate).getFullYear() : 'Recently'}
                    </p>
                    {member?.profile?.title && (
                      <p className="font-paragraph text-sm text-foreground/60">
                        {member.profile.title}
                      </p>
                    )}
                  </div>
                  
                  <div className="ml-auto">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} className="font-paragraph">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)} className="font-paragraph">
                          Cancel
                        </Button>
                        <Button onClick={handleSave} className="font-paragraph">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Information */}
                <div className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="font-paragraph text-sm font-medium">
                          First Name
                        </Label>
                        {isEditing ? (
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="font-paragraph"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                            <User className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-foreground">
                              {member?.contact?.firstName || 'Not provided'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="font-paragraph text-sm font-medium">
                          Last Name
                        </Label>
                        {isEditing ? (
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="font-paragraph"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                            <User className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-foreground">
                              {member?.contact?.lastName || 'Not provided'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nickname" className="font-paragraph text-sm font-medium">
                          Nickname
                        </Label>
                        {isEditing ? (
                          <Input
                            id="nickname"
                            value={formData.nickname}
                            onChange={(e) => handleInputChange('nickname', e.target.value)}
                            className="font-paragraph"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                            <User className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-foreground">
                              {member?.profile?.nickname || 'Not provided'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="title" className="font-paragraph text-sm font-medium">
                          Title
                        </Label>
                        {isEditing ? (
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="e.g., Wellness Enthusiast"
                            className="font-paragraph"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                            <User className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-foreground">
                              {member?.profile?.title || 'Not provided'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-paragraph text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                          <Mail className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-foreground">
                            {member?.loginEmail || 'Not provided'}
                          </span>
                          {member?.loginEmailVerified && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-paragraph text-sm font-medium">
                          Phone Number
                        </Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="font-paragraph"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                            <Phone className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-foreground">
                              {member?.contact?.phones?.[0] || 'Not provided'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                      Additional Information
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="font-paragraph text-sm font-medium">
                          Bio
                        </Label>
                        {isEditing ? (
                          <Textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            placeholder="Tell us about yourself..."
                            className="font-paragraph min-h-[100px]"
                          />
                        ) : (
                          <div className="p-3 bg-background rounded-lg">
                            <span className="font-paragraph text-foreground">
                              {formData.bio || 'No bio provided'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address" className="font-paragraph text-sm font-medium">
                          Address
                        </Label>
                        {isEditing ? (
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="Your address"
                            className="font-paragraph"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-foreground">
                              {formData.address || 'Not provided'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                      Account Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-paragraph text-sm font-medium">
                          Member Since
                        </Label>
                        <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-foreground">
                            {member?._createdDate 
                              ? new Date(member._createdDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : 'Recently'
                            }
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="font-paragraph text-sm font-medium">
                          Last Login
                        </Label>
                        <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-foreground">
                            {member?.lastLoginDate 
                              ? new Date(member.lastLoginDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : 'Not available'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                      Account Status
                    </h3>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-paragraph text-sm font-medium text-foreground">
                          Account Active
                        </span>
                      </div>
                      <p className="font-paragraph text-sm text-foreground/70 mt-2">
                        Your account is in good standing. You have full access to all AyurSutra services.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}