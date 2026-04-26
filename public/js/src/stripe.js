/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51TOZy8ET9MVpGX9XnEKzJCVqphCliT5V8Cb8TXPH1SSuQSCDZfQx9bQnH8qMUrFVHIRMVqc2iAYQ1bx73fyU5bCQ00Rd4DL7W0',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const { data } = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`,
      { withCredentials: true },
    );

    await stripe.redirectToCheckout({
      sessionId: data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
