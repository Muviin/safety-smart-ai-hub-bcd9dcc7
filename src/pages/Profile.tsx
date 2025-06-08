
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Bell, Shield, Key } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: 'SafeCorp Industries',
    role: 'Safety Manager'
  });
  const [notifications, setNotifications] = useState({
    riskAlerts: true,
    weeklyReports: true,
    systemUpdates: false,
    safetyTips: true
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    });
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Profile & Settings</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-primary" />
                <CardTitle>Profile Information</CardTitle>
              </div>
              <CardDescription>
                Update your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile} className="bg-safety-orange hover:bg-safety-orange/90">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="h-6 w-6 text-primary" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>
                Choose what notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Risk Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Immediate notifications for high-risk situations
                    </p>
                  </div>
                  <Switch
                    checked={notifications.riskAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, riskAlerts: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Summary of safety activities and metrics
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, weeklyReports: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      New features and system maintenance notices
                    </p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, systemUpdates: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Safety Tips</Label>
                    <p className="text-sm text-muted-foreground">
                      Daily safety tips and best practices
                    </p>
                  </div>
                  <Switch
                    checked={notifications.safetyTips}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, safetyTips: checked })
                    }
                  />
                </div>
              </div>
              <Button onClick={handleSaveNotifications} className="bg-safety-orange hover:bg-safety-orange/90">
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Key className="h-6 w-6 text-primary" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>
                Update your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <Button 
                onClick={handleChangePassword} 
                className="bg-safety-orange hover:bg-safety-orange/90"
                disabled={!passwords.current || !passwords.new || !passwords.confirm}
              >
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Account Activity</CardTitle>
              </div>
              <CardDescription>
                Your safety platform usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <p className="text-sm text-muted-foreground">Safety Queries</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-safety-orange">23</div>
                  <p className="text-sm text-muted-foreground">Risk Assessments</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-risk-low">12</div>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">89%</div>
                  <p className="text-sm text-muted-foreground">Safety Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
