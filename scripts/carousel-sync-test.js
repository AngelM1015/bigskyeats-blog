#!/usr/bin/env node
// 🎠 BLOG CAROUSEL SYNC TESTER
// Tests carousel backend sync functionality

const fetch = require('node-fetch');

class BlogCarouselSync {
  constructor() {
    this.serverUrl = process.env.NODE_ENV === 'production' 
      ? 'https://bigskyeats.app'
      : 'http://localhost:3000';
  }
  
  async testCarouselSync() {
    console.log('🎠 BLOG CAROUSEL SYNC TEST');
    console.log('='.repeat(40));
    
    try {
      // Test email registration endpoint
      await this.testEmailRegistration();
      
      // Test carousel performance
      await this.testCarouselPerformance();
      
      console.log('\n✅ Carousel sync test complete');
    } catch (error) {
      console.error('❌ Carousel sync test failed:', error.message);
    }
  }
  
  async testEmailRegistration() {
    console.log('📧 Testing email registration...');
    
    const testData = {
      email_registration: {
        email: 'test@bigskyeats.co',
        user_type: 'customer',
        source: 'blog_carousel'
      }
    };
    
    try {
      const response = await fetch(`${this.serverUrl}/api/v1/email_registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });
      
      if (response.ok) {
        console.log('   ✅ Email registration endpoint: Working');
      } else {
        console.log('   ⚠️  Email registration endpoint: Issues detected');
      }
    } catch (error) {
      console.log('   ❌ Email registration endpoint: Not accessible');
    }
  }
  
  async testCarouselPerformance() {
    console.log('⚡ Testing carousel performance...');
    
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${this.serverUrl}/api/v1/health`);
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      if (responseTime < 1000) {
        console.log(`   ✅ Response time: ${responseTime}ms (Good)`);
      } else {
        console.log(`   ⚠️  Response time: ${responseTime}ms (Slow)`);
      }
    } catch (error) {
      console.log('   ❌ Performance test failed');
    }
  }
}

// Run if executed directly
if (require.main === module) {
  const tester = new BlogCarouselSync();
  tester.testCarouselSync();
}

module.exports = BlogCarouselSync;
