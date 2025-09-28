import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

/**
 * Restaurant schema for Big Sky Eats voting system
 * This schema defines the structure for restaurant data in Sanity CMS
 */

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cuisine',
      title: 'Cuisine Type',
      type: 'string',
      options: {
        list: [
          { title: 'American', value: 'american' },
          { title: 'Italian', value: 'italian' },
          { title: 'Mexican', value: 'mexican' },
          { title: 'Asian', value: 'asian' },
          { title: 'Steakhouse', value: 'steakhouse' },
          { title: 'Seafood', value: 'seafood' },
          { title: 'Fast Food', value: 'fast-food' },
          { title: 'Cafe', value: 'cafe' },
          { title: 'Bar & Grill', value: 'bar-grill' },
          { title: 'Fine Dining', value: 'fine-dining' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Restaurant Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          { title: '$', value: '$' },
          { title: '$$', value: '$$' },
          { title: '$$$', value: '$$$' },
          { title: '$$$$', value: '$$$$' },
        ],
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Active for Voting',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this restaurant is currently active for voting',
    }),
    defineField({
      name: 'totalVotes',
      title: 'Total Votes',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      description: 'Total number of votes received (auto-calculated)',
    }),
    defineField({
      name: 'lastVoteDate',
      title: 'Last Vote Date',
      type: 'datetime',
      readOnly: true,
      description: 'Date of the most recent vote',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'cuisine',
      media: 'image',
      votes: 'totalVotes',
    },
    prepare({ title, subtitle, media, votes }) {
      return {
        title,
        subtitle: `${subtitle || 'Restaurant'} • ${votes || 0} votes`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Most Votes',
      name: 'totalVotesDesc',
      by: [{ field: 'totalVotes', direction: 'desc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Recently Added',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
})