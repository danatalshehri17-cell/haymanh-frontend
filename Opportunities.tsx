import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const OpportunitiesContainer = styled.div`
  padding-top: 80px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.secondary} 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.9;
  color: ${({ theme }) => theme.colors.textHighlight};
  font-weight: 600;
`;

const FilterSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.background};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  background: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, isActive }) => 
    isActive ? 'white' : theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 200px;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const AdvancedFiltersButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 auto;
  display: block;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const AdvancedFiltersContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  margin: ${({ theme }) => theme.spacing.lg} auto;
  max-width: 800px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const AdvancedFiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FilterGroupLabel = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: white;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const OpportunitiesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const OpportunitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const OpportunityCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const OpportunityImage = styled.div<{ type: string }>`
  height: 200px;
  background: ${({ theme, type }) => {
    switch (type) {
      case 'scholarship': return theme.colors.primary;
      case 'competition': return theme.colors.secondary;
      case 'volunteer': return theme.colors.accent;
      case 'internship': return '#FF6B6B';
      case 'conference': return '#4ECDC4';
      case 'initiative': return '#45B7D1';
      case 'research': return '#9B59B6';
      case 'startup': return '#E67E22';
      case 'job_fair': return '#E74C3C';
      case 'camp': return '#FF8C00';
      case 'hackathon': return '#9C27B0';
      case 'incubator': return '#2ECC71';
      default: return theme.colors.primary;
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.display};
`;

const OpportunityContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const OpportunityType = styled.span<{ type: string }>`
  background: ${({ theme, type }) => {
    switch (type) {
      case 'scholarship': return theme.colors.primary;
      case 'competition': return theme.colors.secondary;
      case 'volunteer': return theme.colors.accent;
      case 'internship': return '#FF6B6B';
      case 'conference': return '#4ECDC4';
      case 'initiative': return '#45B7D1';
      case 'research': return '#9B59B6';
      case 'startup': return '#E67E22';
      case 'camp': return '#FF8C00';
      case 'hackathon': return '#9C27B0';
      case 'incubator': return '#2ECC71';
      case 'job_fair': return '#E74C3C';
      default: return theme.colors.primary;
    }
  }};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const OpportunityTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const OpportunityDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const OpportunityButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const AddToSelectedButton = styled.button<{ isSelected: boolean }>`
  background: ${({ theme, isSelected }) => 
    isSelected ? '#10B981' : '#F59E0B'};
  color: white;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:hover {
    background: ${({ theme, isSelected }) => 
      isSelected ? '#059669' : '#D97706'};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const OpportunityDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const StatItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const DetailIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const DetailText = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const MessageContainer = styled(motion.div)<{ type: 'success' | 'error' }>`
  position: fixed;
  top: 100px;
  right: 20px;
  background: ${({ type }) => type === 'success' ? '#10B981' : '#EF4444'};
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: 1000;
  font-weight: 600;
  max-width: 300px;
`;

const Opportunities: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [ageGroup, setAgeGroup] = useState('all');
  const [attendanceType, setAttendanceType] = useState('all');
  const [costType, setCostType] = useState('all');
  const [durationType, setDurationType] = useState('all');
  const [locationType, setLocationType] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedOpportunities, setSelectedOpportunities] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [apiOpportunities, setApiOpportunities] = useState<any[]>([]);

  // جلب الفرص من API
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/opportunities');
        if (response.ok) {
          const data = await response.json();
          setApiOpportunities(data.data.opportunities || []);
        }
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };
    
    fetchOpportunities();
  }, []);

  // جلب الفرص المختارة من الداشبورد
  useEffect(() => {
    const fetchSelectedOpportunities = async () => {
      if (!isAuthenticated) return;
      
      try {
        const token = localStorage.getItem('haymanh_token');
        const response = await fetch('http://localhost:8000/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const selected = new Set<string>();
          
              if (data.userProgress?.selectedOpportunities) {
                data.userProgress.selectedOpportunities.forEach((opp: any) => {
                  const oppId = opp.opportunityId?._id;
                  if (oppId) {
                    // استخدام ObjectId مباشرة
                    if (oppId && typeof oppId === 'string' && oppId.length === 24) {
                      selected.add(oppId);
                    }
                  }
                });
              }
          
          setSelectedOpportunities(selected);
        }
      } catch (error) {
        console.error('Error fetching selected opportunities:', error);
      }
    };

    fetchSelectedOpportunities();
  }, [isAuthenticated]);

  const filters = [
    { id: 'all', label: 'جميع الفرص' },
    { id: 'scholarship', label: 'المنح الدراسية' },
    { id: 'competition', label: 'المسابقات والهاكاثونات' },
    { id: 'volunteer', label: 'الفرص التطوعية' },
    { id: 'internship', label: 'الوظائف التدريبية' },
    { id: 'conference', label: 'المؤتمرات والورش' },
    { id: 'initiative', label: 'المبادرات' },
    { id: 'research', label: 'فرص البحث' },
    { id: 'startup', label: 'دعم المشاريع والحاضنات' },
    { id: 'camp', label: 'المعسكرات' },
    { id: 'job_fair', label: 'معارض التوظيف' }
  ];

  const ageGroups = [
    { id: 'all', label: 'جميع الأعمار' },
    { id: 'students', label: 'طلاب' },
    { id: 'graduates', label: 'خريجين' },
    { id: 'professionals', label: 'محترفين' },
    { id: 'youth', label: 'شباب' }
  ];

  const attendanceTypes = [
    { id: 'all', label: 'جميع الأنواع' },
    { id: 'in-person', label: 'حضوري' },
    { id: 'online', label: 'عن بعد' },
    { id: 'hybrid', label: 'مختلط' }
  ];

  const costTypes = [
    { id: 'all', label: 'جميع التكاليف' },
    { id: 'free', label: 'مجاني' },
    { id: 'paid', label: 'مدفوع' },
    { id: 'scholarship', label: 'منحة' }
  ];

  const durationTypes = [
    { id: 'all', label: 'جميع المدد' },
    { id: 'short', label: 'قصيرة (أيام)' },
    { id: 'medium', label: 'متوسطة (أسابيع)' },
    { id: 'long', label: 'طويلة (أشهر)' },
    { id: 'ongoing', label: 'مستمر' }
  ];

  const locationTypes = [
    { id: 'all', label: 'جميع المواقع' },
    { id: 'riyadh', label: 'الرياض' },
    { id: 'jeddah', label: 'جدة' },
    { id: 'dammam', label: 'الدمام' },
    { id: 'online', label: 'أونلاين' },
    { id: 'nationwide', label: 'جميع أنحاء المملكة' }
  ];

  const opportunities = [
    {
      id: 1,
      type: 'camp',
      title: 'معسكر بيدر 2025',
      description: 'في ظل وجود عدد كبير من المشاريع الناشئة والأفكار الريادية الواعدة، يوفر بيدر فرص كبيرة لتسخير وتركيز جهدك في المكان الصحيح، وكما أن البيدر هو مجمع المحاصيل والثمار، فإننا نوفر بالمعسكر الدعم والتوجيه الذي يمكّن أفكارك من الوصول إلى آفاق لا حدود لها.',
      icon: '💎',
      image: '/images/bedar-camp-2025.jpeg',
      duration: '5 أيام',
      location: 'الرياض',
      price: 'مجاناً',
      startDate: '28 سبتمبر 2025',
      endDate: '2 أكتوبر 2025',
      seats: 'غير محدود',
      ageGroup: 'professionals',
      attendanceType: 'in-person',
      costType: 'free',
      durationType: 'short',
      locationType: 'specific',
      registrationLink: 'https://healthes.sa/%D9%85%D8%B9%D8%B3%D9%83%D8%B1-%D8%A8%D9%8A%D8%AF%D8%B1/',
      teamFormationLink: 'https://chat.whatsapp.com/InPWOkSb2sB0PH3MqBTtMC?mode=ems_share_c',
      applicationDeadline: '18 سبتمبر 2025',
      tracks: ['التكنولوجيا الحيوية', 'الرعاية الصحية', 'الصحة الرقمية', 'المسار العام'],
      targetAudience: 'رواد الأعمال، الشركات الناشئة، المتخصصون والمبتكرون'
    },
    {
      id: 2,
      type: 'hackathon',
      title: 'هاكاثون الطاقة (طاقتثون) 2025',
      description: 'هاكاثون متخصص في الطاقة المستدامة يجمع رواد الأعمال والباحثين لتطوير حلول ابتكارية في مجالات الطاقة المتجددة والتقنيات الخضراء.',
      icon: '⚡',
      image: '/images/energy-hackathon-2025.jpeg',
      duration: '3 أيام',
      location: 'الرياض',
      price: 'مجاناً',
      startDate: '15 مارس 2025',
      endDate: '17 مارس 2025',
      seats: 'غير محدود',
      ageGroup: 'professionals',
      attendanceType: 'in-person',
      costType: 'free',
      durationType: 'short',
      locationType: 'specific',
      registrationLink: 'https://taqa.org.sa/energy-hackathon',
      teamFormationLink: 'https://chat.whatsapp.com/FzGPht9ZB1aJoigmpFWq06?mode=ems_copy_c',
      targetAudience: 'الباحثين السعوديين، رواد الأعمال',
      organization: 'جمعية الطاقة للتنمية المستدامة',
      focusAreas: ['الطاقة المتجددة', 'التقنيات الخضراء'],
      benefits: ['ورش عمل', 'شبكة علاقات'],
      prizes: 'جوائز مالية'
    },
    {
      id: 3,
      type: 'competition',
      title: 'جائزة مايدة محي الدين ناظر للابتكار 3',
      description: 'تحدي يجمع طالبات الجامعات لاستكشاف وتوظيف الابتكارات الجامعية.',
      icon: '🏆',
      image: '/images/maida-award-2025.jpeg',
      duration: 'مستمر',
      location: 'جامعة دار الحكمة - جدة',
      price: 'مجاناً',
      startDate: 'مفتوح',
      seats: 'غير محدود',
      ageGroup: 'students',
      attendanceType: 'in-person',
      costType: 'free',
      durationType: 'ongoing',
      locationType: 'specific',
      registrationLink: 'https://dar-alhekma.dyam.dev/',
      teamFormationLink: 'https://chat.whatsapp.com/IJFuagaaRdq1SKvXgMd4of?mode=ems_copy_c',
      applicationDeadline: '25 سبتمبر 2025',
      targetAudience: 'طالبات الجامعات',
      organization: 'جامعة دار الحكمة',
      prizes: '90,000 - 70,000 - 40,000 ريال',
      focusAreas: ['تحسين جودة الحياة لكبار السن', 'إحياء اللغة العربية رقمياً', 'تطوير السياحة الدينية']
    },
    {
      id: 4,
      type: 'internship',
      title: 'برنامج ريادة الأعمال لتطوير الألعاب - اليابان',
      description: 'برنامج تدريبي مكثف لمطوري الألعاب السعوديين في اليابان، يشمل التدريب التقني وريادة الأعمال.',
      icon: '🎮',
      image: '/images/game-development-japan.jpeg',
      duration: '3 أسابيع',
      location: 'اليابان',
      price: 'مجاناً',
      startDate: 'مفتوح',
      seats: 'غير محدود',
      ageGroup: 'graduates',
      attendanceType: 'in-person',
      costType: 'free',
      durationType: 'short',
      locationType: 'specific',
      registrationLink: 'http://sda.edu.sa/ar/program/398',
      targetAudience: 'مطوري الألعاب السعوديين',
      organization: 'الأكاديمية السعودية الرقمية SDA',
      focusAreas: ['تطوير الألعاب', 'ريادة الأعمال', 'التكنولوجيا', 'التسويق الدولي', 'إدارة المشاريع'],
      benefits: ['رفع المهارات العملية', 'شبكة علاقات', 'دعم لاحق', 'شهادة معتمدة', 'فرص عمل', 'تمويل مشاريع', 'مرشدين خبراء', 'ورش عمل متخصصة'],
      requirements: 'سعودي الجنسية، بكالوريوس كحد أدنى، إجادة الإنجليزية، جواز سفر ساري',
      applicationDeadline: '15 ديسمبر 2024',
      teamSize: 'فردي أو فريق'
    },
    {
      id: 5,
      type: 'conference',
      title: 'Intersec Saudi Arabia 2025',
      description: 'مؤتمر ومعرض رائد في مجال الأمن والسلامة يجمع أكثر من 370 عارضًا من 35 دولة لاستكشاف أحدث الحلول الأمنية.',
      icon: '🛡️',
      image: '/images/intersec-saudi-2025.jpeg',
      duration: '3 أيام',
      location: 'مركز الرياض الدولي للمؤتمرات والمعارض (RICEC)',
      price: 'مجاناً',
      startDate: '29 سبتمبر - 1 أكتوبر 2025',
      seats: 'غير محدود',
      ageGroup: 'professionals',
      attendanceType: 'in-person',
      costType: 'free',
      durationType: 'short',
      locationType: 'riyadh',
      registrationLink: 'https://intersec-ksa.ae.messefrankfurt.com/ksa/en.html',
      targetAudience: 'المهنيين في مجال الأمن والسلامة',
      organization: 'Messe Frankfurt',
      focusAreas: ['الأمن التجاري والمحيطي', 'الأمن السيبراني', 'الحرائق والإنقاذ', 'السلامة والصحة'],
      benefits: ['شبكة علاقات دولية', 'مؤتمرات معتمدة CPD', 'قمة الأمن المستقبلي', 'أحدث الابتكارات'],
      applicationDeadline: '1 أكتوبر 2025'
    },
    {
      id: 6,
      type: 'incubator',
      title: 'حاضنة الذكاء الاصطناعي 2025',
      description: 'حاضنة متخصصة في دعم مشاريع الذكاء الاصطناعي للمبدعين من عمر 15 وفوق، توفر الدعم التقني والاستشارات والتمويل.',
      icon: '🤖',
      image: '/images/ai-incubator-2025.jpeg',
      duration: 'مستمر',
      location: 'منشآت مركز الابتكار - الرياض / الخبر',
      price: 'مجاناً',
      startDate: 'مفتوح',
      seats: 'غير محدود',
      ageGroup: 'youth',
      attendanceType: 'hybrid',
      costType: 'free',
      durationType: 'ongoing',
      locationType: 'nationwide',
      registrationLink: 'https://innovationcenter.monshaat.gov.sa/incubation-form',
      targetAudience: 'المبدعين من عمر 15 وفوق',
      organization: 'منشآت مركز الابتكار',
      focusAreas: ['الذكاء الاصطناعي', 'التقنيات الناشئة', 'الابتكار', 'التعلم الآلي', 'البيانات الضخمة'],
      benefits: ['دعم تقني', 'استشارات متخصصة', 'شبكة علاقات', 'تمويل محتمل', 'مساحة عمل مجانية', 'تدريب متقدم', 'مرشدين خبراء', 'فرص تسويقية'],
      requirements: 'عمر 15 سنة فما فوق، فكرة مبتكرة في مجال الذكاء الاصطناعي',
      applicationDeadline: '1 أكتوبر 2025'
    },
    {
      id: 7,
      type: 'job_fair',
      title: 'معرض التوظيف 2025 - جامعة الملك فهد للبترول والمعادن',
      description: 'معرض التوظيف السنوي لجامعة الملك فهد للبترول والمعادن تحت رعاية سعادة رئيس الجامعة، يفتح الآفاق ويبني المستقبل للخريجين.',
      icon: '💼',
      image: '/images/job-fair-2025.jpeg',
      duration: 'يوم واحد',
      location: 'مركز المعارض بالجامعة مبنى (54)',
      price: 'مجاناً',
      startDate: '10 سبتمبر 2025',
      seats: 'غير محدود',
      ageGroup: 'graduates',
      attendanceType: 'in-person',
      costType: 'free',
      durationType: 'short',
      locationType: 'specific',
      registrationLink: 'https://events.kfupm.edu.sa/event/258/',
      targetAudience: 'خريجي الجامعة والمهتمين بالتوظيف',
      organization: 'جامعة الملك فهد للبترول والمعادن',
      focusAreas: ['التوظيف', 'الوظائف', 'الشركات', 'الفرص المهنية'],
      benefits: ['فرص عمل مباشرة', 'شبكة علاقات', 'مقابلات شخصية', 'معرفة متطلبات السوق'],
      applicationDeadline: '10 سبتمبر 2025'
    },
    {
      id: 8,
      type: 'scholarship',
      title: 'برنامج موهبة للالتحاق بالجامعات المرموقة (التميز) 2025',
      description: 'برنامج تدريبي متكامل لتأهيل وإعداد أفضل الطلبة الراغبين في الدراسة في الجامعات الأمريكية المرموقة المصنفة من ضمن أفضل 50 جامعة على مستوى العالم.',
      icon: '🎓',
      image: '/images/mawhiba-excellence.jpeg',
      duration: 'مستمر',
      location: 'أونلاين ومقرات موهبة',
      price: 'مساهمة مالية',
      startDate: 'مفتوح',
      seats: 'محدود',
      ageGroup: 'students',
      attendanceType: 'hybrid',
      costType: 'scholarship',
      durationType: 'ongoing',
      locationType: 'nationwide',
      registrationLink: 'https://www.mawhiba.sa/discover-mawhiba/programs/mawhiba-program-for-admission-to-prestigious-universities/mawhiba-program-for-admission-to-prestigious-universities-excellence/',
      targetAudience: 'طلبة الصف الثاني ثانوي',
      organization: 'موهبة',
      focusAreas: ['التأهيل الجامعي', 'الجامعات الأمريكية', 'التميز الأكاديمي', 'التدريب المتكامل'],
      benefits: ['تأهيل للجامعات المرموقة', 'تدريب متكامل', 'دعم أكاديمي', 'شهادات معتمدة'],
      requirements: 'نسبة 90% كحد أدنى، درجة 90% في الرياضيات والعلوم، SAT 1000 أو TOEFL 80 أو IELTS 6.5، اجتياز المقابلة الشخصية',
      applicationDeadline: 'مفتوح'
    },
    {
      id: 9,
      type: 'competition',
      title: 'ماراثون الأفكار أيدياثون 2025',
      description: 'ماراثون للأفكار والمشاريع المجتمعية في منطقة جازان، يهدف إلى تحفيز الابتكار وتطوير حلول مبتكرة للتحديات المحلية.',
      icon: '💡',
      image: '/images/ideathon-2025.jpeg',
      duration: 'مستمر',
      location: 'منطقة جازان',
      price: 'مجاناً',
      startDate: 'مفتوح',
      seats: 'غير محدود',
      ageGroup: 'youth',
      attendanceType: 'hybrid',
      costType: 'free',
      durationType: 'ongoing',
      locationType: 'specific',
      registrationLink: 'https://incubatorbedar.org/config.php',
      teamFormationLink: 'https://chat.whatsapp.com/LvmLdzDQEUxC3jrbwfFzA8?mode=ems_copy_c',
      targetAudience: 'ذكور وإناث من 15 - 35 سنة',
      organization: 'حاضنة بيدر',
      focusAreas: ['المشاريع المجتمعية', 'الابتكار', 'حلول محلية'],
      benefits: ['جوائز مالية', 'دعم المشاريع', 'شبكة علاقات'],
      prizes: '10,000 - 7,000 - 5,000 ريال',
      requirements: 'سكان منطقة جازان، تكوين فريق عمل، الاهتمام بالمشاريع المجتمعية',
      applicationDeadline: '15 سبتمبر 2025'
    }
  ];

  // تطبيق جميع الفلاتر
  const filteredOpportunities = apiOpportunities.filter(opp => {
    let typeMatch;
    if (activeFilter === 'all') {
      typeMatch = true;
    } else if (activeFilter === 'competition') {
      typeMatch = opp.type === 'competition' || opp.type === 'hackathon';
    } else if (activeFilter === 'startup') {
      typeMatch = opp.type === 'startup' || opp.type === 'incubator';
    } else {
      typeMatch = opp.type === activeFilter;
    }
    
    const ageMatch = ageGroup === 'all' || opp.ageGroup === ageGroup;
    const attendanceMatch = attendanceType === 'all' || opp.attendanceType === attendanceType;
    const costMatch = costType === 'all' || opp.costType === costType;
    const durationMatch = durationType === 'all' || opp.durationType === durationType;
    const locationMatch = locationType === 'all' || opp.locationType === locationType;
    
    return typeMatch && ageMatch && attendanceMatch && costMatch && durationMatch && locationMatch;
  });

  const clearAllFilters = () => {
    setActiveFilter('all');
    setAgeGroup('all');
    setAttendanceType('all');
    setCostType('all');
    setDurationType('all');
    setLocationType('all');
  };

  // const getActiveFiltersCount = () => {
  //   let count = 0;
  //   if (activeFilter !== 'all') count++;
  //   if (ageGroup !== 'all') count++;
  //   if (attendanceType !== 'all') count++;
  //   if (costType !== 'all') count++;
  //   if (durationType !== 'all') count++;
  //   if (locationType !== 'all') count++;
  //   return count;
  // };

  const handleAddToSelected = async (opportunityId: number) => {
    if (!isAuthenticated) {
      setMessage({ type: 'error', text: 'يجب تسجيل الدخول أولاً' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setLoading(opportunityId.toString());
    try {
      const token = localStorage.getItem('haymanh_token');
      
      // استخدام _id مباشرة من البيانات الحقيقية
      const backendId = opportunityId;
      
      // التحقق من حالة الفرصة الحالية
      const isCurrentlySelected = selectedOpportunities.has(opportunityId.toString());
      
      let response;
      if (isCurrentlySelected) {
        // إزالة الفرصة من المختارة
        response = await fetch(`http://localhost:8000/api/dashboard/selected-opportunities/${backendId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        // إضافة الفرصة للمختارة
        response = await fetch('http://localhost:8000/api/dashboard/select-opportunity', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ opportunityId: backendId })
        });
      }

      if (response.ok) {
        if (isCurrentlySelected) {
          setSelectedOpportunities(prev => {
            const newSet = new Set(prev);
            newSet.delete(opportunityId.toString());
            return newSet;
          });
          setMessage({ type: 'success', text: 'تم إزالة الفرصة من القائمة المختارة!' });
        } else {
          setSelectedOpportunities(prev => new Set([...Array.from(prev), opportunityId.toString()]));
          setMessage({ type: 'success', text: 'تم إضافة الفرصة للقائمة المختارة بنجاح!' });
        }
        setTimeout(() => setMessage(null), 3000);
        
        // تحديث تلقائي للفرص المختارة
        setTimeout(async () => {
          try {
            const token = localStorage.getItem('haymanh_token');
            const response = await fetch('http://localhost:8000/api/dashboard', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (response.ok) {
              const data = await response.json();
              const selected = new Set<string>();
              
              if (data.userProgress?.selectedOpportunities) {
                data.userProgress.selectedOpportunities.forEach((opp: any) => {
                  const oppId = opp.opportunityId?._id;
                  if (oppId) {
                    // استخدام ObjectId مباشرة
                    if (oppId && typeof oppId === 'string' && oppId.length === 24) {
                      selected.add(oppId);
                    }
                  }
                });
              }
              
              setSelectedOpportunities(selected);
            }
          } catch (error) {
            console.error('Error refreshing selected opportunities:', error);
          }
        }, 1000);
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        setMessage({ type: 'error', text: 'حدث خطأ في العملية' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error adding opportunity:', error);
      setMessage({ type: 'error', text: 'حدث خطأ في الاتصال بالخادم' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(null);
    }
  };

  return (
    <OpportunitiesContainer>
      {message && (
        <MessageContainer
          type={message.type}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          {message.text}
        </MessageContainer>
      )}
      
      <HeroSection>
        <div className="container">
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            الفرص المتاحة
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            اكتشف مجموعة متنوعة من المنح الدراسية والمسابقات الأكاديمية
            والفرص التطوعية والوظائف التدريبية والمؤتمرات والمبادرات
          </HeroSubtitle>
        </div>
      </HeroSection>

      <StatsSection>
        <div className="container">
          <StatsGrid>
            <StatItem>
              <StatNumber>{filteredOpportunities.length}+</StatNumber>
              <StatLabel>فرصة متاحة</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>9</StatNumber>
              <StatLabel>نوع من الفرص</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>1000+</StatNumber>
              <StatLabel>مستفيد</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>95%</StatNumber>
              <StatLabel>معدل الرضا</StatLabel>
            </StatItem>
          </StatsGrid>
        </div>
      </StatsSection>

      <FilterSection>
        <div className="container">
          <FilterContainer>
            {filters.map((filter) => (
              <FilterButton
                key={filter.id}
                isActive={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </FilterButton>
            ))}
          </FilterContainer>
          
          <AdvancedFiltersButton onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            {showAdvancedFilters ? 'إخفاء الفلاتر' : 'فلاتر إضافية'}
          </AdvancedFiltersButton>
          
          {showAdvancedFilters && (
            <AdvancedFiltersContainer
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdvancedFiltersGrid>
                <FilterGroup>
                  <FilterGroupLabel>الفئة العمرية</FilterGroupLabel>
                  <FilterSelect
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                  >
                    {ageGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>نوع الحضور</FilterGroupLabel>
                  <FilterSelect
                    value={attendanceType}
                    onChange={(e) => setAttendanceType(e.target.value)}
                  >
                    {attendanceTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>نوع التكلفة</FilterGroupLabel>
                  <FilterSelect
                    value={costType}
                    onChange={(e) => setCostType(e.target.value)}
                  >
                    {costTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>المدة</FilterGroupLabel>
                  <FilterSelect
                    value={durationType}
                    onChange={(e) => setDurationType(e.target.value)}
                  >
                    {durationTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>الموقع</FilterGroupLabel>
                  <FilterSelect
                    value={locationType}
                    onChange={(e) => setLocationType(e.target.value)}
                  >
                    {locationTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
              </AdvancedFiltersGrid>
            </AdvancedFiltersContainer>
          )}
        </div>
      </FilterSection>

      <OpportunitiesSection>
        <div className="container">
          {filteredOpportunities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
              <h3>لا توجد فرص تطابق الفلاتر المحددة</h3>
              <p>جرب تغيير الفلاتر أو مسح جميع الفلاتر</p>
              <button
                onClick={clearAllFilters}
                style={{
                  background: '#1E3A8A',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginTop: '1rem'
                }}
              >
                عرض جميع الفرص
              </button>
            </div>
          ) : (
            <OpportunitiesGrid>
              {filteredOpportunities.map((opportunity, index) => (
                <OpportunityCard
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <OpportunityImage type={opportunity.type}>
                    {opportunity.image ? (
                      <img 
                        src={opportunity.image} 
                        alt={opportunity.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    ) : (
                      opportunity.icon
                    )}
                  </OpportunityImage>
                  <OpportunityContent>
                    <OpportunityType type={opportunity.type}>
                      {opportunity.type === 'scholarship' ? 'منحة دراسية' : 
                       opportunity.type === 'competition' ? 'مسابقة أكاديمية' : 
                       opportunity.type === 'volunteer' ? 'فرصة تطوعية' :
                       opportunity.type === 'internship' ? 'وظيفة تدريبية' :
                       opportunity.type === 'conference' ? 'مؤتمر/ورشة' :
                       opportunity.type === 'initiative' ? 'مبادرة' : 
                       opportunity.type === 'research' ? 'فرصة بحث' :
                       opportunity.type === 'startup' ? 'دعم مشاريع' :
                       opportunity.type === 'camp' ? 'معسكر' :
                       opportunity.type === 'hackathon' ? 'هاكاثون' :
                       opportunity.type === 'job_fair' ? 'معرض توظيف' :
                       opportunity.type === 'incubator' ? 'حاضنة' : 'فرصة'}
                    </OpportunityType>
                    <OpportunityTitle>{opportunity.title}</OpportunityTitle>
                    <OpportunityDescription>{opportunity.description}</OpportunityDescription>
                    
                    <OpportunityDetails>
                      <DetailItem>
                        <DetailIcon>⏱️</DetailIcon>
                        <DetailText>{opportunity.duration}</DetailText>
                      </DetailItem>
                      <DetailItem>
                        <DetailIcon>📍</DetailIcon>
                        <DetailText>
                          {typeof opportunity.location === 'object' 
                            ? `${opportunity.location.city}, ${opportunity.location.country}` 
                            : opportunity.location}
                        </DetailText>
                      </DetailItem>
                      <DetailItem>
                        <DetailIcon>💰</DetailIcon>
                        <DetailText>{opportunity.price}</DetailText>
                      </DetailItem>
                      <DetailItem>
                        <DetailIcon>📅</DetailIcon>
                        <DetailText>{opportunity.startDate}</DetailText>
                      </DetailItem>
                      <DetailItem>
                        <DetailIcon>🪑</DetailIcon>
                        <DetailText>{opportunity.seats}</DetailText>
                      </DetailItem>
                      {opportunity.applicationDeadline && (
                        <DetailItem>
                          <DetailIcon>⏰</DetailIcon>
                          <DetailText>ينتهي التسجيل: {opportunity.applicationDeadline}</DetailText>
                        </DetailItem>
                      )}
                      {opportunity.tracks && (
                        <DetailItem>
                          <DetailIcon>🎯</DetailIcon>
                          <DetailText>المسارات: {opportunity.tracks.join('، ')}</DetailText>
                        </DetailItem>
                      )}
                      {opportunity.targetAudience && (
                        <DetailItem>
                          <DetailIcon>👥</DetailIcon>
                          <DetailText>الفئات المستهدفة: {opportunity.targetAudience}</DetailText>
                        </DetailItem>
                      )}
                      {(opportunity.organization || opportunity.company?.name) && (
                        <DetailItem>
                          <DetailIcon>🏢</DetailIcon>
                          <DetailText>المنظمة: {opportunity.organization || opportunity.company?.name}</DetailText>
                        </DetailItem>
                      )}
                      {opportunity.focusAreas && (
                        <DetailItem>
                          <DetailIcon>🎯</DetailIcon>
                          <DetailText>مجالات التركيز: {opportunity.focusAreas.join('، ')}</DetailText>
                        </DetailItem>
                      )}
                      {opportunity.benefits && (
                        <DetailItem>
                          <DetailIcon>✨</DetailIcon>
                          <DetailText>الفوائد: {opportunity.benefits.join('، ')}</DetailText>
                        </DetailItem>
                      )}
                      {opportunity.prizes && (
                        <DetailItem>
                          <DetailIcon>🏆</DetailIcon>
                          <DetailText>الجوائز: {opportunity.prizes}</DetailText>
                        </DetailItem>
                      )}
                    </OpportunityDetails>
                    
                    {(opportunity as any).isClosed ? (
                      <OpportunityButton 
                        style={{ 
                          backgroundColor: '#6B7280', 
                          cursor: 'not-allowed',
                          opacity: 0.7
                        }}
                        disabled
                      >
                        مغلق
                      </OpportunityButton>
                    ) : (
                      <OpportunityButton 
                        onClick={() => {
                          if (opportunity.registrationLink) {
                            window.open(opportunity.registrationLink, '_blank');
                          }
                        }}
                      >
                        سجل الآن
                      </OpportunityButton>
                    )}
                    {opportunity.teamFormationLink && (
                      <OpportunityButton 
                        style={{ backgroundColor: '#28a745', marginTop: '10px' }}
                        onClick={() => {
                          window.open(opportunity.teamFormationLink, '_blank');
                        }}
                      >
                        تكوين الفرق
                      </OpportunityButton>
                    )}
                    <AddToSelectedButton
                      isSelected={selectedOpportunities.has(opportunity._id)}
                      onClick={() => handleAddToSelected(opportunity._id)}
                      disabled={loading === opportunity._id}
                    >
                      {loading === opportunity._id 
                        ? 'جاري الإضافة...' 
                        : selectedOpportunities.has(opportunity._id) 
                          ? '✓ تمت الإضافة للقائمة المختارة' 
                          : 'أضف للفرص المختارة'
                      }
                    </AddToSelectedButton>
                  </OpportunityContent>
                </OpportunityCard>
              ))}
            </OpportunitiesGrid>
          )}
        </div>
      </OpportunitiesSection>
    </OpportunitiesContainer>
  );
};

export default Opportunities;
