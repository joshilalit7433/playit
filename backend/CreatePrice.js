import Stripe from 'stripe';

// Initialize Stripe with your API key
const stripe = new Stripe('sk_test_51QgjNe09HGOXkg8vYfE1DQdJgL5o2giXmPAZoXAiqE90hguNLvrZKkPP7dlQCrqY3pk1szjl7pMM7ggWKMT3TwEx00J1kFE18d'); // Replace with your actual secret key

// Function to create a product and its associated price
const createSubscriptionProduct = async () => {
  try {
    // Create a product
    const product = await stripe.products.create({
      name: 'Starter Subscription',
      description: '$12/Month subscription',
    });

    // Create a price for the product
    const price = await stripe.prices.create({
      unit_amount: 1200, // Amount in cents
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      product: product.id, // Link price to product
    });

    console.log('Success! Here is your starter subscription product ID:', product.id);
    console.log('Success! Here is your starter subscription price ID:', price.id);
  } catch (error) {
    console.error('Error creating subscription product or price:', error.message);
  }
};

// Call the function
createSubscriptionProduct();
