/**
 * ============================================================================
 * src/places.js - LESSON 547
 * ============================================================================
 *
 * Dummy data representing travel destinations. Each place is an object
 * with an id, an imported image asset, a title, and a description.
 *
 * This data is used to demonstrate the SearchableList component with
 * complex objects (as opposed to simple strings). The key challenge
 * that motivates the render props pattern is: the SearchableList
 * component needs to handle searching through these objects, but it
 * shouldn't dictate HOW each place is rendered — that's the consumer's
 * responsibility.
 *
 * ============================================================================
 */

import savannaImg from './assets/african-savanna.jpg';
import amazonImg from './assets/amazon-river.jpg';
import caribbeanImg from './assets/caribbean-beach.jpg';
import desertImg from './assets/desert-dunes.jpg';
import forestImg from './assets/forest-waterfall.jpg';

export const PLACES = [
  {
    id: 'african-savanna',
    image: savannaImg,
    title: 'African Savanna',
    description: 'Experience the beauty of nature.',
  },
  {
    id: 'amazon-river',
    image: amazonImg,
    title: 'Amazon River',
    description: 'Get to know the largest river in the world.',
  },
  {
    id: 'caribbean-beach',
    image: caribbeanImg,
    title: 'Caribbean Beach',
    description: 'Enjoy the sun and the beach.',
  },
  {
    id: 'desert-dunes',
    image: desertImg,
    title: 'Desert Dunes',
    description: 'Discover the desert life.',
  },
  {
    id: 'forest-waterfall',
    image: forestImg,
    title: 'Forest Waterfall',
    description: 'Listen to the sound of the water.',
  },
];
