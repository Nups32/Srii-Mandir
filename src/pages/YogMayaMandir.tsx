import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Book, Flower2, X, MessageCircle, Search } from 'lucide-react';
import { getActiveYogMayaMandir } from '@/utils/API';
import { message } from 'antd';

const YogMayaMandir: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('beginner');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDhamsModalOpen, setIsDhamsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // State for the Question Form
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    spouseName: '',
    childrenNames: '',
    dob: '',
    birthPlace: '',
    email: '',
    question: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const fetchYogMayaData = async () => {
    setLoading(true);
    try {
      const response: any = await getActiveYogMayaMandir();
      if (response?.data?.status) {
        setData(response?.data?.data || []);
      } else {
        message.error("failed to fetch Data");
      }
    } catch (error) {
      console.log("error", error);
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYogMayaData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Question Submitted:", formData);
    message.success("Thank you. Your question has been submitted to the Mandir.");
    setIsModalOpen(false);
    setFormData({
      name: '', 
      fatherName: '', 
      spouseName: '', 
      childrenNames: '',
      dob: '', 
      birthPlace: '', 
      email: '', 
      question: ''
    });
  };

  const features = [
    { 
      icon: <Flower2 className="w-16 h-16 text-orange-600" />, 
      title: "Yog Practices", 
      description: "Discover ancient yogic wisdom and practices that unite body, mind, and soul in perfect harmony." 
    },
    { 
      icon: <Sparkles className="w-16 h-16 text-amber-600" />, 
      title: "Maya Understanding", 
      description: "Transcend the illusions of material world and perceive the eternal truth beyond appearances." 
    },
    { 
      icon: <Heart className="w-16 h-16 text-rose-600" />, 
      title: "Meditation Guidance", 
      description: "Experience profound inner peace through guided meditation techniques passed down through generations." 
    }
  ];

  const allMandirs = [
    { sr: 1, name: "Yog Maya Dham", place: "Vrindavan, Uttar Pradesh", purpose: "Property Relative Issue" },
    { sr: 2, name: "Shri Garud Govind Temple", place: "Shri Vrindavan, Uttar Pradesh", purpose: "Desired Wish" },
    { sr: 3, name: "Neem Karoli Baba Ashram", place: "Vrindavan, Uttar Pradesh", purpose: "Happiness" },
    { sr: 4, name: "Sapt Sundari Dham", place: "Orchha, Madhya Pradesh", purpose: "Baby Conceive Problem" },
    { sr: 5, name: "Tripura Sundari Dham", place: "Tripuri, Madhya Pradesh", purpose: "Tantra Vidya" },
    { sr: 6, name: "Maharshi Vibhu Manokamna Dham", place: "Ballia, Uttar Pradesh", purpose: "Property Relative Issue / Happiness" },
    { sr: 7, name: "Vindhyachal Dham", place: "Uttar Pradesh", purpose: "(Main pilgrimage for Child Birth / Putra Prapti)" },
    { sr: 8, name: "Sankat Mochan Hanuman Dham", place: "Banaras (Varanasi), Uttar Pradesh", purpose: "Freedom From Debt" },
    { sr: 9, name: "Maa Jwalamukhi Karj Mukti Dham", place: "Durg, Chhattisgarh", purpose: "(Debt / Loan relief)" },
    { sr: 10, name: "Kamakhya Shakti Dham", place: "Guwahati, Assam", purpose: "(Grah Kalesh / Family disputes)" },
    { sr: 11, name: "Sapt Sarovar Mukti Dham", place: "Muzaffarnagar, Uttar Pradesh", purpose: "(Mukti / Spiritual liberation)" },
    { sr: 12, name: "Maa Jagdamba Pawan Dham", place: "Dibrugarh, Assam", purpose: "(Justice related)" },
    { sr: 13, name: "Swayam Bhav Har Mahadev Dham", place: "Banaskantha, Rajasthan", purpose: "Problems In Relationships" },
    { sr: 14, name: "Shree Sadhana Durga Peeth – 24 Parganas", place: "West Bengal", purpose: "(Manokamna Poorti – Wish fulfillment)" },
    { sr: 15, name: "Jag Janani Sita Shruti Dham – Janakpur Dham", place: "Dhanusha District, Nepal", purpose: "Good marriage life" },
    { sr: 16, name: "Shri Radha Rani Kirti Mandir", place: "Barsana, Uttar Pradesh", purpose: "(Marriage related issues)" },
    { sr: 17, name: "Bhuteshwar Tantra Vidya Dham", place: "Rourkela, Odisha", purpose: "(Atma Shanti, Bhut-Pret, Mukti)" },
    { sr: 18, name: "Shree Navlakha Yojana Dham", place: "Jharkhand", purpose: "(Talaq / Divorce related problems)" },
    { sr: 19, name: "Bagalamukhi Temple", place: "Nalkheda, Madhya Pradesh", purpose: "(Justice, legal victory)" },
    { sr: 20, name: "Beri Wala Siddh Peeth Mandir", place: "Noida, Uttar Pradesh", purpose: "(Child health issues)" },
    { sr: 21, name: "Anusuya Devi Mandir", place: "Udaipur, Rajasthan", purpose: "(Personal problems)" },
    { sr: 22, name: "Siddh Peeth Dhameshwari Devi", place: "Chittorgarh", purpose: "(Mental peace & solutions)" },
    { sr: 23, name: "Shri Bhaktivedanta Gau Seva Dham", place: "Jharkhand", purpose: "(Mother, Father & family related work)" },
    { sr: 24, name: "Jeevan Chhaya Shakti Peeth", place: "Bihar", purpose: "(Children speech problems)" },
    { sr: 25, name: "Maya Shakti Sarovar Dham", place: "Buxar, Bihar", purpose: "(BP, Sugar, Thyroid, Cancer, Hair problems)" },
    { sr: 26, name: "Ganpati Mandir", place: "Mahakaleshwar - Ujjain", purpose: "Vighna Nashak" },
    { sr: 27, name: "Laxmi Mandir", place: "Vrindavan, Uttar Pradesh", purpose: "Dhan Prapti" }
  ];

  const displayedMandirs = allMandirs.slice(0, 3);
  const filteredMandirs = allMandirs.filter(mandir =>
    mandir.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mandir.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mandir.place.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const yogTeachings = [
  //   {
  //     title: "What is Yog?",
  //     icon: <Sun className="w-12 h-12 text-orange-500" />,
  //     content: "Yog means 'union' - the connection between your individual soul (Atman) and the universal consciousness (Brahman). It's not just physical postures, but a complete way of living that brings harmony to your body, mind, and spirit. Think of it like tuning a musical instrument - Yog helps you tune yourself to the divine frequency."
  //   },
  //   {
  //     title: "The Eight Limbs of Yog",
  //     icon: <Flower2 className="w-12 h-12 text-amber-500" />,
  //     content: "Yog has eight steps like a ladder to enlightenment: 1) Yama (ethical living), 2) Niyama (self-discipline), 3) Asana (postures), 4) Pranayama (breath control), 5) Pratyahara (withdrawing senses), 6) Dharana (concentration), 7) Dhyana (meditation), 8) Samadhi (enlightenment). Each step prepares you for the next, like learning to walk before you run."
  //   },
  //   {
  //     title: "Prana - Your Life Energy",
  //     icon: <Wind className="w-12 h-12 text-cyan-500" />,
  //     content: "Prana is the vital life force flowing through all living beings - like electricity powering a light bulb. Through yogic breathing (Pranayama), you can control and increase this energy. When your prana flows freely, you feel energetic, healthy, and peaceful. Blocked prana causes tiredness and illness."
  //   },
  //   {
  //     title: "The Chakras - Energy Centers",
  //     icon: <Zap className="w-12 h-12 text-purple-500" />,
  //     content: "Your body has seven main energy centers (chakras) along your spine, from the base to the crown of your head. Each chakra governs different aspects of your physical and spiritual life. Like opening windows in a house, activating these chakras allows divine energy to flow through you, bringing balance and awakening."
  //   }
  // ];

  // const mayaTeachings = [
  //   {
  //     title: "Understanding Maya",
  //     icon: <Eye className="w-12 h-12 text-indigo-500" />,
  //     content: "Maya is the cosmic illusion that makes us believe the temporary world is the ultimate reality. Imagine watching a movie and forgetting it's just images on a screen - that's Maya. It creates the appearance of separation, making us feel separate from God and each other, when in truth, we are all one divine consciousness."
  //   },
  //   {
  //     title: "How Maya Works",
  //     icon: <Sparkles className="w-12 h-12 text-pink-500" />,
  //     content: "Maya works through three qualities (Gunas): Sattva (purity, light), Rajas (passion, activity), and Tamas (darkness, inertia). Like ingredients in a recipe, these mix in different proportions to create everything in the universe. Maya keeps us attached to pleasure and pain, success and failure, making us forget our true divine nature."
  //   },
  //   {
  //     title: "Breaking Free from Maya",
  //     icon: <Sun className="w-12 h-12 text-yellow-500" />,
  //     content: "To transcend Maya, we must develop Viveka (discrimination) - the ability to distinguish between the real and unreal, permanent and temporary. Regular spiritual practice, meditation, and devotion to God help pierce through the veil of illusion. Like waking from a dream, enlightenment reveals the true nature of reality."
  //   },
  //   {
  //     title: "Living Beyond Illusion",
  //     icon: <Heart className="w-12 h-12 text-rose-500" />,
  //     content: "Once you understand Maya, you don't escape the world but see it with new eyes. You engage fully in life without attachment, like an actor playing a role while knowing it's just a play. This brings freedom from suffering because you're no longer trapped by the illusion of duality and separation."
  //   }
  // ];

  // const meditationPractices = [
  //   {
  //     level: "beginner",
  //     name: "Breath Awareness Meditation",
  //     duration: "5-10 minutes",
  //     image: "🧘‍♀️",
  //     steps: [
  //       "Sit comfortably with spine straight, hands on knees, eyes gently closed",
  //       "Take 3 deep breaths - inhale peace, exhale all tension from your body",
  //       "Breathe naturally and simply observe each breath without controlling it",
  //       "Notice the cool air entering your nostrils and warm air leaving",
  //       "When mind wanders (it will!), gently bring attention back to breath",
  //       "Feel your belly rise and fall like ocean waves - natural and rhythmic",
  //       "End with gratitude, slowly open eyes and notice how calm you feel"
  //     ],
  //     benefits: "Calms the mind, reduces stress, improves focus, lowers blood pressure"
  //   },
  //   {
  //     level: "intermediate",
  //     name: "Chakra Meditation",
  //     duration: "15-20 minutes",
  //     image: "🌈",
  //     steps: [
  //       "Sit in meditation posture, spine straight, body relaxed but alert",
  //       "Visualize a glowing red light at the base of your spine (Root Chakra)",
  //       "Move awareness up to orange light below navel (Sacral Chakra)",
  //       "Continue to yellow light at solar plexus (Solar Plexus Chakra)",
  //       "Green light at heart center (Heart Chakra) - feel love expanding",
  //       "Blue light at throat (Throat Chakra) - embrace your authentic voice",
  //       "Indigo light at third eye between eyebrows (Third Eye Chakra)",
  //       "Violet light at crown of head (Crown Chakra) - connect to divine",
  //       "Feel energy flowing freely through all centers like a fountain of light"
  //     ],
  //     benefits: "Balances energy, awakens intuition, promotes healing, spiritual growth"
  //   },
  //   {
  //     level: "advanced",
  //     name: "Transcendental Meditation",
  //     duration: "20-30 minutes",
  //     image: "🕉️",
  //     steps: [
  //       "Choose a sacred mantra (Om, So-Ham, or personal mantra from guru)",
  //       "Sit in comfortable position, preferably lotus or half-lotus",
  //       "Close eyes and take several deep, grounding breaths",
  //       "Begin repeating mantra silently in your mind with each breath",
  //       "Let mantra become subtler and subtler, like a whisper fading",
  //       "Transcend beyond thought into pure awareness - the gap between thoughts",
  //       "Rest in this state of pure consciousness without effort or control",
  //       "If thoughts arise, gently return to mantra without judgment",
  //       "After time, let mantra go and sit in silence - just being",
  //       "Slowly return, wiggling fingers/toes before opening eyes"
  //     ],
  //     benefits: "Deep inner peace, self-realization, union with divine consciousness"
  //   }
  // ];

  // const wisdomTeachings = [
  //   {
  //     title: "The Nature of Self",
  //     quote: "You are not the body, not the mind, not the emotions. You are the eternal witness, the pure consciousness observing all experiences.",
  //     explanation: "Your true self (Atman) is like the screen on which a movie plays - it remains unchanged whether the movie is happy or sad. The body ages, thoughts come and go, but your true essence is eternal and unchanging."
  //   },
  //   {
  //     title: "The Power of Now",
  //     quote: "Past is memory, future is imagination. Only the present moment is real. In the now, you touch eternity.",
  //     explanation: "Most suffering comes from dwelling on past regrets or worrying about the future. When you anchor yourself in the present moment through meditation and mindfulness, you discover an unshakeable peace that was always within you."
  //   },
  //   {
  //     title: "Karma - The Law of Action",
  //     quote: "Every action creates a ripple in the cosmic ocean. Perform your duties selflessly, offering the fruits to the divine.",
  //     explanation: "Karma isn't punishment or reward - it's simply the law of cause and effect. Like planting seeds in a garden, your thoughts and actions determine what grows in your life. Act with pure intention and without attachment to outcomes to create positive karma."
  //   },
  //   {
  //     title: "The Unity of All",
  //     quote: "The same divine light shines in all beings. When you hurt another, you hurt yourself. When you serve another, you serve God.",
  //     explanation: "Separation is an illusion. Like waves in the ocean appearing different but all being made of the same water, all beings are expressions of one divine consciousness. This understanding naturally leads to compassion and love for all."
  //   }
  // ];

  // const meditationImages = [
  //   { emoji: "🧘‍♂️", label: "Seated Meditation" },
  //   { emoji: "🌅", label: "Sunrise Practice" },
  //   { emoji: "🌳", label: "Nature Meditation" },
  //   { emoji: "🕯️", label: "Candle Gazing" },
  //   { emoji: "🙏", label: "Prayer & Devotion" },
  //   { emoji: "📿", label: "Mantra Chanting" }
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 text-white py-16 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 text-9xl flex items-center justify-center" style={{ transform: `rotate(${scrollY * 0.1}deg)` }}>
          🕉️
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              🕉️ Yog Maya Mandir 🕉️
            </h1>
            <p className="text-xl md:text-2xl opacity-95">
              Gateway to Divine Consciousness and Inner Tranquility
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-16 text-center my-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6">
            Discover Your Inner Divine Light
          </h2>
          <p className="text-lg md:text-xl text-amber-900 max-w-3xl mx-auto mb-8 leading-relaxed">
            Welcome to a sacred space where ancient wisdom meets modern consciousness.
            Embark on a transformative journey of self-discovery, meditation, and spiritual awakening.
            Here, the timeless teachings of Yog and the profound understanding of Maya illuminate
            your path to enlightenment.
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl animate-pulse cursor-pointer">
            Begin Your Journey
          </button>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-8 my-16">
          {features.map((feature, index) => (
            <div 
            key={index} 
            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition duration-500 group">
              <div className="flex justify-center mb-6 animate-bounce-slow group-hover:scale-110 transition duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-amber-800 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-amber-900 leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* Yog Teachings Section */}
        <section className="my-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-800 mb-4">
            Understanding Yog
          </h2>
          <p className="text-center text-amber-900 text-lg mb-12 max-w-3xl mx-auto">
            Yog is the ancient science of uniting your individual consciousness with the universal divine consciousness. Let's explore its profound teachings in simple terms.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {data?.understandingYog?.map((teaching: any, index: any) => (
              <div 
              key={index} 
              className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border-l-4 border-orange-500">
                <div className="flex items-center gap-4 mb-4">
                  {teaching?.icon}
                  <h3 className="text-2xl font-bold text-amber-800">
                    {teaching?.title}
                  </h3>
                </div>
                <p className="text-amber-900 leading-relaxed text-lg">
                  {teaching?.description}
                </p>
              </div>
            ))}
          </div>
        </section>
         {/* Maya Teachings Section */}
        {/* <section className="my-20 bg-linear-to-r from-purple-100 via-pink-100 to-orange-100 rounded-3xl p-8 md:p-12 shadow-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-purple-900 mb-4">
            The Mystery of Maya
          </h2>
          <p className="text-center text-purple-800 text-lg mb-12 max-w-3xl mx-auto">
            Maya is the divine cosmic illusion that makes the infinite appear finite. Understanding Maya is the key to liberation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mayaTeachings.map((teaching, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-purple-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  {teaching.icon}
                  <h3 className="text-2xl font-bold text-purple-800">
                    {teaching.title}
                  </h3>
                </div>
                <p className="text-gray-800 leading-relaxed text-lg">
                  {teaching.content}
                </p>
              </div>
            ))}
          </div>
        </section> */}

        {/* Meditation Practices Section */}
        <section className="my-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-800 mb-4">
            Meditation Practices
          </h2>
          <p className="text-center text-amber-900 text-lg mb-8 max-w-3xl mx-auto">
            Choose a practice that matches your experience level. Start where you are and progress at your own pace.
          </p>
{/* Meditation Images */}
          {/* <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-12">
            {meditationImages.map((img, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 text-center"
              >
                <div className="text-5xl mb-2">{img.emoji}</div>
                <p className="text-sm text-amber-800 font-semibold">{img.label}</p>
              </div>
            ))}
          </div> */}

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <button onClick={() => setActiveTab('beginner')} className={`px-8 py-3 rounded-full font-bold transition ${activeTab === 'beginner' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' : 'bg-white text-amber-800 hover:shadow-lg'}`}>
              Beginner
            </button>
            <button onClick={() => setActiveTab('intermediate')} className={`px-8 py-3 rounded-full font-bold transition ${activeTab === 'intermediate' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' : 'bg-white text-amber-800 hover:shadow-lg'}`}>
              Intermediate
            </button>
            <button onClick={() => setActiveTab('advanced')} className={`px-8 py-3 rounded-full font-bold transition ${activeTab === 'advanced' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'bg-white text-amber-800 hover:shadow-lg'}`}>
              Advanced
            </button>
          </div>

          {data?.meditationPractices?.filter((practice: any) => practice?.type === activeTab)?.map((practice: any, index: any) => (
            <div key={index} className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="text-7xl mb-4">{practice?.image}</div>
                <h3 className="text-3xl font-bold text-amber-800 mb-2">
                  {practice?.title}
                </h3>
                <p className="text-lg text-amber-700">
                  Duration: {practice?.duration}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-2xl font-bold text-amber-800 mb-4">
                  Step-by-Step Guide:
                </h4>
                <ol className="space-y-4">
                  {practice?.step?.map((step: any, idx: any) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-amber-900 leading-relaxed text-lg pt-1">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-800 mb-2">
                  Benefits:
                </h4>
                <p className="text-amber-900 text-lg">
                  {practice?.benefit}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Spiritual Dhams Section - Only 3 shown */}
        <section className="my-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-800 mb-12">
            List of Spiritual Dham / Shakti Peeth
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {displayedMandirs.map((mandir) => (
              <div key={mandir.sr} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition duration-500 group">
                <h3 className="text-2xl font-bold text-amber-800 mb-4 text-center">
                  {mandir.name}
                </h3>
                <p className="text-amber-900 leading-relaxed text-center">
                  Place: {mandir.place}
                </p>
                <p className="text-amber-900 leading-relaxed text-center mt-3">
                  Purpose: {mandir.purpose}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setIsDhamsModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg transform transition hover:scale-105 cursor-pointer"
            >
              View All
            </button>
          </div>
        </section>

        {/* Divine Wisdom */}
        <section className="my-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-800 mb-4">
            Divine Wisdom
          </h2>
          <p className="text-center text-amber-900 text-lg mb-12 max-w-3xl mx-auto">
            Profound spiritual truths explained simply to illuminate your path to enlightenment.
          </p>
          <div className="space-y-8">
            {data?.wisdoms?.map((teaching: any, index: any) => (
              <div key={index} className="bg-white rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-amber-800 mb-4">
                  {teaching.title}
                </h3>
                <blockquote className="text-xl md:text-2xl italic text-purple-800 border-l-4 border-orange-500 pl-6 mb-6 leading-relaxed">
                  "{teaching.wisdom}"
                </blockquote>
                <p className="text-lg text-amber-900 leading-relaxed">
                  <span className="font-bold text-amber-800">Understanding: </span>
                  {teaching.understanding}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-16 text-center my-16 border-t-4 border-b-4 border-orange-500 shadow-xl">
          <blockquote className="text-2xl md:text-4xl italic font-serif text-amber-800 max-w-6xl mx-auto leading-relaxed">
            "Yoga is the journey of the self, through the self, to the self."
          </blockquote>
          <cite className="block text-right mt-6 text-xl text-amber-700 not-italic">
            - The Bhagavad Gita
          </cite>
        </section>

        {/* Call to Action */}
        <section className="text-center my-8">
          <div className="bg-gradient-to-br from-orange-100 to-rose-100 rounded-3xl p-12 shadow-xl">
            <Book className="w-20 h-20 text-amber-700 mx-auto mb-6 animate-bounce-slow" />
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              Ready to Start Your Spiritual Journey?
            </h2>
            <p className="text-lg text-amber-900 mb-8 max-w-2xl mx-auto">
              Join our community of seekers and discover the profound peace and wisdom
              that awaits within you. Your transformation begins today.
            </p>
            <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg transform transition hover:scale-105 cursor-pointer">
              Join Our Sangha
            </button>
          </div>
        </section>

        {/* Ask Question Section */}
        <section className="text-center my-16">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-amber-100">
            <MessageCircle className="w-20 h-20 text-orange-600 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              Have a Spiritual Question?
            </h2>
            <p className="text-lg text-amber-900 mb-8 max-w-2xl mx-auto">
              Our swamis are here to guide you. If you are seeking clarity on your path or have 
              specific questions about your practice, we are here to help.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg transform transition hover:scale-105 cursor-pointer"
            >
              Ask Question
            </button>
          </div>
        </section>
      </div>

      {/* Ask Question Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all">
            <div className="bg-gradient-to-r from-amber-800 to-orange-700 p-6 flex justify-between items-center text-white">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6" /> Spiritual Inquiry
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-amber-800 mb-1">Name</label><input required name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full px-4 py-2 rounded-xl border border-amber-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your full name" /></div>
                <div><label className="block text-sm font-semibold text-amber-800 mb-1">Father's Name</label><input required name="fatherName" value={formData.fatherName} onChange={handleInputChange} type="text" className="w-full px-4 py-2 rounded-xl border border-amber-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Father's name" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-amber-800 mb-1">Spouse's Name</label><input name="spouseName" value={formData.spouseName} onChange={handleInputChange} type="text" className="w-full px-4 py-2 rounded-xl border border-amber-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="If applicable" /></div>
                <div><label className="block text-sm font-semibold text-amber-800 mb-1">Children's Names</label><input name="childrenNames" value={formData.childrenNames} onChange={handleInputChange} type="text" className="w-full px-4 py-2 rounded-xl border border-amber-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Names of children" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-amber-800 mb-1">Date of Birth</label><input required name="dob" value={formData.dob} onChange={handleInputChange} type="date" className="w-full px-4 py-2 rounded-xl border border-amber-200 focus:ring-2 focus:ring-orange-500 outline-none" /></div>
                <div><label className="block text-sm font-semibold text-amber-800 mb-1">Birth Place</label><input required name="birthPlace" value={formData.birthPlace} onChange={handleInputChange} type="text" className="w-full px-4 py-2 rounded-xl border border-amber-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="City, State" /></div>
              </div>
              <div><label className="block text-sm font-semibold text-amber-800 mb-1">Email</label><input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full px-4 py-2 rounded-xl border border-amber-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="email@example.com" /></div>
              <div><label className="block text-sm font-semibold text-amber-800 mb-1">Ask Question</label><textarea required name="question" value={formData.question} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 rounded-xl border border-amber-200 focus:ring-2 focus:ring-orange-500 outline-none resize-none" placeholder="Write your question here..."></textarea></div>
              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform transition hover:scale-[1.01] cursor-pointer">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NEW: View All Modal - Exactly like your screenshot */}
      {isDhamsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto pt-10 pb-10">
          <div className="w-full max-w-7xl bg-gradient-to-b from-maroon-800 to-maroon-900 text-white rounded-t-3xl overflow-hidden">
            {/* Header */}
            <div className="px-8 py-6 flex justify-between items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">List of Spiritual Dham / Shakti Peeth</h1>
                <p className="text-lg opacity-90 mt-1">Discover sacred destinations for specific life purposes</p>
              </div>
              <button onClick={() => { setIsDhamsModalOpen(false); setSearchTerm(''); }} className="p-3 hover:bg-white/20 rounded-full transition">
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-8 pb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or purpose..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>

            {/* Cards Grid */}
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 px-8 pb-12 pt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMandirs.map((mandir) => (
                  <div key={mandir.sr} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🕉️</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{mandir.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{mandir.place}</p>
                        <p className="text-sm font-medium text-orange-700 mt-3">{mandir.purpose}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YogMayaMandir;