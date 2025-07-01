import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const About = () => {
  const values = [
    {
      icon: 'Heart',
      title: 'Handcrafted with Love',
      description: 'Every product is made with care and attention to detail by skilled artisans who take pride in their craft.'
    },
    {
      icon: 'Leaf',
      title: 'Sustainable Practices',
      description: 'We prioritize eco-friendly materials and sustainable production methods to protect our planet.'
    },
    {
      icon: 'Users',
      title: 'Supporting Artisans',
      description: 'We believe in fair trade and ensuring our artisan partners receive fair compensation for their work.'
    },
    {
      icon: 'Award',
      title: 'Quality Guarantee',
      description: 'Each piece is carefully inspected to ensure it meets our high standards for quality and craftsmanship.'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Sarah started Craftly with a passion for handmade products and a mission to connect artisans with customers worldwide.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Artisan Relations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Michael works directly with our artisan partners to ensure fair trade practices and quality standards.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Emma curates our product collections and helps tell the stories behind each handcrafted piece.'
    }
  ]

  const stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: '50+', label: 'Artisan Partners' },
    { number: '1000+', label: 'Products Sold' },
    { number: '15', label: 'Countries Reached' }
  ]

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
                Our Story
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Craftly was born from a simple belief: that handmade products carry a special energy 
                and story that mass-produced items simply cannot match. We started this journey to 
                connect talented artisans with people who appreciate the beauty of handcrafted goods.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Every product in our marketplace is carefully selected for its quality, uniqueness, 
                and the story behind its creation. We're not just selling products; we're sharing 
                the passion and skill of craftspeople from around the world.
              </p>
              <Button size="lg" icon="ArrowRight">
                Shop Our Collection
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=500&fit=crop"
                alt="Artisan at work"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-hover">
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-primary-600">2020</p>
                  <p className="text-sm text-gray-600">Founded</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our relationships with artisans and customers alike.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <ApperIcon name={value.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Craftly who work every day to connect artisans with customers.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              To create a global marketplace where artisans can share their craft with the world, 
              where customers can find unique, meaningful products, and where every purchase 
              supports the preservation of traditional craftsmanship and creative expression.
            </p>
            <div className="bg-gradient-primary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-display font-bold mb-4">
                Join Our Community
              </h3>
              <p className="text-white/90 mb-6">
                Become part of a movement that celebrates handmade craftsmanship and supports artisans worldwide.
              </p>
              <Button variant="secondary" size="lg" icon="Users" className="bg-white text-primary-700 hover:bg-warm-50">
                Start Shopping
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About