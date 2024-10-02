import React, { useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, 
  Modal, FlatList, Dimensions, Animated, StatusBar
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CompanyProfile = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const services = [
    { id: '1', title: 'AI Solutions', description: 'Cutting-edge artificial intelligence for your business', icon: '🤖' },
    { id: '2', title: 'Cloud Services', description: 'Scalable and secure cloud infrastructure', icon: '☁️' },
    { id: '3', title: 'Cybersecurity', description: 'Advanced protection for your digital assets', icon: '🔒' },
  ];

  const teamMembers = [
    { id: '1', name: 'Sarah Johnson', role: 'CEO', image: require('./assets/ceo.jpg') },
    { id: '2', name: 'Jackson Wang', role: 'CTO', image: require('./assets/cto.jpg') },
    { id: '3', name: 'Jeanette Manoban', role: 'CFO', image: require('./assets/cfo.jpg') },
  ];

  const renderServiceCard = ({ item, index }) => (
    <Animated.View style={[
      styles.card,
      {
        opacity: scrollY.interpolate({
          inputRange: [(index - 1) * 200, index * 200, (index + 1) * 200],
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        }),
        transform: [{
          scale: scrollY.interpolate({
            inputRange: [(index - 1) * 200, index * 200, (index + 1) * 200],
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          }),
        }],
      },
    ]}>
      <Text style={styles.cardIcon}>{item.icon}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </Animated.View>
  );

  const renderTeamMemberCard = ({ item }) => (
    <View style={styles.teamCard}>
      <Image source={item.image} style={styles.teamMemberImage} />
      <View style={styles.teamMemberInfo}>
        <Text style={styles.teamMemberName}>{item.name}</Text>
        <Text style={styles.teamMemberRole}>{item.role}</Text>
      </View>
    </View>
  );

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle}>TechInnovate</Text>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={require('./assets/hero-banner.jpg')}
            style={styles.heroBannerImage}
          />
          <View style={styles.heroBannerOverlay}>
            <Animated.Text style={[styles.heroBannerTitle, {
              transform: [{
                translateY: scrollY.interpolate({
                  inputRange: [-height, 0, height],
                  outputRange: [height / 2, 0, -height / 2],
                  extrapolate: 'clamp',
                }),
              }],
            }]}>
              Innovate. Transform. Succeed.
            </Animated.Text>
            <Animated.Text style={[styles.heroBannerSubtitle, {
              transform: [{
                translateY: scrollY.interpolate({
                  inputRange: [-height, 0, height],
                  outputRange: [height / 2, 0, -height / 2],
                  extrapolate: 'clamp',
                }),
              }],
            }]}>
              Empowering businesses with cutting-edge technology
            </Animated.Text>
          </View>
        </View>

        {/* Our Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <FlatList
            data={services}
            renderItem={renderServiceCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesList}
          />
        </View>

        {/* About Us */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.aboutUsText}>
            At TechInnovate, we're passionate about driving innovation and excellence in the tech industry. 
            Our mission is to empower businesses with transformative digital solutions. 
            With years of experience and a dedicated team of experts, we deliver cutting-edge 
            technologies that propel our clients to the forefront of their industries.
          </Text>
        </View>

        {/* Meet Our Team */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meet Our Team</Text>
          <FlatList
            data={teamMembers}
            renderItem={renderTeamMemberCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.teamList}
          />
        </View>

        {/* Contact Us */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Ready to Transform Your Business?</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Us Now</Text>
          </TouchableOpacity>
        </View>

        {/* Footer with Font Awesome */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>TechInnovate</Text>
              <Text style={styles.footerText}>Empowering businesses with cutting-edge technology</Text>
            </View>
            <View style={styles.footerSection}>
              <Text style={styles.footerSubtitle}>Contact Us</Text>
              <Text style={styles.footerText}>
                <FontAwesome name="phone" size={14} color="#BDC3C7" /> +1 (555) 123-4567
              </Text>
              <Text style={styles.footerText}>
                <FontAwesome name="envelope" size={14} color="#BDC3C7" /> info@techinnovate.com
              </Text>
              <Text style={styles.footerText}>
                <FontAwesome name="map-marker" size={14} color="#BDC3C7" /> 123 Tech Street, Innovation City
              </Text>
            </View>
          </View>
          <View style={styles.socialIcons}>
            {[
              { icon: 'facebook', name: 'Facebook' },
              { icon: 'twitter', name: 'Twitter' },
              { icon: 'linkedin', name: 'LinkedIn' },
              { icon: 'instagram', name: 'Instagram' }
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.socialIconButton}>
                <FontAwesome name={item.icon} size={20} color="#ECF0F1" />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.copyrightText}>© 2024 TechInnovate. All rights reserved.</Text>
        </View>
      </ScrollView>

      {/* Menu Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Text style={styles.menuButtonText}>≡</Text>
      </TouchableOpacity>

      {/* Hamburger Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.menuModal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setMenuVisible(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.menuItems}>
            {['Home', 'Services', 'About Us', 'Team', 'Contact'].map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItemButton}>
                <Text style={styles.menuItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(67, 56, 120, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1001,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  menuModal: {
    flex: 1,
    backgroundColor: 'rgba(67, 56, 120, 0.95)',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  menuItems: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemButton: {
    padding: 15,
  },
  menuItem: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },
  heroBanner: {
    height: height * 0.6,
    position: 'relative',
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
  },
  heroBannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  heroBannerTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  heroBannerSubtitle: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  servicesList: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    width: width * 0.7,
    backgroundColor: '#433878',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  cardDescription: {
    fontSize: 16,
    color: '#fff',
  },
  aboutSection: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  aboutUsText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
  },
  teamList: {
    paddingBottom: 20,
  },
  teamCard: {
    marginRight: 20,
    width: 180,
    height: 240,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  teamMemberImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  teamMemberInfo: {
    padding: 10,
    alignItems: 'center',
  },
  teamMemberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  teamMemberRole: {
    fontSize: 14,
    color: '#666',
  },
  contactSection: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#433878',
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  contactButtonText: {
    color: '#433878',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#1E201E',
    padding: 20,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  footerSection: {
    flex: 1,
  },
  footerTitle: {
    color: '#ECF0F1',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerSubtitle: {
    color: '#ECF0F1',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerText: {
    color: '#BDC3C7',
    fontSize: 14,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  socialIconButton: {
    backgroundColor: '#433878',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  copyrightText: {
    color: '#7F8C8D',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CompanyProfile;