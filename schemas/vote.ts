import { defineField, defineType } from 'sanity'
import { HeartIcon } from '@sanity/icons'

/**
 * Vote schema for Big Sky Eats voting system
 * This schema tracks individual votes for restaurants with user authentication
 */

export default defineType({
  name: 'vote',
  title: 'Vote',
  icon: HeartIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'restaurant',
      title: 'Restaurant',
      type: 'reference',
      to: [{ type: 'restaurant' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      description: 'BigSkyEatsServer user ID',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'userEmail',
      title: 'User Email',
      type: 'string',
      description: 'User email from BigSkyEatsServer',
      validation: (rule) => rule.required().email(),
      readOnly: true,
    }),
    defineField({
      name: 'userType',
      title: 'User Type',
      type: 'string',
      description: 'Customer type from BigSkyEatsServer (non_subscribed_local, insider, elite, etc.)',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'isLocalCustomer',
      title: 'Is Local Customer',
      type: 'boolean',
      description: 'Whether the user is a local customer (not tourist)',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'voteDate',
      title: 'Vote Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      description: 'Browser user agent for analytics',
      readOnly: true,
    }),
    defineField({
      name: 'isValid',
      title: 'Valid Vote',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this vote is considered valid (not spam/duplicate)',
    }),
    defineField({
      name: 'location',
      title: 'Approximate Location',
      type: 'string',
      description: 'City/region for analytics (no precise location stored)',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      restaurantName: 'restaurant.name',
      voteDate: 'voteDate',
      isValid: 'isValid',
      userEmail: 'userEmail',
      userType: 'userType',
    },
    prepare({ restaurantName, voteDate, isValid, userEmail, userType }) {
      const date = new Date(voteDate).toLocaleDateString()
      const status = isValid ? '✓' : '✗'
      return {
        title: `${status} Vote for ${restaurantName || 'Unknown Restaurant'}`,
        subtitle: `${userEmail} (${userType}) - ${date}`,
        media: HeartIcon,
      }
    },
  },
  orderings: [
    {
      title: 'Most Recent',
      name: 'voteDateDesc',
      by: [{ field: 'voteDate', direction: 'desc' }],
    },
    {
      title: 'Restaurant Name',
      name: 'restaurantName',
      by: [{ field: 'restaurant.name', direction: 'asc' }],
    },
  ],
})